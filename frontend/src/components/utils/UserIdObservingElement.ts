import { User } from "../../features/user";

export abstract class UserIdObservingElement extends HTMLElement {
  static observedAttributes = ["user-id"];

  abstract subscribe(): void;

  connectedCallback() {
    this.subscribe();
  }

  attributeChangedCallback(name: string, oldValue: any, value: string) {
    console.log("attributeChangedCallback", name, oldValue, value);
    switch (name) {
      case "user-id":
        this.subscribe();
        break;
    }
  }

  get userId(): User["id"] | undefined {
    const userIdAttr = this.getAttribute("user-id");
    return userIdAttr ? userIdAttr : undefined;
  }
}
