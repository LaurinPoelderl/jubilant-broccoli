import { html, render } from "lit-html";

class TableComponent extends HTMLElement {
  static observedAttributes = []

  constructor(){
    super()
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback(name, oldValue, newValue){
    console.log("")
  }

  render(){
    return html`
      <table>
        <thead>
          <tr>
            <th>
              ID
            </th>
            <th>
              NAME
            </th>
          </tr>
        </thead>
      </table>
    `
  }
}

customElements.define("table-component", TableComponent)