import { Todo } from "../todo";
import {
  addTodoToStore,
  deleteTodoFromStore,
  updateTodoInStore,
} from "../todo/todo-service";
import { WebsocketActionType, WebsocketMessageWrapper } from "./ws_todo";

export function handleMessage(message: string) {
  try {
    const data = JSON.parse(message) as WebsocketMessageWrapper<any>;
    console.log("message received", data);

    switch (data.action) {
      case WebsocketActionType.CREATE:
        handleCreateTodo(data.payload as Todo);
        break;
      case WebsocketActionType.UPDATE:
        handleUpdateTodo(data.payload.id, data.payload as Partial<Todo>);
        break;
      case WebsocketActionType.DELETE:
        handleDeleteTodo(data.payload as Todo["id"]);
        break;
    }
  } catch (error) {
    console.log("message received", message);
  }
}

function handleCreateTodo(todo: Todo) {
  console.log("handleCreateTodo: ", todo);
  addTodoToStore(todo);
}

function handleUpdateTodo(todoId: number, todo: Partial<Todo>) {
  console.log("handleUpdateTodo: ", todo);
  updateTodoInStore(todo.id, todo);
}

function handleDeleteTodo(todoId: Todo["id"]) {
  console.log("handleDeleteTodo: ", todoId);
  deleteTodoFromStore(todoId);
}
