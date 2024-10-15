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

export async function toggleTodo(task: Todo) {
  try {
    const updatedTask = { ...task, completed: !task.completed };

    console.log("Original task:", task);
    console.log("Task with toggled completion:", updatedTask);

    const response = await fetch(`${BASE_URL}/todos/${task.id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });

    if (!response.ok) {
      throw new Error(`Failed to update task: ${response.statusText}`);
    }

    const updatedServerTask: Todo = await response.json();

    updateStoreWithTask(updatedServerTask);

  } catch (error) {
    console.error("Error updating task:", error);
  }
}

function updateStoreWithTask(updatedTask: Todo) {
  const updatedStore = produce(store.getValue(), (draft) => {
    const taskIndex = draft.todos.findIndex(t => t.id === updatedTask.id);
    if (taskIndex !== -1) {
      draft.todos[taskIndex] = updatedTask;
    }
  });

  store.next(updatedStore);
}
