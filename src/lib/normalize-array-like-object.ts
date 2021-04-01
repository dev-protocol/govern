import { ethers } from 'ethers'
import { Result } from 'ethers/lib/utils'
import { mergeAll } from 'ramda'

export const normalizeArrayLikeObject = <T extends Record<string, any>>(
	args: ethers.Event['args'] | Result
): T => {
	const src = args || []
	const keys = Object.keys(src).filter((k) => k && isNaN(Number(k)))
	const data = keys.map((key) => ({ [key]: src[key] }))
	return mergeAll(data) as T
}
