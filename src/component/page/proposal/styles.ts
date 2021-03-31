import { asVar } from '../../../style/custom-properties'

export const asideHeading = (selector: string): string => `
	${selector} {
		font-weight: bold;
		font-family: ${asVar('fontFamilyHeading')};
		margin-bottom: 0.5rem;
		font-size: 1.4rem;
	}
`

export const asideContainer = (selector: string): string => `
	${selector} {
		display: grid;
		gap: 1rem;
		border: 1px solid ${asVar('weakColor')};
		padding: 1rem;
		border-radius: ${asVar('borderRadius')};
	}
`
