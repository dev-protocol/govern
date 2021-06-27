import { BigNumber, constants } from 'ethers'

export const getVotes = [
	{
		id: 'https://raw.githubusercontent.com/dev-protocol/DIPs/main/template-general-dip.md#1',
		counts: [
			BigNumber.from(60).mul(constants.WeiPerEther).toString(),
			BigNumber.from(40).mul(constants.WeiPerEther).toString(),
			BigNumber.from(10).mul(constants.WeiPerEther).toString(),
		],
		count: BigNumber.from(270).mul(constants.WeiPerEther).toString(),
	},
	{
		id: 'https://raw.githubusercontent.com/dev-protocol/DIPs/main/template-general-dip.md#2',
		counts: [
			BigNumber.from(20).mul(constants.WeiPerEther).toString(),
			BigNumber.from(70).mul(constants.WeiPerEther).toString(),
			BigNumber.from(6).mul(constants.WeiPerEther).toString(),
		],
		count: BigNumber.from(206).mul(constants.WeiPerEther).toString(),
	},
	{
		id: 'https://raw.githubusercontent.com/dev-protocol/DIPs/main/template-general-dip.md#3',
		counts: [
			BigNumber.from(30).mul(constants.WeiPerEther).toString(),
			BigNumber.from(50).mul(constants.WeiPerEther).toString(),
			BigNumber.from(40).mul(constants.WeiPerEther).toString(),
		],
		count: BigNumber.from(194).mul(constants.WeiPerEther).toString(),
	},
]
