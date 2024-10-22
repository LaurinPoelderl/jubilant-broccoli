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
        // filter((user) => !!user),
        distinctUntilChanged()
      )
      .subscribe((user) => render(this.template(user), this.shadowRoot));
  }

  deleteUser(user: User) {
    this.dispatchEvent(
      new CustomEvent("delete-user", {
        detail: user,
        bubbles: true,
        composed: true,
      })
    );
  }

  template(user: User | undefined) {
    if (!user) {
      return html`<p>User not found</p>`;
    }
    return html`
      <style>
        .flex {
          display: flex;
          gap: 2rem;
        }
        button {
          background-color: transparent;
          border: none;
          cursor: pointer;
          font-size: 1.5rem;
        }
      </style>
      <div class="container">
        <div class="flex">
          <h2>${user.name}</h2>
          <button @click=${() => this.deleteUser(user)}>🗑️</button>
        </div>
        <hr />
        <todo-table user-id=${user.id}></todo-table>
      </div>
    `;
  }
}

customElements.define("user-todos", UserTodosComponent);
