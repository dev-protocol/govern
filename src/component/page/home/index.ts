import { html } from 'lit-html'
import { repeat } from 'lit-html/directives/repeat'
import { contracts } from '../../../constant/contracts'
import { asVar } from '../../../style/custom-properties'
import { ul } from '../../../style/reset/ul'
import { container } from '../../common/container'
import { proposal } from './proposal'

export default container(
	html`
		<style>
			${ul} h2 {
				margin: 0;
				margin-bottom: 1rem;
			}
			ul {
				display: grid;
				border: 1px solid ${asVar('onSurfaceColor')};
				border-radius: ${asVar('borderRadius')};
			}
			ul > *:not(:last-child) {
				border-bottom: 1px solid ${asVar('onSurfaceColor')};
			}
		</style>
		<h2>Proposals</h2>
		<ul>
			${repeat(contracts, proposal)}
		</ul>
	`
)
