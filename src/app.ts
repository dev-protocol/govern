/* eslint-disable functional/no-expression-statement */
import { render } from 'lit-html'
import { app } from './component/page/home/app'
import { rootStyle } from './style/presets'

const createElementWhenUndefined = (name: string): HTMLElement =>
	document.head.querySelector(name) ??
	((t) => document.head.appendChild(t))(document.createElement(name))

const mount = document.getElementById('app')

render(rootStyle, createElementWhenUndefined('style'))

mount && render(app, mount)
