package at.htl.todo.utils.ws;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.websocket.Session;

import java.util.Map;

public class WebsocketBroadcaster {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static <T> void broadcastObjectWithAction(Map<String, Session> sessions, WebsocketActionType action, T object, String username) {
        try {
            // Create a message wrapper that includes the action and the object
            MessageWrapper<T> message = new MessageWrapper<>(action, object);

            // Convert the message wrapper to JSON
            String jsonMessage = objectMapper.writeValueAsString(message);

            // Broadcast the JSON representation of the message to all sessions
            sessions.keySet().forEach(key -> {
                if (!key.equals(username)) {
                    sessions.get(key).getAsyncRemote().sendObject(jsonMessage, result -> {
                        if (result.getException() != null) {
                            System.out.println("Unable to send message: " + result.getException());
                        }
                    });
                }
            });
        } catch (Exception e) {
            System.out.println("Error serializing object to JSON: " + e.getMessage());
        }
    }
}