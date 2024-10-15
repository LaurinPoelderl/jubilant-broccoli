import { produce } from "immer";
import { store } from "../model";
import { User } from "../user/user";

export function searchUser(query: string) {
  const next = produce(store.getValue(), (draft) => {
    draft.userSearchQuery = query;
    draft.selectedUser = undefined;
  })
  store.next(next);
}

export function selectUser(user: User) {
  console.log("selecting user", user);  
  const next = produce(store.getValue(), (draft) => {
    draft.selectedUser = user;
  })
  store.next(next);
}