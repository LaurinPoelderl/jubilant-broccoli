import { html, render } from "lit-html";
import { DraftTodo } from "../../features/todo/todo";

export abstract class FormElement<DraftType> extends HTMLElement {
  abstract eventName: string;
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    render(this.template(), this.shadowRoot as ShadowRoot);
  }

  abstract template(...props: any): ReturnType<typeof html>;

  formSubmit(e: SubmitEvent, shadowRoot: ShadowRoot) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const formData = new FormData(form);
    const formValues = Object.fromEntries(
      formData.entries()
    ) as unknown as DraftType;

    this.dispatchEvent(
      new CustomEvent(this.eventName, {
        detail: formValues,
        bubbles: true,
        composed: true,
      })
    );
    shadowRoot.querySelector("form")?.reset();
  }

  css() {
    return html` <style>
      .flex {
        display: flex;
        flex-direction: column;

      }
      form {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 100%;
        width: 300px;
      }

      input {
        padding: 0.5rem;
        font-size: 1.1rem;
        border: 1px solid #ccc;
        border-radius: .5rem;
      }

      label {
        font-weight: bold;
        font-size: 1rem;
      }

      input[type="submit"] {
        padding: 0.5rem;
        font-size: 1.1rem;
        border: 1px solid #ccc;
        border-radius: .5rem;
        background-color: #007bff;
        color: white;
        cursor
      }

      .input.error {
        border: 2px solid red;
      }

      input::touched {

      }

      input[type="submit"]:hover {
        background-color: #0056b3;
      }
    </style>`;
  }
}
