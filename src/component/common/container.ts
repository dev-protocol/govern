import { shadow } from '@aggre/ullr'
import { html, TemplateResult } from 'lit'
import { DirectiveResult } from 'lit-html/directive.js'
import { asVar } from '../../style/custom-properties'

export const container = (
	children: TemplateResult | DirectiveResult
): DirectiveResult =>
	shadow(html`
		<style>
			div {
				max-width: ${asVar('containerWidth')};
				margin: 0 auto;
				padding: 0 1rem;
			}
		</style>
		<div>${children}</div>
	`)
