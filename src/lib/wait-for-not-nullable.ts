/* eslint-disable functional/no-expression-statement */
import { isNotNil } from '@devprotocol/util-ts'
import { Subject } from 'rxjs'
import { filter, take } from 'rxjs/operators'

export const waitForNotNullable = async <T>(
	subject: Subject<T>
): Promise<NonNullable<T>> =>
	new Promise<NonNullable<T>>((resolve) => {
		subject.pipe(filter(isNotNil), take(1)).subscribe((x) => {
			resolve(x as NonNullable<T>)
		})
	})
