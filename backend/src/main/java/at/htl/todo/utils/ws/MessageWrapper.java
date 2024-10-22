package at.htl.todo.utils.ws;

public class MessageWrapper<T> {
    private WebsocketActionType action;
    private T payload;

    public MessageWrapper(WebsocketActionType action, T payload) {
        this.action = action;
        this.payload = payload;
    }

    // region Getter and Setter

    public WebsocketActionType getAction() {
        return action;
    }

    public void setAction(WebsocketActionType action) {
        this.action = action;
    }

    public T getPayload() {
        return payload;
    }

    public void setPayload(T payload) {
        this.payload = payload;
    }

    //endregion
}
