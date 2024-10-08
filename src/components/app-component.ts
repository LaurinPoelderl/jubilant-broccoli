import { html, render } from "lit-html";
import { store } from "../features";
import { AppViewmodel, createAppViewmodel } from "./AppViewmodel";

import { filter, map } from "rxjs";
import "./all-users/all-users-component";

class AppComponent extends HTMLElement {
  connectedCallback() {
    console.log("AppComponent connected");
    store
      .pipe(
        filter(model => model.todos.length > 0),
        map(createAppViewmodel)
      )
      .subscribe(appViewModel => this.render(appViewModel));
  }

  render(viewModel: AppViewmodel) {
    console.log("render component: ", viewModel);
    render(template(viewModel), this);
  }
}

function template(viewModel: AppViewmodel) {
    return html`
      <style>
        .flex {
          display: flex;
          gap: 2rem;
          padding-left: 1rem;
          padding-right: 1rem;
        }
      </style>
      <div class="flex">
        <all-users></all-users>

        <div>
          <h2>All Todos</h2>
          <todo-table></todo-table>
        </div>
      </div>
    `;
}

customElements.define("app-component", AppComponent);