import { BehaviorSubject } from 'rxjs'
import { providers } from 'ethers'
import { UndefinedOr } from '@devprotocol/util-ts'
import { U } from '../lib/u'

export const provider = new BehaviorSubject<
	UndefinedOr<providers.Web3Provider>
>(U)
