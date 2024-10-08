import { html, render } from "lit-html";
import { store } from "../features";
import { AppViewmodel, createAppViewmodel } from "./AppViewmodel";
import { filter, map } from "rxjs";

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
   <div style="display: flex;">
    <div>
      <h1>Users</h1>
      <user-todos></user-todos>
    </div>
    <div>
      <h1>Todos</h1>
      <todo-table></todo-table>
    </div>
    </div>
  `
}

customElements.define("app-component", AppComponent);