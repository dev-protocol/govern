import { asDeclaration, asVar } from './custom-properties'
import { button } from './reset/button'

export const rootStyle = `
	:root {
		${asDeclaration()}
	}
	@media (prefers-color-scheme: dark) {
		:root {
			${asDeclaration('dark')}
		}
	}
	body {
		margin: 0;
		background: ${asVar('baseColor')};
		font-size: ${asVar('fontSize')};
		font-family: ${asVar('fontFamilyBody')};
		color: ${asVar('fontColor')};
	}
	a {
		color: ${asVar('secondaryColor')};
	}
`

export const primaryButton = `
	${button}
	button {
		padding: 0.6rem 1rem;
		font-size: 1rem;
		background: ${asVar('primaryColor')};
		color: ${asVar('onPrimaryColor')};
		font-family: ${asVar('fontFamilyUI')};
		border-radius: ${asVar('borderRadius')};
	}
`
