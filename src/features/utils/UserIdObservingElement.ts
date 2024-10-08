export abstract class UserIdObservingElement extends HTMLElement {
    static observedAttributes = ["user-id"];

    get userId() {
        const id = this.getAttribute("user-id");
        return parseInt(id) ?? undefined;
    }

    abstract subscribe(): void;

    attributeChangedCallback(name: string, oldValue: any, newValue: string) {
        switch (name) {
            case "user-id":
                this.subscribe();
                break;
        }
    }
}