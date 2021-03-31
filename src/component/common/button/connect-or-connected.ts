import { DirectiveFunction, component } from '@aggre/ullr'
import { html } from 'lit-html'
import { until } from 'lit-html/directives/until'
import { StoreProvider } from '../../../store/provider'
import { connectButton } from '../header'

export const connectOrConnected = (prov: StoreProvider): DirectiveFunction =>
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
