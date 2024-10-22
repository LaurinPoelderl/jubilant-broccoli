import { IDENTITY } from "..";
import { handleMessage } from "./wsTodoHandler";

export enum WebsocketActionType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export type WebsocketMessageWrapper<T> = {
  action: WebsocketActionType;
  payload: T;
};

export function buildURL(protocol?: string) {
  const u = window.location;
  let port = "";
  switch (u.port) {
    case "443":
      break;
    case "80":
      break;
    default:
      port = u.port ? ":" + u.port : "";
  }
  const proto = protocol ? protocol : u.protocol;
  const url = proto + "//" + u.hostname + port;
  return url;
}

export function isCurrentWebsiteUsingSSL() {
  const u = window.location;
  return u.protocol.startsWith("https");
}

export function check(
  socket: WebSocket | null,
  socketEndpoint: string,
  interval: NodeJS.Timeout,
  connectToWebsocket: (
    socket: WebSocket | null,
    socketEndpoint: string,
    interval: NodeJS.Timeout,
    nameInChat: string,
    handleMessage: (data: any) => void
  ) => void
) {
  if (socket) {
    switch (socket.readyState) {
      case WebSocket.CONNECTING:
        console.log("state: connecting", socket);
        break;
      case WebSocket.OPEN:
        console.log("websocket ok", socket);
        break;
      case WebSocket.CLOSING:
        console.log("closing", socket);
        break;
      case WebSocket.CLOSED:
        console.log("socket is closed, connecting...");
        connectToWebsocket(
          socket,
          socketEndpoint,
          interval,
          IDENTITY,
          handleMessage
        );
        break;
    }
  } else {
    connectToWebsocket(socket, socketEndpoint, interval, IDENTITY, handleMessage);
  }
}

export function connectToWebsocket(
  socket: WebSocket | undefined,
  socketEndpoint: string,
  interval: NodeJS.Timeout | undefined,
  nameInChat: string,
  handleMessage: (data: any) => void
) {
  if (socket) {
    socket.close();
  }
  console.log(`connecting to web socket as ${nameInChat}`);
  const protocol = isCurrentWebsiteUsingSSL() ? "wss:" : "ws:";
  const baseUrl = buildURL(protocol);
  const url = `${baseUrl}/api/ws/${socketEndpoint}/${nameInChat}`;
  socket = new WebSocket(url);
  socket.onopen = function (e) {
    console.log(
      "[open] Socket Connection established",
      url.substring(0, 20) + "..."
    );
  };
  socket.onmessage = function (event) {
    handleMessage(event.data);
  };
  socket.onclose = function (event) {
    if (event.wasClean) {
      console.log(
        `[close] Device Connection closed cleanly, code=${event.code} reason=${event.reason}`
      );
    } else {
      console.log("[close] Connection died");
    }
  };
  socket.onerror = (event: Event) => {
    console.log("[error]", event);
  };
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => check(socket, socketEndpoint, interval, connectToWebsocket), 5000);
}
