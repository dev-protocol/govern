import { component } from '@aggre/ullr'
import { html } from 'lit-html'
import { connect } from '../../common/button/connect'
import { header } from '../../common/header'

export const app = component(html`${header()}${connect('Connect to a wallet')}`)
