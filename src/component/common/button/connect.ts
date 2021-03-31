import { component, DirectiveFunction } from '@aggre/ullr'
import { html } from 'lit-html'
import { connectWallet } from '../../../lib/connect-wallet'
import { primaryButton } from '../../../style/presets'

export const connect = (label: string): DirectiveFunction =>
	component(html`
		<style>
			${primaryButton}
		</style>
		<button @click=${connectWallet}>${label}</button>
	`)
