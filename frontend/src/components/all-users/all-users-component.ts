// Author: Manuel Puchner, Jakob Schlager, Josef Stieg, Sophie Stöger, Sophie Binder

import { html, render } from "lit-html";
import { distinctUntilChanged, map } from "rxjs";
import { store } from "../../features";
import "../user-todo/user-todos-component";
import { User } from "../../features/user";

const singleUserTemplate = (userId: User["id"]) => html`
  <div>
    <user-todos user-id=${userId}></user-todos>
  </div>
`;

class AllUsers extends HTMLElement {
  connectedCallback() {
    store
      .pipe(
        map((model) => model.users),
        map((users) => users.map((user) => user.id)),
        distinctUntilChanged(),
        map((userIds) => userIds.map(singleUserTemplate))
      )
      .subscribe((templates) => render(templates, this));
  }
}

customElements.define("all-users", AllUsers);
