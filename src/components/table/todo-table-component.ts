import { html, render } from "lit-html";
import { store } from "../../features";
import { distinctUntilChanged, filter, map, share, tap } from "rxjs";
import { Todo } from "../../features/todo";
import { UserIdObservingElement } from "../utils"

class ToDoTableComponent extends UserIdObservingElement {
  override subscribe() {
    const isMyTodo = (todo: Todo) => todo.userId == this.userId || !this.userId
    store
      .pipe(
        map(model => model.todos),
        map(todos => todos.filter(isMyTodo)),
        tap(todos => console.log(todos)),
        distinctUntilChanged()
      )
      .subscribe(todos => render(template(todos), this ))
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
