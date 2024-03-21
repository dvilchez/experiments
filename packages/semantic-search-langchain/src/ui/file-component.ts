export class File extends HTMLElement {
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
    const fileName = this.getAttribute("fileName");
    this.shadowRoot.innerHTML = `
    	<li>${fileName}</li>
    `;
  }
}

window.customElements.define("file-item", File);
