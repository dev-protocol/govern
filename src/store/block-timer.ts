import { timer } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { standloneProvider } from '../lib/standalone-provider'

export const blockTimer = timer(0, 5000).pipe(
	switchMap((_) => standloneProvider.getBlockNumber())
)
