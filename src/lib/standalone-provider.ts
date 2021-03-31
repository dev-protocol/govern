import { providers } from 'ethers'
import { provider } from '../constant/contracts'

export const standloneProvider = new providers.JsonRpcProvider(provider)
