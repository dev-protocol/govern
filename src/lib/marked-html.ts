import markdownIt from 'markdown-it'
import { html, TemplateResult } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'

const parse = markdownIt({
	html: true,
	linkify: true,
})

export const markedHTML = (md = ''): TemplateResult =>
	html` ${unsafeHTML(parse.render(md))} `
