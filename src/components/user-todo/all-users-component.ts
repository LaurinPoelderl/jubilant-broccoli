import { distinctUntilChanged, map, tap } from "rxjs"
import { store } from "../../features"
import { html, render } from "lit-html"
import "./user-todo-component"

class AllUsersComponent extends HTMLElement {
    connectedCallback() {
        const shadowRoot = this.attachShadow({mode: "closed"})
        store
            .pipe(
                map(model => model.users),
                map(users => users.map(user => user.id)),
                distinctUntilChanged(),
                tap(ids => console.log("render", ids)),
            )
            .subscribe(uids => renderContent(uids, shadowRoot))
    }
}
customElements.define("all-user-todos", AllUsersComponent)

function renderContent(ids: number[], root: ShadowRoot) {
    console.log("render content", ids)
    const blocks = ids.map(id => html`<user-todos user-id=${id}></user-todos><hr/>`)
    const content = html`
        ${blocks}
    `
    render(content, root)
}