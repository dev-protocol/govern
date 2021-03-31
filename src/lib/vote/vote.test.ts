import test from 'ava'
import { vote } from './vote'

test('calling `Vote.vote` and returns the results', async (t) => {
	const contract = {
		functions: {
			vote: (...args: readonly any[]) => {
				t.deepEqual(args, [[1, 2, 3]])
				return {
					wait: () => Promise.resolve(1),
				}
			},
		},
	} as any
	const result = await vote({ contract, args: [[1, 2, 3]] })
	t.is(result, 1 as any)
})
