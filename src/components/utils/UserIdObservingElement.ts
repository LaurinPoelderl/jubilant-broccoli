export abstract class UserIdObservingElement extends HTMLElement {
    static observedAttributes = ["user-id"]
    abstract subscribe(): void

    connectedCallback() {
        this.subscribe()
    }
    attributeChangedCallback(name: string, _: any, value: string) {
        console.log("attributeChangedCallback", name, _, value)
        switch (name) {
            case "user-id":
                this.subscribe()
                break;
            default:
                console.error("wos?")
        }
    }
    get userId() {
        const id = this.getAttribute("user-id")
        return id ? parseInt(id) : undefined
    }
}