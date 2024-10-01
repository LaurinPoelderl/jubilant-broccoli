import { html, render } from "lit-html";

class TableComponent extends HTMLElement {
  static observedAttributes = ["data-column-names"]
  columnNames = []

  constructor(){
    super()
    console.log("Hello there")
  }

  connectedCallback() {
    render(this.template(), this)
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: string){
    if (name === "data-column-names") {
      this.columnNames =JSON.parse(newValue) //no csv :(( /AHHHHHH

      console.log(this.columnNames)
    }
  }

  template(){
    return html`
      <table>
        <thead>
          <tr>
            <th>
            </th>
            ${this.columnNames.map(columnName => html`
                <th>
                  ${columnName}
                </th>
                `
            )}
          </tr>
        </thead>
      </table>
    `
  }
}

customElements.define("table-component", TableComponent)