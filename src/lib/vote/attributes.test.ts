import test from 'ava'
import { attributes } from './attributes'

test('calling `Vote.attributes` and returns the results', async (t) => {
	const contract = {
		functions: {
			attributes: (...args: readonly any[]) => {
				t.deepEqual(args, [])
				return 1
			},
		},
	} as any
	const result = await attributes({ contract })
	t.is(result, 1 as any)
})
