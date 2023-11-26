export class ListOfFiles extends HTMLElement {
  private _files: string[] = [];
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
        ul { list-style-type: none; padding: 0; }
        li { margin: 5px 0; }
      </style>
      <ul>
        ${this._files.map((file: string) => `<li>${file}</li>`).join("")}
      </ul>
    `;
  }

  set files(filesNames: string[]) {
    this._files = filesNames;
    this.render();
  }
}
