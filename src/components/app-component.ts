import { html, render } from "lit-html";
import "../components/user-todo/user-todo-component"

class AppComponent extends HTMLElement {
  connectedCallback() {
    console.log("AppComponent connected");
    render(template(), this);
  }
}
function template() {
    return html`
      <user-todos user-id="4"></user-todos>
    `
}
customElements.define("app-component", AppComponent);