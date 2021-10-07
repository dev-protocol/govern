import { shadow } from '@aggre/ullr'
import { html } from 'lit'
import { DirectiveResult } from 'lit-html/directive.js'
import { repeat } from 'lit/directives/repeat.js'
import { asVar } from '../../style/custom-properties'

type Props = {
	readonly row?: number
}

export const placeholder = ({ row = 3 }: Props = {}): DirectiveResult =>
	shadow(html`
		<style>
			div {
				display: grid;
				gap: 1rem;
			}
			div,
			span {
				border-radius: ${asVar('borderRadius')};
			}
			span {
				display: block;
				height: 3rem;
				animation: k 2s infinite alternate;
			}
			span:not(:only-child):last-child {
				width: 70%;
			}
			@keyframes k {
				0% {
					background: ${asVar('weakColor')};
				}
				100% {
					background: ${asVar('surfaceColor')};
				}
			}
		</style>
		<div>${repeat(new Array(row).fill(html`<span></span>`), (x) => x)}</div>
	`)
