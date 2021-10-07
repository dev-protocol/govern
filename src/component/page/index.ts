import { shadow, subscribe } from '@aggre/ullr'
import { html } from 'lit'
import { route } from '../../store/route'
import { footer } from '../common/footer'
import { header } from '../common/header'
import home from './home'
import proposal from './proposal'

export default shadow(
	html`
		<style>
			:host,
			.content {
				display: grid;
				grid-gap: 1rem;
			}
			:host {
				min-height: 100vh;
				align-content: space-between;
			}
		</style>
		<div class="content">
			${header()}
			${subscribe(route, (r) =>
				((paths) =>
					paths.length === 1 && paths[0]?.startsWith('0x')
						? proposal(paths[0])
						: home)(r.replace(/^\/(.*)/, '$1').split('/'))
			)}
		</div>
		${footer}
	`
)
