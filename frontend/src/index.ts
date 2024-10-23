import { enableMapSet } from "immer";
import "./components/app-component";
import { loadAllTodos } from "./features/todo";
import { loadAllUsers } from "./features/user";
import { connectToWebsocket as connectToTodoWebsocket } from "./features/ws/ws_todo";
import { connectToWebsocket as connectToUserWebsocket } from "./features/ws/ws_user";

enableMapSet();
loadAllUsers();
loadAllTodos();

connectToTodoWebsocket();
connectToUserWebsocket();
