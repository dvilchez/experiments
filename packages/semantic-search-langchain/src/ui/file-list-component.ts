export class ListOfFiles extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  // Called when the element is connected to the document
  connectedCallback() {
    this.render();
  }

  // Render the list
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        ul {
          list-style-type: none;
          padding-left: 20px;
        }
      </style>
      <slot></slot>
    `;
  }
}

window.customElements.define("file-list", ListOfFiles);