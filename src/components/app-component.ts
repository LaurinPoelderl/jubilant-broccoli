import { html, render } from "lit-html";
import { Model, store } from "../features";
import { User } from "../features/user";
import { AppViewmodel, createAppViewmodel } from "./AppViewmodel";
import { Todo } from "../features/todo";
import { filter, map } from "rxjs";

class AppComponent extends HTMLElement {
  private root: ShadowRoot;
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    render(template(), this.root);
  }
}

function template() {
    return html`
      <div style="display: flex; justify-content: space-evenly; margin: 0 5%">
        <div>
          <h1>Users</h1>
          <user-todos></user-todos>
        </div>
        <div>
          <h1>Todos</h1>
          <table-component></table-component>
        </div>
      </div>
    `
}

customElements.define("app-component", AppComponent);