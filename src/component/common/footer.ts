import { html } from 'lit-html'
import { always } from 'ramda'

export const footer = always(html`
	<style>
		footer {
			margin: 5rem;
		}
	</style>

	<footer></footer>
`)
