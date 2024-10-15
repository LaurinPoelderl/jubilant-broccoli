// Author: Manuel Puchner, Jakob Schlager, Josef Stieg, Sophie Stöger, Sophie Binder

import { produce } from "immer";
import { Todo } from ".";
import { BASE_URL, store } from "../";

export async function loadAllTodos() {
  const response = await fetch(`${BASE_URL}/todos`);
  const todos: Todo[] = await response.json();

  let next = produce(store.getValue(), (draft) => {
    draft.todos = todos;
  });

  console.log("next is:", next);

  store.next(next);
}

export async function toggleTodoCompleted(todoId: number) {
  const todo = store.getValue().todos.find((todo) => todo.id === todoId);
  if (!todo) {
    return;
  }

  const response = await fetch(`${BASE_URL}/todos/${todoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      completed: !todo.completed,
    }),
  });

  if(!response.ok) {
    console.error("Failed to toggle todo completed");
    store.next(store.getValue());
    return;
  }

  const next = produce(store.getValue(), (draft) => {
    const currentTodo = draft.todos.find((todo) => todo.id === todoId);
    if (currentTodo) {
      currentTodo.completed = !currentTodo.completed;
    }
  });

  store.next(next);
}

export async function deleteTodo(todoId: number) {
  const todo = store.getValue().todos.find((todo) => todo.id === todoId);

  if (!todo) {
    return;
  }

  const response = await fetch(`${BASE_URL}/todos/${todoId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    console.error("Failed to delete todo");
    store.next(store.getValue());
    return;
  }

  const next = produce(store.getValue(), (draft) => {
    draft.todos = draft.todos.filter((todo) => todo.id !== todoId);
  });

  store.next(next);
}

export async function createTodo() {

}

