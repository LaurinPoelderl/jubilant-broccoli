// Author: Manuel Puchner, Jakob Schlager, Josef Stieg, Sophie Stöger, Sophie Binder

import { html, render } from "lit-html";
import { User } from "../../features/user";
import { store } from "../../features";
import "../table/todo-table-component";
import { distinctUntilChanged, filter, map, tap } from "rxjs";
import { UserIdObservingElement } from "../utils";

class UserTodosComponent extends UserIdObservingElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  override subscribe() {
    store
      .pipe(
        map((model) => model.users),
        map((users) => users.find((user) => user.id == this.userId)),
        filter((user) => !!user),
        distinctUntilChanged()
      )
      .subscribe((user) => render(this.template(user), this.shadowRoot));
  }

  template = (user: User) => html`
    <div class="container">
      <h2>${user.name}</h2>
      <hr />
      <todo-table user-id=${user.id}></todo-table>
    </div>
  `;
}

customElements.define("user-todos", UserTodosComponent);
