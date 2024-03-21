import "./file-drop-component";
import "./file-list-component";
import "./file-component";
//import { createVectorsFromFiles } from "../behaviors/create-vectors-from-docs";
import { DroppedItem, DroppedItems } from "./file-drop-component";

export class Main extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
    <style>
      :host {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
      }

      .container {
          width: 100%;
          height: 100vh;
      }

      .content-area {
          display: flex;
          height: calc(100% - 60px);
      }

      .drop-area {
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
      }

      .files-message {
        text-align: center;
        font-size: 14px;
        color: #666;

      }
    </style>
    <H1>Semantic Search</H1>
    <div class="container">
        <!-- Search Component -->
        <search-box>
        </search-box>
        <div style="height: 20px;" class="files-message">
          The database contains <span id="total-files">0</span> files <a href="#" id="clear">(clear)</a>
        </div>

        <!-- Document Lists and Drop Area -->
        <div class="content-area">
              <div class="drop-area">
                <search-result-list>
                </search-result-list>
                <file-drop class="drop-box">
                </file-drop>
                <file-list class="file-list">
                </file-list>
              </div>
        </div>
    </div>`;

    this.shadowRoot
      .querySelector(".drop-box")
      ?.addEventListener("filesDropped", async (e: CustomEvent) => {
        const files = e.detail as DroppedItems;
        const filesCollection = files.reduce(flatFiles, []);

        const fileList = this.shadowRoot.querySelector(".file-list");
        filesCollection.forEach((file) => {
          const fileComponent = document.createElement("file-item");
          fileComponent.setAttribute("fileName", file.name);
          fileList?.appendChild(fileComponent);
        });
        //vectors = await createVectorsFromFiles(filesCollection);
      });
  }
}

window.customElements.define("semantic-search-langchain", Main);

function flatFiles(acc: File[], item: DroppedItem): File[] {
  if (item.isDirectory) {
    if (!item.children) return acc;
    return [...acc, ...item.children.reduce(flatFiles, acc)];
  }
  return [...acc, item.file];
}
