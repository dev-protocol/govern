import { component, DirectiveFunction } from '@aggre/ullr'
import { html, TemplateResult } from 'lit-html'
import { asVar } from '../../style/custom-properties'

export const container = (
	children: TemplateResult | DirectiveFunction
): DirectiveFunction =>
	component(html`
		<style>
			div {
				max-width: ${asVar('containerWidth')};
				margin: 0 auto;
				padding: 0 1rem;
			}
		</style>
		<div>${children}</div>
	`)
