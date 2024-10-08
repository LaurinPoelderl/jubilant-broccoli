import { html, render } from "lit-html";
import { store } from "../../features";
import { distinctUntilChanged, filter, map, share, tap } from "rxjs";
import { Todo } from "../../features/todo";
import {  UserIdObservingElement } from "../utils";

class ToDoTableComponent extends UserIdObservingElement {
  static observedAttributes = ["user-id"];
  

  constructor() {
    super();
    console.log("Hello there");
  }
  override subscribe() {
    const isMyTodo = (todo: Todo) => !this.userId || todo.userId === this.userId;
    store
      .pipe(
        map((model) => model.todos),
        map(todos => todos.filter(isMyTodo)),
        distinctUntilChanged(),
      )
      .subscribe((todos) => render(template(todos), this));
  }
}

customElements.define("todo-table", ToDoTableComponent);

function template(todos: Todo[]) {
  return html`
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        ${todos.map(
          (todo) => html`
            <tr>
              <td>${todo.id}</td>
              <td>${todo.title}</td>
              <td>
                <input type="checkbox" ?checked=${todo.completed} disabled />
              </td>
            </tr>
          `
        )}
      </tbody>
    </table>
  `;
}
