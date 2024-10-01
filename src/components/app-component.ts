import { html, render } from "lit-html";
import { Model, store } from "../features";
import { User } from "../features/user";
import { AppViewmodel, createAppViewmodel } from "./AppViewmodel";
import { Todo } from "../features/todo";
import { filter, map } from "rxjs";


console.log("AppComponent imported");

class AppComponent extends HTMLElement {
  connectedCallback() {
    console.log("AppComponent connected");
    store
      .pipe(
        filter(model => model.todos.length > 0),
        map(createAppViewmodel)
      )
      .subscribe(appViewModel => this.render(appViewModel));
  }

  render(viewModel: AppViewmodel) {
    console.log("render component: ", viewModel);
    render(usersTemplate(viewModel), this);
  }
}

function usersTemplate(viewModel: AppViewmodel) {
  return html`
    ${viewModel.userTodos.map((userTodo) =>
      userRowTemplate(userTodo.user, userTodo.todos)
    )}
  `;
}

function userRowTemplate(user: User, todos: Todo[]) {
  return html`
    <style>
      details > summary {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    </style>
    <div>
      <details>
        <summary><h2>${user.name}</h2></summary>
        ${todoTableTemplate(todos)}
      </details>
    </div>
  `;
}

function todoTableTemplate(todos: Todo[]) {
  return html`
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        ${todos.map((todo) => todoRowTemplate(todo))}
      </tbody>
    </table>
  `;
}

function todoRowTemplate(todo: Todo) {
  return html`
    <tr>
      <td>${todo.title}</td>
      <td>
        <input type="checkbox" .checked=${todo.completed} disabled />
      </td>
    </tr>
  `;
}

customElements.define("app-component", AppComponent);