// Author: Manuel Puchner, Jakob Schlager, Josef Stieg, Sophie Stöger, Sophie Binder

import { produce } from "immer";
import { Todo } from ".";
import { BASE_URL, IDENTITY, store } from "../";
import { DraftTodo } from "./todo";

export async function loadAllTodos() {
  const response = await fetch(`${BASE_URL}/todos`);
  const todos: Todo[] = await response.json();

  let next = produce(store.getValue(), (draft) => {
    draft.todos = todos;
  });

  console.log("next is:", next);

  store.next(next);
}

export async function toggleTodoCompleted(todoId: Todo["id"]) {
  const todo = store.getValue().todos.find((todo) => todo.id === todoId);
  if (!todo) {
    return;
  }

  const response = await fetch(`${BASE_URL}/todos/${todoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Identity": IDENTITY
    },
    body: JSON.stringify({
      completed: !todo.completed,
    }),
  });

  if (!response.ok) {
    console.error("Failed to toggle todo completed");
    store.next(store.getValue());
    return;
  }

  updateTodoInStore(todoId, { completed: !todo.completed });
}

export function updateTodoInStore(todoId: Todo["id"], update: Partial<Todo>) {
  const next = produce(store.getValue(), (draft) => {
    const currentTodo = draft.todos.find((todo) => todo.id === todoId);
    if (currentTodo) {
      Object.assign(currentTodo, update); // Update the todo with the new properties
    }
  });

  store.next(next);
}

export async function deleteTodo(todoId: Todo["id"]) {
  const todo = store.getValue().todos.find((todo) => todo.id === todoId);

  if (!todo) {
    return;
  }

  const response = await fetch(`${BASE_URL}/todos/${todoId}`, {
    method: "DELETE",
    headers: {
      "Identity": IDENTITY
    },
  });

  if (!response.ok) {
    console.error("Failed to delete todo");
    store.next(store.getValue());
    return;
  }

  deleteTodoFromStore(todoId);
}

export function deleteTodoFromStore(todoId: Todo["id"]) {
  const next = produce(store.getValue(), (draft) => {
    draft.todos = draft.todos.filter((todo) => todo.id !== todoId);
  });

  store.next(next);
}

export async function createTodo(draft: DraftTodo) {
  const storeValues = store.getValue();

  if (!storeValues.users.find((user) => user.id === Number(draft.userId))) {
    console.error("User does not exist");
    return;
  }

  const response = await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Identity": IDENTITY
    },
    body: JSON.stringify({
      userId: Number(draft.userId),
      title: draft.title,
      completed: false,
    }),
  });

  if (!response.ok) {
    console.error("Failed to create todo");
    return;
  }

  const todo: Todo = await response.json();

  addTodoToStore(todo);

  handlePostRequestSuccess();
}

export function addTodoToStore(todo: Todo) {
  const next = produce(store.getValue(), (draft) => {
    draft.todos.push(todo);
  });

  store.next(next);
}

function handlePostRequestSuccess() {
  const next = produce(store.getValue(), (draft) => {
    draft.selectedUser = undefined;
    draft.userSearchQuery = "";
  });

  store.next(next);
}
