import test from 'ava'
import { alwaysU, U } from './u'

test('U; exports undefind', (t) => {
	t.is(U, undefined)
})

test('alwaysU; returns undefined always', (t) => {
	t.is(alwaysU(), undefined)
})
