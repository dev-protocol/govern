/* eslint-disable functional/no-return-void */
import { component, DirectiveFunction, subscribe } from '@aggre/ullr'
import { html, TemplateResult } from 'lit-html'
import { repeat } from 'lit-html/directives/repeat'
import { BehaviorSubject } from 'rxjs'
import { findHeadings } from '../../../../lib/parse-markdown'
import { Attributes } from '../../../../lib/vote/attributes'
import { provider } from '../../../../store/provider'
import { createVoteContract } from '../../../../lib/vote/create-vote-contract'
import { Contract } from 'ethers'
import { asVar } from '../../../../style/custom-properties'
import { primaryButton, table } from '../../../../style/presets'
import { UndefinedOr, whenDefined } from '@devprotocol/util-ts'
import { markedHTML } from '../../../../lib/marked-html'
import { U } from '../../../../lib/u'

type Props = {
	readonly contractAddress: string
	readonly attributes: Attributes
	readonly onVoteFactory: (contract: Contract) => (ev: Event) => Promise<void>
	readonly onChangeFactory: (index: number) => (ev: InputEvent) => void
}

export const form = (
	{ contractAddress, onVoteFactory, onChangeFactory, attributes }: Props,
	errorStore: BehaviorSubject<UndefinedOr<string>>
): DirectiveFunction => {
	const input = (i: number): TemplateResult => html`<input
		@change=${onChangeFactory(i)}
		type="number"
		name="option_${i}"
		required
		min="0"
		max="100"
		step="1"
	/>`
	const h3 = (content: string): TemplateResult => html`<h3>${content}</h3>`
	const isPlainText = attributes.optionsMimeType === 'text/plain' ? true : true

	return component(html`
		<style>
			form {
				display: grid;
				gap: 1rem;
			}
			.col {
				display: grid;
				gap: 1rem;
				grid-auto-columns: 1fr 110px;
				grid-auto-flow: column;
				align-items: center;
			}
			input {
				font-size: 1.8rem;
				padding: 0.5rem;
				text-align: center;
				border: 1px solid ${asVar('fontColor')};
				border-radius: ${asVar('borderRadius')};
				background: ${asVar('surfaceColor')};
				color: ${asVar('fontColor')};
			}
			h3 {
				margin: 0;
			}
			figure {
				font-size: 0.8em;
				margin: 0;
				color: ${asVar('weakColor')};
			}
			summary::before {
				content: '▼';
				transform: rotate(-90deg);
			}
			details[open] summary::before {
				transform: rotate(0);
			}
			summary.col {
				grid-auto-columns: auto 1fr 110px;
			}
			a {
				color: ${asVar('primaryColor')};
				text-decoration: none;
			}
			img {
				max-width: 100%;
			}
			section h1,
			section h2,
			section h3 {
				font-size: 1em;
			}
			${primaryButton} button {
				width: 100%;
			}
			${table}
		</style>
		${subscribe(provider, (wallet) => {
			const contract = whenDefined(wallet, (x) =>
				createVoteContract(x.getSigner(), contractAddress)
			)
			const onVote = whenDefined(contract, onVoteFactory)
			return html`
				<form @submit=${onVote}>
					<figure class="col"><span>Option</span> <span>Vote(%)</span></figure>
					${repeat(attributes.options, (option, i) =>
						((heading) =>
							isPlainText
								? html` <div class="col">${h3(heading)} ${input(i)}</div> `
								: html`
										<details>
											<summary class="col">${h3(heading)} ${input(i)}</summary>
											<section>${markedHTML(option)}</section>
										</details>
								  `)(isPlainText ? option : findHeadings(option)[0])
					)}
					${subscribe(
						errorStore,
						(err) =>
							html`<button type="submit" ?disabled=${onVote === U || err}>
								Vote
							</button>`
					)}
				</form>
			`
		})}
	`)
}
