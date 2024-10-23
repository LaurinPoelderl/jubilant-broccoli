package at.htl.todo.user;

import at.htl.todo.todo.TodoDTO;
import at.htl.todo.utils.ws.WebsocketActionType;
import at.htl.todo.utils.ws.WebsocketBroadcaster;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@ServerEndpoint("/ws/users/{username}")
@ApplicationScoped
public class UserSocket {
    Map<String, Session> sessions = new ConcurrentHashMap<>();

    @OnOpen
    public void onOpen(Session session, @PathParam("username") String username) {
        broadcast("User " + username + " joined");
        sessions.put(username, session);
    }

    @OnClose
    public void onClose(Session session, @PathParam("username") String username) {
        sessions.remove(username);
        broadcast("User " + username + " left");
    }

    @OnError
    public void onError(Session session, @PathParam("username") String username, Throwable throwable) {
        sessions.remove(username);
        broadcast("User " + username + " left on error: " + throwable);
    }

    @OnMessage
    public void onMessage(String message, @PathParam("username") String username) {
        broadcast(">> " + username + ": " + message);
    }

    public void broadcast(String message) {
        sessions.values().forEach(s -> {
            s.getAsyncRemote().sendObject(message, result ->  {
                if (result.getException() != null) {
                    System.out.println("Unable to send message: " + result.getException());
                }
            });
        });
    }

    public void broadcastUserCreated(UserDTO userDTO, String username) {
        WebsocketBroadcaster.broadcastObjectWithAction(sessions, WebsocketActionType.CREATE, userDTO, username);
    }

    public void broadcastUserDeleted(Long id, String username) {
        WebsocketBroadcaster.broadcastObjectWithAction(sessions, WebsocketActionType.DELETE, id, username);
    }
}