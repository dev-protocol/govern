/* eslint-disable functional/no-class */
import test from 'ava'
import * as Web3Modal from 'web3modal'
import { connectWallet } from './connect-wallet'
import { ImportMock } from 'ts-mock-imports'
import { provider } from '../store/provider'

test('returns web3 provider with Web3Modal, calls BehaviorSubject.next for provider store', async (t) => {
	ImportMock.mockClass(Web3Modal).mock(
		'connect',
		Promise.resolve(async () => 'this is a test')
	)
	const result = await connectWallet(undefined)
	t.is(result, provider.value)
	t.is(
		await result?.getBlockNumber().catch((err) => err.chainId),
		'this is a test' as any
	)
})
