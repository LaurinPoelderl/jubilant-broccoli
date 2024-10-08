import { enableMapSet } from "immer";
import "./components/app-component";
import { loadAllTodos } from "./features/todo";
import { loadAllUsers } from "./features/user";
import "./components/table/todo-table-component";

enableMapSet();
loadAllUsers();
loadAllTodos();

