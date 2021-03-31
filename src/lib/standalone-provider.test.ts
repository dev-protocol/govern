import test from 'ava'
import { providers } from 'ethers'
import { provider } from '../constant/contracts'
import { standloneProvider } from './standalone-provider'

test('exports non-connected web3 provider', (t) => {
	t.is(
		JSON.stringify(standloneProvider),
		JSON.stringify(new providers.JsonRpcProvider(provider))
	)
})
