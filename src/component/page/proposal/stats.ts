import { shadow, subscribe } from '@aggre/ullr'
import { html } from 'lit'
import { DirectiveResult } from 'lit-html/directive.js'
import { Attributes } from '../../../lib/vote/attributes'
import { blockTimer } from '../../../store/block-timer'
import { asVar } from '../../../style/custom-properties'
import { a } from '../../common/a'
import { asideContainer, asideHeading } from './styles'

export const stats = (attributes: Attributes): DirectiveResult => {
	return shadow(html`
		<style>
			${asideHeading('header')} ${asideContainer('dl')} dl {
				margin: 0;
				grid-template: auto / 8em 1fr;
			}
			dd {
				margin: 0;
				text-overflow: ellipsis;
				overflow: hidden;
			}
			a {
				color: ${asVar('secondaryColor')};
			}
			dl > *:first-child {
				grid-column: 1 / 3;
			}
			.status {
				padding: 0.3rem 0.8rem;
				border-radius: 99rem;
				color: white;
				text-align: center;
				text-transform: capitalize;
			}
			.status.open {
				background: ${asVar('secondaryColor')};
			}
			.status.closed {
				background: ${asVar('weakColor')};
			}
		</style>
		<section>
			<header>Stats</header>
			<dl>
				${subscribe(blockTimer, (res) =>
					((status) => html`<div class="status ${status}">${status}</div>`)(
						res < attributes.period.toNumber() ? 'open' : 'closed'
					)
				)}

				<dt>Proposer</dt>
				<dd>
					${a({
						href: `//etherscan.io/address/${attributes.proposer}`,
						children: attributes.proposer,
					})}
				</dd>
				<dt>Closing block</dt>
				<dd>${attributes.period}</dd>
				<dt>Current block</dt>
				<dd>${subscribe(blockTimer, (res) => html`${res}`)}</dd>
			</dl>
		</section>
	`)
}
