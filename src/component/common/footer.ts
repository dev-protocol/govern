import { shadow } from '@aggre/ullr'
import { html } from 'lit'
import { asVar } from '../../style/custom-properties'
import { ul } from '../../style/reset/ul'
import { a } from './a'
import { container } from './container'
import { logo } from './logo'

export const footer = container(
	shadow(html`
		<style>
			${ul} footer {
				display: grid;
				margin: 5rem 0;
				justify-items: center;
				gap: 1rem;
				align-items: center;
			}
			a {
				color: ${asVar('fontColor')};
				text-decoration: none;
			}
			svg {
				width: 120px;
				height: auto;
			}
			ul {
				width: 100%;
				display: grid;
				grid-auto-flow: column;
				justify-content: space-evenly;
			}
			@media (min-width: 920px) {
				footer {
					justify-items: baseline;
					grid-auto-flow: column;
				}
			}
		</style>

		<footer>
			<div>${a({ href: '//devprotocol.xyz', children: logo })}</div>
			<ul>
				<li>${a({ href: '//devprotocol.xyz', children: 'Dev Protocol' })}</li>
				<li>${a({ href: '//github.com/dev-protocol', children: 'GitHub' })}</li>
			</ul>
		</footer>
	`)
)
