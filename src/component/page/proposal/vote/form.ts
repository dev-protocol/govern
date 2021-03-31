/* eslint-disable functional/no-return-void */
import { component, DirectiveFunction, subscribe } from '@aggre/ullr'
import { html } from 'lit-html'
import { repeat } from 'lit-html/directives/repeat'
import { BehaviorSubject, from } from 'rxjs'
import { findHeadings } from '../../../../lib/parse-markdown'
import { Attributes } from '../../../../lib/vote/attributes'
import { waitForNotNullable } from '../../../../lib/wait-for-not-nullable'
import { provider } from '../../../../store/provider'
import { createVoteContract } from '../../../../lib/vote/create-vote-contract'
import { Contract } from 'ethers'
import { asVar } from '../../../../style/custom-properties'
import { primaryButton } from '../../../../style/presets'
import { UndefinedOr } from '@devprotocol/util-ts'
import { markedHTML } from '../../../../lib/marked-html'

type Props = {
	readonly contractAddress: string
	readonly options: Attributes['options']
	readonly onVoteFactory: (contract: Contract) => (ev: Event) => Promise<void>
	readonly onChangeFactory: (index: number) => (ev: InputEvent) => void
}

export const form = (
	{ contractAddress, onVoteFactory, onChangeFactory, options }: Props,
	errorStore: BehaviorSubject<UndefinedOr<string>>
): DirectiveFunction => {
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
			section h1,
			section h2,
			section h3 {
				font-size: 1em;
			}
			${primaryButton} button {
				width: 100%;
			}
		</style>
		${subscribe(
			from(waitForNotNullable(provider)),
			(wallet) => {
				const contract = createVoteContract(wallet.getSigner(), contractAddress)
				const onVote = onVoteFactory(contract)
				return html`
					<form @submit=${onVote}>
						<figure class="col">
							<span>Option</span> <span>Vote(%)</span>
						</figure>
						${repeat(options, (option, i) =>
							(([heading]) => html`
								<details>
									<summary class="col">
										<h3>${heading}</h3>
										<input
											@change=${onChangeFactory(i)}
											type="number"
											name="option_${i}"
											required
											min="0"
											max="100"
											step="1"
										/>
									</summary>
									<section>${markedHTML(option)}</section>
								</details>
							`)(findHeadings(option))
						)}
						${subscribe(
							errorStore,
							(err) =>
								html`<button type="submit" ?disabled=${err}>Vote</button>`
						)}
					</form>
				`
			},
			html`Please connect to a wallet`
		)}
	`)
}
