import { produce } from "immer";
import { Todo } from ".";
import { BASE_URL, store } from "../";

export async function loadAllTodos() {
  const response = await fetch(`${BASE_URL}/todos`);
  console.log(response)
  const todos: Todo[] = await response.json();

  let next = produce(store.getValue(), (draft) => {
    draft.todos = todos;
  })

  console.log("next is:", next);  

  store.next(next);
}

export async function toggleTodo(todo: Todo) {
  const updatedTodo = { ...todo, completed: !todo.completed };

  console.log("todo", todo)
  console.log("updated todo", updatedTodo)

  const request = new Request(`${BASE_URL}/todos/${todo.id}`, {
    method: "PUT",
    body: JSON.stringify(updatedTodo),
  });
  const response = await fetch(request)


  const resTodo: Todo = await response.json();

  let next = produce(store.getValue(), (draft) => {
    const index = draft.todos.findIndex(t => t.id === resTodo.id);
    if (index !== -1) {
      draft.todos[index] = resTodo;
    }
  })
  store.next(next);
}
