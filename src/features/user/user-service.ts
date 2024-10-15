import { produce } from "immer";
import { BASE_URL, store } from ".."
import { UserDraft, User } from "./user";

export async function loadAllUsers() {
  const res = await fetch(`${BASE_URL}/users`);
  const users = await res.json();

  let next = produce(store.getValue(), (draft) => {
    draft.users = users;
  });

  console.log("next is:", next);

  store.next(next);
}


export async function createUser(draft: UserDraft) {
  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(draft),
  });

  if (!response.ok) {
    console.error("Failed to create user");
    return;
  }

  const user = await response.json();

  const next = produce(store.getValue(), (draft) => {
    draft.users.push(user);
  });

  store.next(next);
}

export async function deleteUser(userId: User["id"]) {
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    console.error("Failed to delete user");
    return;
  }

  const next = produce(store.getValue(), (draft) => {
    draft.users = draft.users.filter((user) => user.id !== userId);
    draft.todos = draft.todos.filter((todo) => todo.userId !== userId);
  });

  store.next(next);
}