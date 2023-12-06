import {
  DroppedItem,
  DroppedItems,
  FileDropComponent
} from "./file-drop-component";
import { ListOfFiles } from "./file-list-component";
import { SearchResultList } from "./results-component";
import { SearchBox } from "./search-box-component";
import { SpinnerElement } from "./spinner-component";

export class Main extends HTMLElement {
  _onFilesDropped: (files: File[]) => Promise<void>;
  _onSearch: (
    query: string
  ) => Promise<{ text: string; path: string; score: number }[]>;
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
    <div class="container">
        <!-- Search Component -->
        <search-box>
        </search-box>
        <div style="height: 20px;" class="files-message">
          The database contains <span id="total-files">0</span> files
        </div>

        <!-- Document Lists and Drop Area -->
        <div class="content-area">
              <div class="drop-area">
                <search-result-list>
                </search-result-list>
                <file-drop class="drop-box">
                    Drag and drop files/folders here
                </file-drop>
              </div>
        </div>
    </div>`;

    setTimeout(() => {
      const fileDropComponent: FileDropComponent =
        this.shadowRoot.querySelector("file-drop");
      const resultsList: SearchResultList =
        this.shadowRoot.querySelector("search-result-list");
      const searchBox: SearchBox = this.shadowRoot.querySelector("search-box");
      const totalFiles: HTMLSpanElement =
        this.shadowRoot.querySelector("#total-files");

      resultsList.hide();
      fileDropComponent.onFilesDropped = async (files: DroppedItems) => {
        this.showSpinner();

        const filesCollection = files.reduce(flatFiles, []);
        fileDropComponent.hide();
        resultsList.show();
        totalFiles.textContent = filesCollection.length.toString();

        await this._onFilesDropped(filesCollection);

        this.hideSpinner();
      };

      searchBox.onSearch = async (query: string) => {
        const results = await this._onSearch(query);
        resultsList.results = results;
      };
    }, 0);
  }

  showSpinner() {
    const spinner = document.createElement("custom-spinner");
    spinner.id = "spinner";
    this.shadowRoot.appendChild(spinner);
  }

  hideSpinner() {
    const spinner = this.shadowRoot.querySelector("#spinner");
    if (spinner) {
      this.shadowRoot.removeChild(spinner);
    }
  }

  set onFilesDropped(callback: (files: File[]) => Promise<void>) {
    this._onFilesDropped = callback;
  }

  set onSearch(
    callback: (
      query: string
    ) => Promise<{ text: string; path: string; score: number }[]>
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

window.customElements.define("file-drop", FileDropComponent);
window.customElements.define("file-list", ListOfFiles);
window.customElements.define("search-result-list", SearchResultList);
window.customElements.define("search-box", SearchBox);
window.customElements.define("custom-spinner", SpinnerElement);
