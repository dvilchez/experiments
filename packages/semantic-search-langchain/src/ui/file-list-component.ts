export class ListOfFiles extends HTMLElement {
  private _files: Tree = [];
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

    const tree = createFileTreeElement(this._files);
    this.shadowRoot.appendChild(tree);
  }

  set files(filesNames: Tree) {
    this._files = filesNames;
    this.render();
  }
}

export type TreeNode = {
  name: string;
  children?: Tree;
};

export type Tree = TreeNode[];

function createFileTreeElement(files: Tree) {
  const ul = document.createElement("ul");
  for (const file of files) {
    const li = document.createElement("li");
    li.textContent = file.children ? `📁 ${file.name}` : `📄 ${file.name}`;

    if (file.children) {
      // It's a directory, recurse
      const childTree = createFileTreeElement(file.children);
      li.appendChild(childTree);
    }

    ul.appendChild(li);
  }
  return ul;
}
