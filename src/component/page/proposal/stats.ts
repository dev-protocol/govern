import { component, DirectiveFunction, subscribe } from '@aggre/ullr'
import { html } from 'lit-html'
import { repeat } from 'lit-html/directives/repeat'
import { from } from 'rxjs'
import { findHeadings } from '../../../lib/parse-markdown'
import { Attributes } from '../../../lib/vote/attributes'
import { getVotes } from '../../../mock/@devprotocol/governance'
import { ul } from '../../../style/reset/ul'
import { BigNumber, constants } from 'ethers'
import { whenDefined } from '@devprotocol/util-ts'
import { asVar } from '../../../style/custom-properties'

const share = (num: BigNumber, total: BigNumber): number =>
	num.div(total).mul(100).toNumber()

export const stats = (
	contractAddress: string,
	options: Attributes['options']
): DirectiveFunction =>
	component(html`
		<style>
			${ul} section {
				position: sticky;
				top: 1rem;
			}
			header {
				font-weight: bold;
				font-family: ${asVar('fontFamilyHeading')};
				margin-bottom: 0.5rem;
				font-size: 1.4rem;
			}
			ul {
				display: grid;
				gap: 1rem;
				border: 1px solid ${asVar('weakColor')};
				padding: 1rem;
				border-radius: ${asVar('borderRadius')};
			}
			li {
				display: grid;
			}
			span:not(:first-child) {
				font-size: 0.8em;
				color: ${asVar('weakColor')};
				font-family: monospace;
			}
		</style>
		${subscribe(from(getVotes(contractAddress)), (data) => {
			const total = data.reduce((p, x) => p.add(x.count), constants.Zero)
			return html`
				<section>
					<header>Stats</header>
					<ul>
						${repeat(options, (option, i) => {
							const result = data[i]
							const { count, counts } = result
							return whenDefined(result, (x) =>
								(([heading]) => html`
									<li>
										<span>${heading} (${share(count, total)}%)</span>
										<span>#1 ${counts[0].toNumber()} votes</span>
										<span>#2 ${counts[1].toNumber()} votes</span>
										<span>#3 ${counts[2].toNumber()} votes</span>
										<span>Borda Count ${count.toNumber()}</span>
									</li>
								`)(findHeadings(option))
							)
						})}
					</ul>
				</section>
			`
		})}
	`)
