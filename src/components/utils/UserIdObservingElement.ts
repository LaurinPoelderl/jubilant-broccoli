export abstract class UserIdObservingElement extends HTMLElement{
    static observedAttributes = ["user-id"]
    abstract subscribe():void

    connectedCallback() {
        this.subscribe()
    }

    get userId() {
        const id = this.getAttribute("user-id")
        return id ? parseInt(id) : undefined
    }

    attributeChangedCallback(name: string, oldValue: any, value: string) {
        console.log("attributeChangedCallback", name, oldValue, value)
        switch (name) {
            case "user-id":
                this.subscribe()
                break;
            default:
                console.log("Wos do los?")
        }
    }

}