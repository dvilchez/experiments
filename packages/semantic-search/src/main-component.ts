import { FileDropComponent } from "./file-drop-component";

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

      .search-area {
          text-align: center;
          padding: 20px;
          background-color: #f8f8f8;
          border-bottom: 1px solid #ddd;
      }

      #searchInput {
          width: 50%;
          padding: 10px 20px;
          margin: 0 10px;
          font-size: 16px;
          border: 1px solid #ddd;
          border-radius: 20px;
          box-shadow: none;
          outline: none;
      }

      #searchInput:focus {
          border-color: #bbb;
          box-shadow: 0 1px 6px 0 rgba(32,33,36,0.28);
      }

      #searchButton {
          padding: 10px 20px;
          font-size: 16px;
          background-color: #f8f8f8;
          border: 1px solid #dcdcdc;
          border-radius: 4px;
          cursor: pointer;
          outline: none;
      }

      #searchButton:hover {
          border-color: #c6c6c6;
          background-color: #f0f0f0;
      }

      .content-area {
          display: flex;
          height: calc(100% - 60px);
      }

      .doc-list {
          background-color: #fff;
          overflow-y: auto;
          height: 100%;
          flex: 2;
      }

      .drop-area {
          background-color: #eee;
          text-align: center;
          padding: 20px;
          border: 2px dashed #ccc;
          flex: 1;
      }
    </style>
    <div class="container">
        <!-- Search Component -->
        <div class="search-area">
            <input type="text" id="searchInput" placeholder="Search...">
            <button id="searchButton">Search</button>
        </div>

        <!-- Document Lists and Drop Area -->
        <div class="content-area">
                <div class="doc-list">
                  Doc list
                </div>

                <file-drop class="drop-area">
                    Drag and drop files/folders here
                </file-drop>
        </div>
    </div>`;

    setTimeout(() => {
      const fileDropComponent: FileDropComponent =
        this.shadowRoot.querySelector("file-drop");
      fileDropComponent.onFilesDropped = (files) => {
        // Handle the files here
        console.log("Files dropped:", files);
      };
    }, 0);
  }
}
