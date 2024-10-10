import { html, render } from "lit-html"
import "../components/user-todo/all-users-component"

class AppComponent extends HTMLElement {
  connectedCallback() {
    console.log("AppComponent connected");
    render(template(), this);
  }
}
function template() {
    return html`
      <all-user-todos class="container"></all-user-todos>
    `
}
customElements.define("app-component", AppComponent)