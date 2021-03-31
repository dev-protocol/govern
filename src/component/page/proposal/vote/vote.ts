/* eslint-disable functional/functional-parameters */
/* eslint-disable functional/no-expression-statement */
import { component, DirectiveFunction, subscribe } from '@aggre/ullr'
import { html } from 'lit-html'
import { BehaviorSubject } from 'rxjs'
import { Attributes } from '../../../../lib/vote/attributes'
import { asVar } from '../../../../style/custom-properties'
import { provider } from '../../../../store/provider'
import { always } from 'ramda'
import { UndefinedOr } from '@devprotocol/util-ts'
import { U } from '../../../../lib/u'
import { Contract } from 'ethers'
import { vote as send } from '../../../../lib/vote/vote'
import { numbersWithIndex } from '../../../../lib/numbers-with-index'
import { connectOrConnected } from '../../../common/button/connect-or-connected'
import { form } from './form'

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
	stores: readonly BehaviorSubject<UndefinedOr<number>>[],
	err: BehaviorSubject<UndefinedOr<string>>
): ((contract: Contract) => (ev: Event) => Promise<void>) => (
	contract: Contract
) => async (ev: Event): Promise<void> => {
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
	const onVoteFactory = createOnVote(stores, errStore)
	const onChangeFactory = createOnChange(stores, errStore)
	return component(html`
		<style>
			.err {
				background: red;
				color: white;
				border-radius: ${asVar('borderRadius')};
			}
			.header {
				display: grid;
				grid-auto-flow: column;
				justify-content: space-between;
				align-items: center;
			}
			header {
				font-weight: bold;
				font-family: ${asVar('fontFamilyHeading')};
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
			<div class="header">
				<header>Vote</header>
				${subscribe(provider, connectOrConnected)}
			</div>
			${subscribe(errStore, (err) => html` <span class="err">${err}</span> `)}
			${form({ contractAddress, onVoteFactory, onChangeFactory, options })}
		</section>
	`)
}
