import test from 'ava'
import { findHeadings, parseMarkdown } from './parse-markdown'
import markdownIt from 'markdown-it'

test('parseMarkdown; parses the passed string as a markdown', (t) => {
	const md = `
	# Test
	This is a test
	`
	t.deepEqual(parseMarkdown(md), new markdownIt().parse(md, {}))
})

test('findHeadings; returns the headings in the passed markdown', (t) => {
	const md = `
# Test

This is a test

## Alice

This is a test
	`
	t.deepEqual(findHeadings(md), ['Test', 'Alice'])
	t.log(parseMarkdown(md))
})
