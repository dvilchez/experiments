import { DroppedItems, FileDropComponent } from "./file-drop-component";
import { ListOfFiles } from "./file-list-component";
import { SearchResultList } from "./results-component";
import { SearchBox } from "./search-box-component";

export class Main extends HTMLElement {
  _onFilesDropped: (files: File[]) => Promise<void>;
  _onSearch: (query: string) => Promise<{ text: string; score: number }[]>;
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
          background-color: #eee;
          text-align: center;
          padding: 20px;
          border: 2px dashed #ccc;
          flex: 1;
          display: flex;
          flex-direction: column;
      }

      .drop-box {
          flex: 1;
      }

      .file-list {
          flex: 2;
          align-self: flex-start;
      }
    </style>
    <div class="container">
        <!-- Search Component -->
        <search-box>
        </search-box>

        <!-- Document Lists and Drop Area -->
        <div class="content-area">
              <search-result-list>
              </search-result-list>
              <div class="drop-area">
                <file-drop class="drop-box">
                    Drag and drop files/folders here
                </file-drop>
                <file-list class="file-list">

                </file-list>
              </div>
        </div>
    </div>`;

    setTimeout(() => {
      const fileDropComponent: FileDropComponent =
        this.shadowRoot.querySelector("file-drop");
      const fileList: ListOfFiles = this.shadowRoot.querySelector("file-list");
      const resultsList: SearchResultList =
        this.shadowRoot.querySelector("search-result-list");
      const searchBox: SearchBox = this.shadowRoot.querySelector("search-box");

      fileDropComponent.onFilesDropped = async (files: DroppedItems) => {
        console.log("Files dropped", files, flatFiles(files));
        await this._onFilesDropped(flatFiles(files));
        fileList.files = flatFiles(files).map((file) => file.name);
      };

      searchBox.onSearch = async (query: string) => {
        const results = await this._onSearch(query);
        resultsList.results = results;
      };
    }, 0);
  }

  set onFilesDropped(callback: (files: File[]) => Promise<void>) {
    this._onFilesDropped = callback;
  }

  set onSearch(
    callback: (query: string) => Promise<{ text: string; score: number }[]>
  ) {
    this._onSearch = callback;
  }
}

function flatFiles(items: DroppedItems): File[] {
  const result: File[] = [];
  if (!items) return result;

  for (const item of items) {
    if (item.isDirectory) {
      result.push(...flatFiles(item.children));
    } else {
      result.push(item.file);
    }
  }
  return result;
}

window.customElements.define("file-drop", FileDropComponent);
window.customElements.define("file-list", ListOfFiles);
window.customElements.define("search-result-list", SearchResultList);
window.customElements.define("search-box", SearchBox);
