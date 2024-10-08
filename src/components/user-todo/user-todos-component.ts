import { html, render } from "lit-html";
import { store } from "../../features";
import { User } from "../../features/user";
import "../table";
import { UserIdObservingElement } from "../../features/utils/UserIdObservingElement";
import { distinctUntilChanged, filter, map } from "rxjs";

const template = (users: User[]) => html`
    ${users.map(user => html`
        <h2>${user.name}</h2>
        <todo-table user-id="${user.id}"></todo-table>
    `)}
`

class UserTodosComponent extends UserIdObservingElement {

    connectedCallback(){
        this.subscribe();
    }

    override subscribe(){
        store
          .pipe(
            map(model => model.users),
            map(users => users.filter(user => user.id == this.userId || !this.userId)),
          )
          .subscribe(users => render(template(users), this))
    }
}

customElements.define("user-todos", UserTodosComponent)