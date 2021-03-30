import { component, subscribe } from '@aggre/ullr'
import { html } from 'lit-html'
import { route } from '../../store/route'
import { footer } from '../common/footer'
import { header } from '../common/header'
import home from './home'
import proposal from './proposal'

export default component(
	html`
		<style>
			:host {
				display: grid;
				grid-gap: 1rem;
			}
		</style>
		${header()}
		${subscribe(route, (r) =>
			((paths) =>
				paths.length === 1 && paths[0]?.startsWith('0x')
					? proposal(paths[0])
					: home)(r.replace(/^\/(.*)/, '$1').split('/'))
		)}
		${footer()}
	`
)
