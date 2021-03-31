import { component, DirectiveFunction, subscribe } from '@aggre/ullr'
import { html } from 'lit-html'
import { from } from 'rxjs'
import { attributes, parseAttributes } from '../../../lib/vote/attributes'
import { createVoteContract } from '../../../lib/vote/create-vote-contract'
import { always } from 'ramda'
import { asVar } from '../../../style/custom-properties'
import { standloneProvider } from '../../../lib/standalone-provider'
import { markedHTML } from '../../../lib/marked-html'
import { container } from '../../common/container'
import { results } from './results'
import { vote } from './vote/vote'
import { stats } from './stats'

const dummy = {
	subject: 'Governance Subject Governance Subject Governance Subject',
	body:
		'https://raw.githubusercontent.com/dev-protocol/draft-proposals/main/proposals/example/proposal.md',
	options: [
		'https://raw.githubusercontent.com/dev-protocol/draft-proposals/main/proposals/example/option-1.md',
		'https://raw.githubusercontent.com/dev-protocol/draft-proposals/main/proposals/example/option-2.md',
		'https://raw.githubusercontent.com/dev-protocol/draft-proposals/main/proposals/example/option-3.md',
	],
	period: 634673568,
	bodyMimeType: 'text/markdown',
	optionsMimeType: 'text/markdown',
	proposer: '0x57E21bd98612DE0Bd1723F4bf81A944eF7BfF526',
}

export default (contractAddress: string): DirectiveFunction =>
	container(
		subscribe(
			from(
				attributes({
					contract: createVoteContract(standloneProvider, contractAddress),
				})
					.catch(always(Promise.resolve(dummy)))
					.then(parseAttributes)
			),
			(attributes) =>
				component(html`
					<style>
						a {
							color: ${asVar('primaryColor')};
							text-decoration: none;
						}
						li {
							padding: 1rem;
						}
						main {
							display: grid;
							grid-gap: 1rem;
						}
						.aside {
							position: sticky;
							top: 1rem;
							display: grid;
							grid-gap: 1rem;
						}
						@media (min-width: 920px) {
							main {
								grid-template-columns: minmax(0, 5fr) minmax(0, 2fr);
							}
						}
					</style>
					<main>
						<article>${markedHTML(attributes.body)}</article>
						<aside>
							<div class="aside">
								${results(contractAddress, attributes.options)}${stats(
									attributes
								)}
							</div>
						</aside>
						${vote(contractAddress, attributes.options)}
					</main>
				`)
		)
	)
