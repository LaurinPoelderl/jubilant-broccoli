import { html } from "lit-html"
import { User } from "../../features/user"
import "../table"
import { UserIdObservingElement } from "../utils"
import { store } from "../../features"
import { map } from "rxjs"

const template = (user: User) => html`
    <div class="container">
        <div>${user.name}</div>
        <hr/>
        <todo-table user-id=${user.id}></todo-table>
    </div>
`

class UserTodosComponent extends UserIdObservingElement {
    override subscribe() {
       store
            .pipe(
                map(model => model.users),
                map(users => users.find(user => user.id == this.userId))
            )
            .subscribe(user => console.log("Machen: render ", user))
    }
}
customElements.define("user-todos", UserTodosComponent)