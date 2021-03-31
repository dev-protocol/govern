import test from 'ava'
import { Subject } from 'rxjs'
import { waitForNotNullable } from './wait-for-not-nullable'

test('wait for until the value of the passed Subject is non-nullable', async (t) => {
	const subj = new Subject<string | undefined>()
	const res = waitForNotNullable(subj)
	t.true(res instanceof Promise)
	subj.next('test')
	t.is(await res, 'test')
})
