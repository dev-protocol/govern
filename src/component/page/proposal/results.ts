import { shadow, subscribe } from '@aggre/ullr'
import { html } from 'lit'
import { repeat } from 'lit/directives/repeat.js'
import { from, zip } from 'rxjs'
import { findHeadings } from '../../../lib/parse-markdown'
import { Attributes } from '../../../lib/vote/attributes'
import { getVotes, VoteInfo } from '@devprotocol/vote-count-resolver'
import { ul } from '../../../style/reset/ul'
import { BigNumber, constants } from 'ethers'
import { asVar } from '../../../style/custom-properties'
import { asideHeading, asideContainer } from './styles'
import { getVotes as dummy } from '../../../mock/@devprotocol/governance'
import { always, reverse } from 'ramda'
import { standloneProvider } from '../../../lib/standalone-provider'
import { placeholder } from '../../common/placeholder'
import { blockTimer } from '../../../store/block-timer'
import { DirectiveResult } from 'lit-html/directive.js'

const BASIS = 10000
const calcShare = (
	num: BigNumber | string,
	total: BigNumber | string
): number => {
	const bN = BigNumber.from(num)
	const bT = BigNumber.from(total)
	return bN.isZero() || bT.isZero()
		? 0
		: bN.mul(BASIS).div(bT).mul(100).toNumber() / BASIS
}
const tobg = (v: string | number | BigNumber): BigNumber => BigNumber.from(v)
const de18ize = (num: BigNumber | string): number =>
	tobg(num).mul(BASIS).div(constants.WeiPerEther).toNumber() / BASIS
const sort = (data: ReadonlyArray<VoteInfo>): ReadonlyArray<VoteInfo> =>
	[...data].sort((a, b) =>
		tobg(a.count).sub(b.count).div(constants.WeiPerEther).toNumber()
	)

export const results = (
	contractAddress: string,
	attrs: Attributes
): DirectiveResult =>
	shadow(html`
		<style>
			${ul} ${asideHeading('header')} ${asideContainer('header + div')} li {
				display: grid;
			}
			li[win] {
				font-weight: bold;
			}
			span:not(:first-child) {
				font-size: 0.8em;
				color: ${asVar('weakColor')};
				font-family: monospace;
			}
			[role='progressbar'] {
				height: 0.3rem;
				margin: 0.6rem 0;
				overflow: hidden;
				background: ${asVar('weakColor')};
				border-radius: ${asVar('borderRadius')};
			}
			[role='progressbar'] > span {
				height: 100%;
				display: block;
				background: ${asVar('primaryVariantColor')};
			}
		</style>
		<section>
			<header>Results</header>
			<div>
				${subscribe(
					zip(
						from(
							getVotes(contractAddress, standloneProvider).catch(always(dummy))
						),
						blockTimer
					),
					([votes, blockNumber]) => {
						const total = votes
							.map(({ count }: VoteInfo) => count)
							.reduce(
								(p, x) => BigNumber.from(p).add(BigNumber.from(x)),
								constants.Zero
							)
						const isClosed = attrs.period.lte(blockNumber)
						const [winner] = reverse(sort(votes))
						return html`
							<ul>
								${repeat(attrs.options, (option, i) => {
									const result = votes[i]
									const { count, counts } = result
									const share = calcShare(count, total)
									const isWinner = isClosed && winner.id === result.id
									return (([heading]) => html`
										<li ?win=${isWinner}>
											<span>${isWinner ? '🥇' : ''}${heading} (${share}%)</span>
											<div
												role="progressbar"
												aria-valuenow=${share}
												aria-valuemin="0"
												aria-valuemax="100"
												max="100"
											>
												<span
													style="width: ${share}%"
													role="presentation"
												></span>
											</div>
											${repeat(
												attrs.options,
												(_, index) =>
													html`<span
														>#${index + 1} ${de18ize(counts[index])} votes</span
													>`
											)}
											<span>Borda Count ${de18ize(count)}</span>
										</li>
									`)(findHeadings(option))
								})}
							</ul>
						`
					},
					placeholder()
				)}
			</div>
		</section>
	`)
