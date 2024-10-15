import { enableMapSet } from "immer";
import "./components/app-component";
import { loadAllTodos } from "./features/todo";
import { loadAllUsers } from "./features/user";
import "./components/table/table-component";
import "./components/user-todo/user-todo-component"

enableMapSet();
loadAllUsers();
loadAllTodos();

