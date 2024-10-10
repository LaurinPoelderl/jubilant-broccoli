import { html, render } from "lit-html";
import { store } from "../../features";
import { distinctUntilChanged, map, tap } from "rxjs";
import { Todo } from "../../features/todo";
import { UserIdObservingElement } from "../utils"

class ToDoTableComponent extends UserIdObservingElement {
  constructor() {
    super()
    this.attachShadow({mode: "open"})
  }
  override subscribe() {
    const isMyTodo = (todo: Todo) => todo.userId == this.userId || !this.userId
    store
      .pipe(
        map(model => model.todos),
        map(todos => todos.filter(isMyTodo)),
        tap(todos => console.log(todos)),
        distinctUntilChanged()
      )
      .subscribe(todos => render(template(todos), this.shadowRoot))
  }
}
customElements.define("todo-table", ToDoTableComponent)

function template(todos: Todo[]) {
  const rows = todos.map(todo => html`<tr><td>${todo.id}</td><td>${todo.title}</td></tr>`)
  return html`
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
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
