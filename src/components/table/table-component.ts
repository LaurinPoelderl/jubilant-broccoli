import {html, render} from "lit-html";
import {store} from "../../features";
import {distinctUntilChanged, filter, map} from "rxjs";
import {UserIdObservingElement} from "../utils/UserIdObservingElement";
import {toggleTodo} from "../../features/todo/todo-service";
import {Todo} from "../../features/todo";

class TodoTable extends UserIdObservingElement {
  constructor() {
    super()
  }

  override subscribe() {
    store
        .pipe(
            map(model => model.todos),
            map(todos => todos.filter(todo => todo.userId == this.userId || !this.userId)),
            distinctUntilChanged(),
        )
        .subscribe(todos => {
          render(this.template(todos), this)
        })
  }

  template(todos) {
    console.log(todos)
    const rows = todos.map(todo => {
      return html`
      <tr id=${todo.id} >
        <td>${todo.id}</td>
        <td>${todo.title}</td>
        <input type="checkbox" ?checked=${todo.completed} @click=${() => toggleTodo(todo)}/>
      </tr>
    `
    })
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
}
customElements.define("table-component", TodoTable)