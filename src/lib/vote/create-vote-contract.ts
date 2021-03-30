import { Contract } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { voteAbi } from './abi'

const address = '0x0'

export const createVoteContract = (
	provider: Provider | Signer,
	contractAddress = address
): Contract => new Contract(contractAddress, voteAbi, provider)
