import { html, render } from "lit-html";

class TableComponent extends HTMLElement {
  static observedAttributes = ["data-column-names", "data-column-id"]
  columnNames = []

  constructor(){
    super()
    console.log("Hello there")
  }

  connectedCallback() {
    render(this.template(), this)
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: string){
    console.log("attributeChangedCallback", name, oldValue, newValue)
    switch (name ) {
      case "data-column-names":
        this.columnNames = JSON.parse(newValue) //no csv :(( /AHHHHH
        break;
      case "data-column-id":


    }

  }

  template(){
    return html`
      <table>
        <thead>
          <tr>
            <th>
              ID
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