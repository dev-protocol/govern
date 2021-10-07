import { subscribe } from '@aggre/ullr'
import { html } from 'lit'
import { always } from 'ramda'
import { provider } from '../../store/provider'
import { asVar } from '../../style/custom-properties'
import { a } from './a'
import { connect } from './button/connect'
import { connectOrConnected } from './button/connect-or-connected'

export const connectButton = connect('Connect to a wallet')
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
