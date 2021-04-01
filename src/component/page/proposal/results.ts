import { component, DirectiveFunction, subscribe } from '@aggre/ullr'
import { html } from 'lit-html'
import { repeat } from 'lit-html/directives/repeat'
import { from } from 'rxjs'
import { findHeadings } from '../../../lib/parse-markdown'
import { Attributes } from '../../../lib/vote/attributes'
import { getVotes } from '@devprotocol/vote-count-resolver'
import { ul } from '../../../style/reset/ul'
import { BigNumber, constants } from 'ethers'
import { asVar } from '../../../style/custom-properties'
import { asideHeading, asideContainer } from './styles'
import { getVotes as dummy } from '../../../mock/@devprotocol/governance'
import { always } from 'ramda'
import { standloneProvider } from '../../../lib/standalone-provider'
import { placeholder } from '../../common/placeholder'

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
const de18ize = (num: BigNumber | string): number =>
	BigNumber.from(num).mul(BASIS).div(constants.WeiPerEther).toNumber() / BASIS

export const results = (
	contractAddress: string,
	options: Attributes['options']
): DirectiveFunction =>
	component(html`
		<style>
			${ul} ${asideHeading('header')} ${asideContainer('ul')} li {
				display: grid;
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
			<ul>
				${subscribe(
					from(
						getVotes(contractAddress, standloneProvider).catch(always(dummy))
					),
					(data) => {
						const total = data
							.map(({ count }) => count)
							.reduce(
								(p, x) => BigNumber.from(p).add(BigNumber.from(x)),
								constants.Zero
							)
						return html`
							${repeat(options, (option, i) => {
								const result = data[i]
								const { count, counts } = result
								const share = calcShare(count, total)
								return (([heading]) => html`
									<li>
										<span>${heading} (${share}%)</span>
										<div
											role="progressbar"
											aria-valuenow=${share}
											aria-valuemin="0"
											aria-valuemax="100"
											max="100"
										>
											<span style="width: ${share}%" role="presentation"></span>
										</div>
										<span>#1 ${de18ize(counts[0])} votes</span>
										<span>#2 ${de18ize(counts[1])} votes</span>
										<span>#3 ${de18ize(counts[2])} votes</span>
										<span>Borda Count ${de18ize(count)}</span>
									</li>
								`)(findHeadings(option))
							})}
						`
					},
					placeholder()
				)}
			</ul>
		</section>
	`)
