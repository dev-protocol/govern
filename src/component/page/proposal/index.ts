import { component, DirectiveFunction, subscribe } from '@aggre/ullr'
import { html } from 'lit-html'
import { from } from 'rxjs'
import { attributes, parseAttributes } from '../../../lib/vote/attributes'
import { createVoteContract } from '../../../lib/vote/create-vote-contract'
import { BigNumber } from '@ethersproject/bignumber'
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
	period: BigNumber.from(634673568),
	bodyMimeType: 'text/markdown',
	optionsMimeType: 'text/markdown',
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
						main,
						aside {
							display: grid;
							grid-gap: 1rem;
							align-content: baseline;
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
							${results(contractAddress, attributes.options)}${stats(
								attributes
							)}
						</aside>
						${vote(contractAddress, attributes.options)}
					</main>
				`)
		)
	)
