import { BehaviorSubject } from 'rxjs'
import { providers } from 'ethers'
import { UndefinedOr } from '@devprotocol/util-ts'
import { U } from '../lib/u'

export type StoreProvider = UndefinedOr<providers.Web3Provider>

export const provider = new BehaviorSubject<StoreProvider>(U)
