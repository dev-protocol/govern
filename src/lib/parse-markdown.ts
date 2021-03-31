import markdownIt from 'markdown-it'
import Token from 'markdown-it/lib/token'

export const parseMarkdown = (md = ''): readonly Token[] =>
	new markdownIt().parse(md, {})

export const findHeadings = (md = ''): readonly string[] =>
	((tokens) =>
		tokens
			.filter((token) => token.type === 'heading_open')
			.map((_, i) => tokens[i + 1].content)
			.filter((c) => c))(parseMarkdown(md))
