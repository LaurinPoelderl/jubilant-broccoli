import { html, render } from "lit-html";
import { store } from "../../features";
import { distinctUntilChanged, filter, map } from "rxjs";
import { Todo } from "../../features/todo";
import { UserIdObservingElement } from "../../features/utils/UserIdObservingElement";

class ToDoTableComponent extends UserIdObservingElement {
  
  constructor(){
    super()
    console.log("Hello there")
  }

  connectedCallback() {
    this.subscribe();
  }

  subscribe(){
    store
        .pipe(
          map(model => model.todos),
          map(todos => todos.filter(todo => todo.userId == this.userId || !this.userId)),
          distinctUntilChanged()
        )
        .subscribe(todos => render(this.template(todos), this))
  }

  template(todos: Todo[]) {
    const rows = todos.map(todo => html`<tr><td>${todo.id}</td><td>${todo.title}</td></tr>`)
    
    return html`
      <table>
        <thead>
          <tr>
            <th>
              ID
            </th>
            <th>
              TITLE
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

customElements.define("todo-table", ToDoTableComponent)