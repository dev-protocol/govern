export const voteAbi = [
	'function attributes() external view returns (tuple(string subject, string body, uint256 period, string[] options, string bodyMimeType, string optionsMimeType))',
	'function vote(uint8[] memory _options, uint8[] memory percentiles) external',
]
