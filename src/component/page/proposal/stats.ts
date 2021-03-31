import { component, DirectiveFunction, subscribe } from '@aggre/ullr'
import { html } from 'lit-html'
import { timer } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { standloneProvider } from '../../../lib/standalone-provider'
import { Attributes } from '../../../lib/vote/attributes'
import { asideContainer, asideHeading } from './styles'

export const stats = (attributes: Attributes): DirectiveFunction =>
	component(html`
		<style>
			header {
				${asideHeading};
			}
			dl {
				${asideContainer};
			}
		</style>
		<section>
			<header>Stats</header>
			<dl>
				<dt>Closed block</dt>
				<dd>${attributes.period}</dd>
				<dt>Current</dt>
				<dd>
					${subscribe(
						timer(0, 5000).pipe(
							switchMap((_) => standloneProvider.getBlockNumber())
						),
						(res) => html`${res}`
					)}
				</dd>
			</dl>
		</section>
	`)
