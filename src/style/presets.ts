import { asDeclaration, asVar } from './custom-properties'

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
