import { Contract } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { voteAbi } from './abi'

export const createVoteContract = (
	provider: Provider | Signer,
	contractAddress: string
): Contract => {
	const contract = new Contract(contractAddress, voteAbi, provider)
	return contract
}
