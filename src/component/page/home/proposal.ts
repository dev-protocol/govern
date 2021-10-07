import { shadow, subscribe } from '@aggre/ullr'
import { html } from 'lit'
import { from } from 'rxjs'
import { attributes, parseAttributes } from '../../../lib/vote/attributes'
import { createVoteContract } from '../../../lib/vote/create-vote-contract'
import { a } from '../../common/a'
import { always } from 'ramda'
import { asVar } from '../../../style/custom-properties'
import { standloneProvider } from '../../../lib/standalone-provider'
import { placeholder } from '../../common/placeholder'
import { BigNumber } from 'ethers'
import { DirectiveResult } from 'lit-html/directive.js'

const dummy = {
	subject: 'Governance Subject Governance Subject Governance Subject',
	body: 'https://raw.githubusercontent.com/dev-protocol/draft-proposals/main/proposals/example/proposal.md',
	options: [
		'https://raw.githubusercontent.com/dev-protocol/draft-proposals/main/proposals/example/option-1.md',
		'https://raw.githubusercontent.com/dev-protocol/draft-proposals/main/proposals/example/option-2.md',
		'https://raw.githubusercontent.com/dev-protocol/draft-proposals/main/proposals/example/option-3.md',
	],
	period: BigNumber.from(634673568),
	bodyMimeType: 'text/markdown',
	optionsMimeType: 'text/markdown',
	proposer: '0x57E21bd98612DE0Bd1723F4bf81A944eF7BfF526',
}

export const proposal = (contractAddress: string): DirectiveResult =>
	shadow(html` <style>
			a {
				color: ${asVar('primaryColor')};
				text-decoration: none;
			}
			img {
				max-width: 100%;
			}
			li {
				padding: 1rem;
			}
		</style>

		<li>
			${subscribe(
				from(
					attributes({
						contract: createVoteContract(standloneProvider, contractAddress),
					})
						.catch(always(Promise.resolve(dummy)))
						.then(parseAttributes)
				),
				({ subject }) => a({ href: `/${contractAddress}`, children: subject }),
				placeholder({ row: 1 })
			)}
		</li>`)
