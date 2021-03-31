import test from 'ava'
import { Contract } from 'ethers'
import { contracts } from '../../constant/contracts'
import { standloneProvider } from '../standalone-provider'
import { createVoteContract } from './create-vote-contract'

test('retuns a contract instance', (t) => {
	const res = createVoteContract(standloneProvider, contracts[0])
	t.true(res instanceof Contract)
	t.is(res.address, contracts[0])
})
