import { html, render } from "lit-html";
import { store } from "../features";
import { AppViewmodel, createAppViewmodel } from "./AppViewmodel";

import { filter, map } from "rxjs";
import "./all-users/all-users-component";

class AppComponent extends HTMLElement {
  private root: ShadowRoot;
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "closed" });
  }

  connectedCallback() {
    console.log("AppComponent connected");
    store
      .pipe(
        filter((model) => model.todos.length > 0),
        map(createAppViewmodel)
      )
      .subscribe((appViewModel) => this.render(appViewModel));
  }

  render(viewModel: AppViewmodel) {
    console.log("render component: ", viewModel);
    render(this.template(viewModel), this.root);
  }


  template(viewModel: AppViewmodel) {
    return html`
      <style>
        .flex {
          display: flex;
          gap: 2rem;
          padding-left: 1rem;
          padding-right: 1rem;
        }
      </style>
      <div class="flex" @toggle-todo-completed=${viewModel.toggleTodoCompleted}>
        <all-users></all-users>

        <div>
          <h2>All Todos</h2>
          <todo-table></todo-table>
        </div>
      </div>
    `;
  }
}

customElements.define("app-component", AppComponent);