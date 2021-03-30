import { BigNumber } from 'ethers'

export const getVotes = (
	contractAddress: string
): Promise<
	readonly {
		readonly id: string
		readonly counts: readonly BigNumber[]
		readonly count: BigNumber
	}[]
> =>
	Promise.resolve([
		{
			id:
				'https://raw.githubusercontent.com/dev-protocol/DIPs/main/template-general-dip.md#1',
			counts: [BigNumber.from(60), BigNumber.from(40), BigNumber.from(10)],
			count: BigNumber.from(270),
		},
		{
			id:
				'https://raw.githubusercontent.com/dev-protocol/DIPs/main/template-general-dip.md#2',
			counts: [BigNumber.from(20), BigNumber.from(70), BigNumber.from(6)],
			count: BigNumber.from(206),
		},
		{
			id:
				'https://raw.githubusercontent.com/dev-protocol/DIPs/main/template-general-dip.md#3',
			counts: [BigNumber.from(30), BigNumber.from(50), BigNumber.from(40)],
			count: BigNumber.from(194),
		},
	])
