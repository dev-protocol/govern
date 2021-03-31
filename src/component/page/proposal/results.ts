import { component, DirectiveFunction, subscribe } from '@aggre/ullr'
import { html } from 'lit-html'
import { repeat } from 'lit-html/directives/repeat'
import { from } from 'rxjs'
import { findHeadings } from '../../../lib/parse-markdown'
import { Attributes } from '../../../lib/vote/attributes'
import { getVotes } from '../../../mock/@devprotocol/governance'
import { ul } from '../../../style/reset/ul'
import { BigNumber, constants } from 'ethers'
import { asVar } from '../../../style/custom-properties'
import { asideHeading, asideContainer } from './styles'

const BASIS = 10000
const calcShare = (num: BigNumber, total: BigNumber): number =>
	num.mul(BASIS).div(total).mul(100).toNumber() / BASIS

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
		${subscribe(from(getVotes(contractAddress)), (data) => {
			const total = data.reduce((p, x) => p.add(x.count), constants.Zero)
			return html`
				<section>
					<header>Results</header>
					<ul>
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
									<span>#1 ${counts[0].toNumber()} votes</span>
									<span>#2 ${counts[1].toNumber()} votes</span>
									<span>#3 ${counts[2].toNumber()} votes</span>
									<span>Borda Count ${count.toNumber()}</span>
								</li>
							`)(findHeadings(option))
						})}
					</ul>
				</section>
			`
		})}
	`)
