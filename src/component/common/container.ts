import { component, DirectiveFunction } from '@aggre/ullr'
import { html, TemplateResult } from 'lit-html'
import { asVar } from '../../style/custom-properties'

export const container = (
	children: TemplateResult | DirectiveFunction
): DirectiveFunction =>
	component(html`
		<style>
			div {
				width: ${asVar('containerWidth')};
				margin: 0 auto;
			}
		</style>
		<div>${children}</div>
	`)
