import { html, render } from "lit-html";
import { distinctUntilChanged, map } from "rxjs";
import { store } from "../../features";
import "../user-todo/user-todos-component";

const singleUserTemplate = (userId: number) => html`
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