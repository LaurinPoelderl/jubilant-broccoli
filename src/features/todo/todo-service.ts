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
  try {
    const updatedTodo = { ...todo, completed: !todo.completed };

    console.log("Original task:", todo);
    console.log("Task with toggled completion:", updatedTodo);

    const response = await fetch(`${BASE_URL}/todos/${todo.id}`, {
      method: "PUT" ,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTodo),
    });

    if (!response.ok) {
      throw new Error(`Failed to update task: ${response.statusText}`);
    }

    const updatedServerTask: Todo = await response.json();

    updateStoreWithTodo(updatedServerTask);

  } catch (error) {
    console.error("Error updating task:", error);
  }
}

function updateStoreWithTodo(updatedTodo: Todo) {
  const updatedStore = produce(store.getValue(), (draft) => {
    const taskIndex = draft.todos.findIndex(t => t.id === updatedTodo.id);
    if (taskIndex !== -1) {
      draft.todos[taskIndex] = updatedTodo;
    }
  });

  store.next(updatedStore);
}
