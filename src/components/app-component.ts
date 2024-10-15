import { html, render } from "lit-html"
import "../components/user-todo/all-users-component"

class AppComponent extends HTMLElement {
  private root: ShadowRoot
  constructor() {
    super()

    this.root = this.attachShadow({mode: "closed"})
  }
  connectedCallback() {
    console.log("AppComponent connected");
    render(template(), this.root);
  }
}
function template() {
    return html`
      <style>
          body {
            color: red
          }
      </style>
      <all-user-todos class="container"></all-user-todos>
    `
}
customElements.define("app-component", AppComponent)