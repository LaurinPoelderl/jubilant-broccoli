import { Todo } from "../todo";
import {
  addTodoToStore,
  deleteTodoFromStore,
  updateTodoInStore,
} from "../todo/todo-service";
import { User } from "../user";
import { addUserToStore, deleteUserFromStore } from "../user/user-service";
import { WebsocketActionType, WebsocketMessageWrapper } from "./ws";

export function handleMessage(message: string) {
  try {
    const data = JSON.parse(message) as WebsocketMessageWrapper<any>;
    console.log("message received", data);

    switch (data.action) {
      case WebsocketActionType.CREATE:
        handleCreateUser(data.payload as User);
        break;
      case WebsocketActionType.DELETE:
        handleDeleteUser(data.payload as User["id"]);
        break;
    }
  } catch (error) {
    console.log("message received", message);
  }
}

function handleCreateUser(user: User) {
  console.log("handleCreateUser: ", user);
  addUserToStore(user);
}

function handleDeleteUser(userId: User["id"]) {
  console.log("handleDeleteUser: ", userId);
  deleteUserFromStore(userId);
}
