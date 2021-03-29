import { component, DirectiveFunction } from '@aggre/ullr'
import { html } from 'lit-html'
import { connectWallet } from '../../../lib/connect-wallet'
import { button } from '../../../style/reset/button'

export const connect = (label: string): DirectiveFunction =>
	component(html`
		<style>
			${button}
		</style>
		<button @click=${connectWallet}>${label}</button>
	`)
