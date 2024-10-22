import { IDENTITY } from "..";
import { handleMessage } from "./wsUserHandler";
import { connectToWebsocket as connect } from "./ws";



let socket: WebSocket | undefined = undefined;
let interval: NodeJS.Timeout | undefined = undefined;

const nameInChat = IDENTITY;

export function connectToWebsocket() {
  connect(socket, "users", interval, nameInChat, handleMessage);
}
