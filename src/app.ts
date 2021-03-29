/* eslint-disable functional/no-expression-statement */
import { component } from "@aggre/ullr"
import { html, render } from "lit-html"

const app = document.getElementById('app')

app && render(html`${component(html`<h1>App</h1>`)}`, app)
