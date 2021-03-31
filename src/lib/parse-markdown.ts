import markdownIt from 'markdown-it'
import Token from 'markdown-it/lib/token'

export const parseMarkdown = (md = ''): readonly Token[] =>
	new markdownIt().parse(md, {})

export const findHeadings = (md = ''): readonly string[] =>
	((tokens) =>
		tokens
			.map((token, _index) => ({ ...token, _index }))
			.filter((token) => token.type === 'heading_open')
			.map((token) => tokens[token._index + 1].content)
			.filter((c) => c))(parseMarkdown(md))
