/* eslint-disable functional/no-expression-statement */
import { whenDefined } from '@devprotocol/util-ts'
import { render } from 'lit-html'
import { app } from './component/page/home/app'
import { rootStyle } from './style/presets'

whenDefined(document.head.querySelector('style#style_app'), (el) =>
	render(rootStyle, el)
)
whenDefined(document.getElementById('app'), (el) => render(app, el))
