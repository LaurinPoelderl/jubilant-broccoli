import { IDENTITY } from "..";
import { handleMessage } from "./wsTodoHandler";
import { connectToWebsocket as connect } from "./ws";

export enum WebsocketActionType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export type WebsocketMessageWrapper<T> = {
  action: WebsocketActionType;
  payload: T;
}

let socket: WebSocket | undefined = undefined;
let interval: NodeJS.Timeout | undefined = undefined;

const nameInChat = IDENTITY

export function connectToWebsocket() {
  connect(socket, "todos", interval, nameInChat, handleMessage);
}

