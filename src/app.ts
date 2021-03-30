/* eslint-disable functional/no-expression-statement */
import { whenDefined } from '@devprotocol/util-ts'
import { render } from 'lit-html'
import page from './component/page'
import { route } from './store/route'
import { rootStyle } from './style/presets'

whenDefined(document.head.querySelector('style#style_app'), (el) =>
	render(rootStyle, el)
)
whenDefined(document.getElementById('app'), (el) => render(page, el))

route.subscribe((x) => history.pushState(undefined, '', x))
