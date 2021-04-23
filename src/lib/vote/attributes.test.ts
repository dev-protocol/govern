import test from 'ava'
import { attributes } from './attributes'

test('calling `Vote.attributes` and returns the results', async (t) => {
	const contract = {
		functions: {
			attributes: (...args: readonly any[]) => {
				t.deepEqual(args, [])
				return [{ a: 1 }]
			},
		},
	} as any
	const result = await attributes({ contract })
	t.deepEqual(result, { a: 1 } as any)
})
