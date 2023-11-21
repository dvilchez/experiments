export class FileDropComponent extends HTMLElement {
  private _onFilesDropped: (files: FileList) => void;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
            <style>
                .drop-area {
                    border: 2px dashed #ccc;
                    padding: 20px;
                    text-align: center;
                    background-color: #eee;
                }
            </style>
            <div class="drop-area">
                Drag and drop files/folders here
            </div>
        `;

    this.initializeDropArea();
  }

  initializeDropArea() {
    const dropArea = this.shadowRoot.querySelector(".drop-area");

    dropArea.addEventListener("dragover", (event) => {
      event.stopPropagation();
      event.preventDefault();
      // Add style or indication for drag over
    });

    dropArea.addEventListener("drop", (event: DragEvent) => {
      event.stopPropagation();
      event.preventDefault();
      const files = event.dataTransfer.files;
      this.handleFiles(files);
    });
  }

  set onFilesDropped(handler: (files: FileList) => void) {
    this._onFilesDropped = handler;
  }

  handleFiles(files: FileList) {
    if (this._onFilesDropped) {
      this._onFilesDropped(files);
    } else {
      // Default handling or do nothing
      console.log(files);
    }
  }
}
