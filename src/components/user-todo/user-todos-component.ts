import { html, render } from "lit-html";
import { User } from "../../features/user";
import { store } from "../../features";
import "../table/todo-table-component";
import { distinctUntilChanged, map } from "rxjs";
import { UserIdObservingElement } from "../utils";

const template = (user: User) => html`
  <div class="container">
    <h2>${user.name}</h2>
    <hr />
    <todo-table user-id=${user.id}></todo-table>
  </div>
`;

class UserTodosComponent extends UserIdObservingElement {
  override subscribe() {
    store
      .pipe(
        map((model) => model.users),
        map((users) => users.find((user) => user.id === this.userId)),
        distinctUntilChanged()
      )
      .subscribe((user) => render(template(user), this));
  }
}

customElements.define("user-todos", UserTodosComponent);
