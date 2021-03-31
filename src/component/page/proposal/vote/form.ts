/* eslint-disable functional/no-return-void */
import { component, DirectiveFunction, subscribe } from '@aggre/ullr'
import { html } from 'lit-html'
import { repeat } from 'lit-html/directives/repeat'
import { from } from 'rxjs'
import { findHeadings } from '../../../../lib/parse-markdown'
import { Attributes } from '../../../../lib/vote/attributes'
import { waitForNotNullable } from '../../../../lib/wait-for-not-nullable'
import { provider } from '../../../../store/provider'
import { createVoteContract } from '../../../../lib/vote/create-vote-contract'
import { Contract } from 'ethers'

type Props = {
	readonly contractAddress: string
	readonly options: Attributes['options']
	readonly onVoteFactory: (contract: Contract) => (ev: Event) => Promise<void>
	readonly onChangeFactory: (index: number) => (ev: InputEvent) => void
}

export const form = ({
	contractAddress,
	onVoteFactory,
	onChangeFactory,
	options,
}: Props): DirectiveFunction => {
	return component(html`
		<style></style>
		${subscribe(
			from(waitForNotNullable(provider)),
			(wallet) => {
				const contract = createVoteContract(wallet.getSigner(), contractAddress)
				const onVote = onVoteFactory(contract)
				return html`
					<form @submit=${onVote}>
						${repeat(options, (option, i) =>
							(([heading]) => html`
								<section>
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
								</section>
							`)(findHeadings(option))
						)}
						<button type="submit">Vote</button>
					</form>
				`
			},
			html`Please connect to a wallet`
		)}
	`)
}
