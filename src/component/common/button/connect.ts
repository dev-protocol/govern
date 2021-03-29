import { component, DirectiveFunction } from '@aggre/ullr'
import { html } from 'lit-html'
import { connectWallet } from '../../../lib/connect-wallet'
import { asVar } from '../../../style/custom-properties'
import { button } from '../../../style/reset/button'

export const connect = (label: string): DirectiveFunction =>
	component(html`
		<style>
			${button} button {
				padding: 0.6rem 1rem;
				font-size: 1rem;
				background: ${asVar('primaryColor')};
				color: ${asVar('onPrimaryColor')};
				font-family: ${asVar('fontFamilyUI')};
				border-radius: ${asVar('borderRadius')};
			}
		</style>
		<button @click=${connectWallet}>${label}</button>
	`)
