import { html, render } from "lit-html";
import { DraftTodo } from "../../features/todo/todo";
import { FormElement } from "../utils";
import { User } from "../../features/user";
import { store } from "../../features";
import { map, tap } from "rxjs";

class SearchElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    store
      .pipe(
        map((model) => {
          return {
            users: model.users,
            query: model.userSearchQuery,
            selectUser: model.selectedUser
          };
        }),
        map(({ users, query, selectUser }) => {
          if (!query || !!selectUser) {
            return [];
          }
          return users.filter((user) =>
            user.name.toLowerCase().includes(query)
          );
        }),
        tap((users) => console.log("filtered users", users))
      )
      .subscribe((filteredUsers) => {
        render(this.template(filteredUsers), this.shadowRoot);
      });
  }

  selectUser(user: User) {
    console.log("[component] select user", user);
    this.dispatchEvent(new CustomEvent("select-user", { detail: user, bubbles: true, composed: true }));
  }

  template(filteredUsers: User[]) {
    return html`
      <style>
        .autocomplete-suggestions {
          position: absolute;
          background-color: white;
          border: 1px solid #ccc;
          max-width: 100%;
          width: 300px;
          max-height: 200px;
          overflow-y: auto;
        }
        .autocomplete-suggestion {
          padding: 0.5rem;
          cursor: pointer;
        }
      </style>
      <div class="autocomplete-suggestions">
        ${filteredUsers.map(
          (user) => html`
            <div
              class="autocomplete-suggestion"
              @click=${() => this.selectUser(user)}
            >
              ${user.name}
            </div>
          `
        )}
      </div>
    `;
  }
}

customElements.define("user-search-element", SearchElement);

class CreateTodoComponent extends FormElement<DraftTodo> {
  eventName = "create-todo";

  constructor() {
    super();
  }

  override connectedCallback() {
    store
      .pipe(
        map((model) => model.selectedUser),
        tap((selectedUser) => console.log("selectedUser", selectedUser))
      )
      .subscribe((selectedUser) => {
        render(this.template(selectedUser), this.shadowRoot);
      })
  }

  handleSearch(e: InputEvent) {
    const query = (e.target as HTMLInputElement).value.toLowerCase();
    this.dispatchEvent(
      new CustomEvent("search-user", {
        detail: query,
        bubbles: true,
        composed: true,
      })
    );
  }

  template(selectedUser: User) {
    return html`
      ${this.css()}
      <h2>Create Todo</h2>

      <form @submit=${(e) => this.formSubmit(e, this.shadowRoot as ShadowRoot)}>
        <input type="hidden" name="userId" value=${selectedUser?.id || ""}/>
        <div class="flex">
          <label for="userId">User</label>
          <input
            type="text"
            id="userSearch"
            name="userSearch"
            @input=${this.handleSearch}
            .value=${selectedUser?.name || ""}
            placeholder="Search by user name"
          />
          <user-search-element></user-search-element>
        </div>

        <div class="flex">
          <label for="title">Title</label>
          <input type="text" name="title" />
        </div>

        <input type="submit" />
      </form>
    `;
  }
}

customElements.define("create-todo", CreateTodoComponent);
