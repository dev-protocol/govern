import { shadow } from '@aggre/ullr'
import { html } from 'lit'
import { DirectiveResult } from 'lit-html/directive.js'
import { connectWallet } from '../../../lib/connect-wallet'
import { primaryButton } from '../../../style/presets'

export const connect = (label: string): DirectiveResult =>
	shadow(html`
		<style>
			${primaryButton}
		</style>
		<button @click=${connectWallet}>${label}</button>
	`)
