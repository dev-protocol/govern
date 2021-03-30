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

const dummy = {
	subject: 'Governance Subject Governance Subject Governance Subject',
	body:
		'https://raw.githubusercontent.com/dev-protocol/DIPs/main/DIPS/dip-38.md',
	options: [
		'https://raw.githubusercontent.com/dev-protocol/DIPs/main/template-general-dip.md',
		'https://raw.githubusercontent.com/dev-protocol/DIPs/main/template-general-dip.md',
		'https://raw.githubusercontent.com/dev-protocol/DIPs/main/template-general-dip.md',
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
					</style>
					<main>
						<article>${markedHTML(attributes.body)}</article>
					</main>
				`)
		)
	)
