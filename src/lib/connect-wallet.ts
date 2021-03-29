/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-conditional-statement */
import Web3Modal from 'web3modal'
import { providers } from 'ethers'
import { provider } from '../store/provider'
import detectEthereumProvider from '@metamask/detect-provider'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { alwaysU } from './u'
import { UndefinedOr, whenDefined } from '@devprotocol/util-ts'

const providerOptions = {
	injected: {
		package: detectEthereumProvider(),
	},
	walletconnect: {
		package: WalletConnectProvider,
		options: {
			infuraId: '75ebe953349644b6998136d868f5cd97',
		},
	},
}

export const connectWallet = async (
	_: unknown
): Promise<UndefinedOr<providers.Web3Provider>> => {
	const web3ForInjected = await detectEthereumProvider()
	const modalProvider = new Web3Modal({
		providerOptions,
	})
	if (!web3ForInjected) {
		modalProvider.clearCachedProvider()
		return
	}
	const connectedProvider = await modalProvider.connect().catch(alwaysU)
	const _provider = whenDefined(
		connectedProvider,
		(p) => new providers.Web3Provider(p)
	)
	provider.next(_provider)
	return _provider
}
