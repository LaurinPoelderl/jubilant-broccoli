import {html, render} from "lit-html";
import {User} from "../../features/user";
import {UserIdObservingElement} from "../utils/UserIdObservingElement";
import {store} from "../../features";
import {distinctUntilChanged, filter, map} from "rxjs";
import * as colorette from "colorette";
import {makeLogger} from "ts-loader/dist/logger";

class UserTodoComponent extends UserIdObservingElement {
    private root: ShadowRoot;
    constructor() {
        super();
        this.root = this.attachShadow({mode: "open"})
    }

    override subscribe(): void {

        store.pipe(
            map(model => model.users),
            map(users => users.filter(user => user.id == this.userId || !this.userId)),
            filter(user => !!user),
            distinctUntilChanged()
        )
        .subscribe(users => {
            render(this.template(users), this.root)
        })
    }

    template = (users: User[]) => html`
    ${users.map(user => html`
        <div class="container">
            <div>${user.name}</div>
            <hr>
            <table-component user-id="${user.id}"></table-component>
        </div>`
    )}
`
}

customElements.define("user-todos", UserTodoComponent)