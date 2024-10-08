import { html, render } from "lit-html";
import { store } from "../../features";
import { distinctUntilChanged, filter, map, share } from "rxjs";
import { Todo } from "../../features/todo";

class ToDoTableComponent extends HTMLElement {
  static observedAttributes = ["user-id"]
  userId?: number

  connectedCallback() {
  }
  subscribe() {

    const isMyTodo = (todo: Todo) => todo.userId == this.userId || !this.userId
    
    store
      .pipe(
        map(model => model.todos),
        map(todos => todos.filter(isMyTodo)),
        distinctUntilChanged()
      )
      .subscribe(todos => render(template(todos), this ))

  }
  attributeChangedCallback(name: string, _: any, value: string){
    console.log("attributeChangedCallback", name, _, value)
    switch (name ) {
      case "user-id":
        this.userId = value ? parseInt(value) : undefined
        this.subscribe()
        break;
        default:
          console.error("wos?")
    }
  }
}
customElements.define("todo-table", ToDoTableComponent)

function template(todos: Todo[]) {
  const rows = todos.map(todo => html`<tr><td>${todo.id}</td><td>${todo.title}</td></tr>`)
  return html`
  <table>
    <thead>
      <tr>
        <th>
          ID
        </th>
        <th>
          Title
        </th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
`
}
