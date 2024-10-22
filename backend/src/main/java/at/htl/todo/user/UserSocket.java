package at.htl.todo.user;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.websocket.server.ServerEndpoint;

@ServerEndpoint("/ws/users/{username}")
@ApplicationScoped
public class UserSocket {
}
