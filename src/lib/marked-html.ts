import markdownIt from 'markdown-it'
import { html, TemplateResult } from 'lit-html'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'

const parse = markdownIt({
	html: true,
	linkify: true,
})

export const markedHTML = (md = ''): TemplateResult =>
	html` ${unsafeHTML(parse.render(md))} `
