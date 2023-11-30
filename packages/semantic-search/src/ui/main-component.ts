import {
  DroppedItem,
  DroppedItems,
  FileDropComponent
} from "./file-drop-component";
import { ListOfFiles, TreeNode } from "./file-list-component";
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
        this._onFilesDropped(files.reduce(flatFiles, []));
        fileList.files = files.map(toTreeNode);
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

function flatFiles(acc: File[], item: DroppedItem): File[] {
  if (item.isDirectory) {
    if (!item.children) return acc;
    return [...acc, ...item.children.reduce(flatFiles, acc)];
  }
  return [...acc, item.file];
}

function toTreeNode(item: DroppedItem): TreeNode {
  if (item.isDirectory) {
    return { name: item.name, children: item.children.map(toTreeNode) };
  }
  return { name: item.name };
}

window.customElements.define("file-drop", FileDropComponent);
window.customElements.define("file-list", ListOfFiles);
window.customElements.define("search-result-list", SearchResultList);
window.customElements.define("search-box", SearchBox);
