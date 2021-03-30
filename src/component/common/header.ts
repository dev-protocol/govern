import { DirectiveFunction, component, subscribe } from '@aggre/ullr'
import { html } from 'lit-html'
import { until } from 'lit-html/directives/until'
import { always } from 'ramda'
import { provider, StoreProvider } from '../../store/provider'
import { asVar } from '../../style/custom-properties'
import { a } from './a'
import { connect } from './button/connect'

const connectButton = connect('Connect to a wallet')
const connectOrConnected = (prov: StoreProvider): DirectiveFunction =>
	prov
		? component(html`
				<style>
					section {
						display: grid;
						grid-auto-columns: 1fr 120px;
						grid-auto-flow: column;
						grid-gap: 1rem;
					}
					.address {
						text-overflow: ellipsis;
						overflow: hidden;
					}
				</style>
				<section>
					<span> Connected </span>
					<span class="address"> ${until(prov.getSigner().getAddress())} </span>
				</section>
		  `)
		: connectButton

export const header = always(html`
	<style>
		header {
			display: grid;
			padding: 1rem;
			grid-auto-flow: column;
			justify-content: space-between;
			align-items: center;
		}
		a {
			color: ${asVar('onSurfaceColor')};
			text-decoration: none;
		}
		h1 {
			margin: 0;
			font-family: ${asVar('fontFamilyHeading')};
		}
	</style>

	<header>
		<h1>${a({ href: '/', children: 'Govern' })}</h1>
		${subscribe(provider, connectOrConnected)}
	</header>
`)
