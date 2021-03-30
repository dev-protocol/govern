/* eslint-disable functional/functional-parameters */
/* eslint-disable functional/no-expression-statement */
import { component, DirectiveFunction, subscribe } from '@aggre/ullr'
import { html } from 'lit-html'
import { repeat } from 'lit-html/directives/repeat'
import { BehaviorSubject, from } from 'rxjs'
import { findHeadings } from '../../../lib/parse-markdown'
import { Attributes } from '../../../lib/vote/attributes'
import { asVar } from '../../../style/custom-properties'
import { waitForNotNullable } from '../../../lib/wait-for-not-nullable'
import { provider } from '../../../store/provider'
import { always } from 'ramda'
import { UndefinedOr } from '@devprotocol/util-ts'
import { U } from '../../../lib/u'
import { createVoteContract } from '../../../lib/vote/create-vote-contract'
import { Contract } from 'ethers'
import { vote as send } from '../../../lib/vote/vote'
import { numbersWithIndex } from '../../../lib/numbers-with-index'

const ERR = {
	NOT_100: 'Please set the total value to 100',
}
const calcTotal = (values: readonly UndefinedOr<number>[]): number =>
	values.map((v) => v ?? 0).reduce((p, x) => p + x)
const createErrorStore = always(new BehaviorSubject<UndefinedOr<string>>(U))
const createStores = (
	options: Attributes['options']
): readonly BehaviorSubject<UndefinedOr<number>>[] =>
	options.map(() => new BehaviorSubject<UndefinedOr<number>>(U))
const createOnVote = (
	contract: Contract,
	stores: readonly BehaviorSubject<UndefinedOr<number>>[],
	err: BehaviorSubject<UndefinedOr<string>>
): ((ev: Event) => Promise<void>) => async (ev: Event): Promise<void> => {
	ev.preventDefault()
	const values = numbersWithIndex(stores.map((s) => s.value ?? 0))
	const options = values.map((v) => v.index)
	const percentiles = values.map((v) => v.value)
	await send({ contract, args: [options, percentiles] }).catch((error: Error) =>
		err.next(error.message)
	)
}
const createOnChange = (
	stores: readonly BehaviorSubject<UndefinedOr<number>>[],
	err: BehaviorSubject<UndefinedOr<string>>
) => (index: number) => (ev: InputEvent) => {
	stores[index].next(Number((ev.target as HTMLInputElement).value) || 0)
	const values = stores.map((s) => s.value)
	const total = calcTotal(values)
	err.next(values.includes(U) ? U : total === 100 ? U : ERR.NOT_100)
}

export const vote = (
	contractAddress: string,
	options: Attributes['options']
): DirectiveFunction => {
	const stores = createStores(options)
	const errStore = createErrorStore()
	const onChange = createOnChange(stores, errStore)
	return component(html`
		<style>
			.err {
				background: red;
				color: white;
				border-radius: ${asVar('borderRadius')};
			}
			header {
				font-weight: bold;
				font-family: ${asVar('fontFamilyHeading')};
				margin-bottom: 0.5rem;
				font-size: 1.4rem;
			}
			:host > section {
				display: grid;
				gap: 1rem;
				border: 1px solid ${asVar('weakColor')};
				padding: 1rem;
				border-radius: ${asVar('borderRadius')};
			}
		</style>
		<section>
			<header>Vote</header>
			${subscribe(errStore, (err) => html` <span class="err">${err}</span> `)}
			${subscribe(
				from(waitForNotNullable(provider)),
				(wallet) => {
					const contract = createVoteContract(
						wallet.getSigner(),
						contractAddress
					)
					const onVote = createOnVote(contract, stores, errStore)
					return html`
						<form @submit=${onVote}>
							${repeat(options, (option, i) =>
								(([heading]) => html`
									<section>
										<h3>${heading}</h3>
										<input
											@change=${onChange(i)}
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
		</section>
	`)
}
