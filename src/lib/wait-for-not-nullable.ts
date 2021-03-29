/* eslint-disable functional/no-expression-statement */
import { complement, isNil } from 'ramda'
import { Subject } from 'rxjs'
import { filter, take } from 'rxjs/operators'

export const waitForNotNullable = async <T>(
	subject: Subject<T>
): Promise<NonNullable<T>> =>
	new Promise<NonNullable<T>>((resolve) => {
		subject.pipe(filter(complement(isNil)), take(1)).subscribe((x) => {
			resolve(x as NonNullable<T>)
		})
	})
