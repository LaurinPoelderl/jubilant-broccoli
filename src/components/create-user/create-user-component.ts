import { html, render } from "lit-html";
import { UserDraft } from "../../features/user/user";
import { FormElement } from "../utils";

class CreateUserComponent extends FormElement<UserDraft> {
  eventName = "create-user";
  constructor() {
    super();
  }

  template() {
    return html`
      ${this.css()}
      <h2>Create User</h2>

      <form @submit=${(e) => this.formSubmit(e, this.shadowRoot as ShadowRoot)}>
        <div class="flex">
          <label for="name">Name</label>
          <input type="string" name="name" />
        </div>

        <div class="flex">
          <label for="username">Username</label>
          <input type="text" name="username" />
        </div>
        <div class="flex">
          <label for="email">email</label>
          <input type="text" name="email" />
        </div>

        <input type="submit" />
      </form>
    `;
  }

}

customElements.define("create-user", CreateUserComponent);