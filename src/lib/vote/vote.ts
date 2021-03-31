import { Contract } from 'ethers'
import {
	TransactionResponse,
	TransactionReceipt,
} from '@ethersproject/abstract-provider'

type Options = {
	readonly contract: Contract
	readonly args: readonly [readonly number[]]
}

export const vote = async ({
	contract,
	args,
}: Options): Promise<TransactionReceipt> => {
	const tx: TransactionResponse = await contract.functions.vote(...args)
	return tx.wait()
}
