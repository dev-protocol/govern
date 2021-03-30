import { prop, sortBy } from 'ramda'

export const numbersWithIndex = (
	nums: readonly number[]
): readonly { readonly value: number; readonly index: number }[] =>
	sortBy(prop('value'))(nums.map((value, index) => ({ value, index })))
