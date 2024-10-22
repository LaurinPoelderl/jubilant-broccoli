import { html, render } from "lit-html"
import { User } from "../../features/user"
import "../table"
import { UserIdObservingElement } from "../utils"
import { store } from "../../features"
import { distinctUntilChanged, filter, map } from "rxjs"

const template = (user: User) => html`
    <div class="container">
        <h3 class="large">${user.name}</h3>
        <hr/>
        <todo-table user-id=${user.id}></todo-table>
    </div>
`

class UserTodosComponent extends UserIdObservingElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    override subscribe() {
       store
            .pipe(
                map(model => model.users),
                map(users => users.find(user => user.id == this.userId)),
                filter(user => !!user),
                distinctUntilChanged(),
                map(template)
            )
            .subscribe(content => {
                render(content, this.shadowRoot)
                const table = this.shadowRoot.querySelector("todo-table")
                table.addEventListener("todo-clicked", (e: CustomEvent) => console.log("todo click event received !", e))
                table.addEventListener("todo-clicked", (e: CustomEvent) => console.log("todo click event received (2)", e))
            })
    }
}
customElements.define("user-todos", UserTodosComponent)