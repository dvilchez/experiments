export class FileDropComponent extends HTMLElement {
  private _onFilesDropped: (items: DroppedItems) => void;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
            <style>
                .drop-component {
                    border: 2px dashed #ccc;
                    padding: 20px;
                    text-align: center;
                    background-color: #eee;
                }
            </style>
            <div class="drop-component">
                Drag and drop files/folders here
            </div>
        `;

    this.initializeDropArea();
  }

  initializeDropArea() {
    const dropArea = this.shadowRoot.querySelector(".drop-component");

    dropArea.addEventListener(
      "dragover",
      (event) => {
        event.preventDefault();
      },
      false
    );

    dropArea.addEventListener(
      "drop",
      async (event: DragEvent) => {
        event.preventDefault();
        if (this._onFilesDropped) {
          const items = event.dataTransfer.items;
          const entries: FileSystemEntry[] = [];
          for (const item of items) {
            if (item.kind !== "file") continue;

            const entry = item.webkitGetAsEntry();
            if (entry) entries.push(entry);
          }

          this._onFilesDropped(await Promise.all(entries.map(toDroppedItem)));
        }
      },
      false
    );
  }

  set onFilesDropped(handler: (items: DroppedItems) => void) {
    this._onFilesDropped = handler;
  }
}

export type DroppedItem = {
  name: string;
  path: string;
  file?: File;
  isDirectory: boolean;
  children?: DroppedItems;
};

export type DroppedItems = DroppedItem[];

async function toDroppedItem(entry: FileSystemEntry): Promise<DroppedItem> {
  const children: DroppedItem[] = await getChilden(entry);
  const file = await getFile(entry);

  return {
    name: entry.name,
    path: entry.fullPath,
    file,
    children,
    isDirectory: entry.isDirectory
  };
}

async function getChilden(
  entry: FileSystemEntry
): Promise<DroppedItems | undefined> {
  let children: DroppedItems;

  if (entry.isDirectory) {
    children = [];
    const reader = (entry as FileSystemDirectoryEntry).createReader();
    const entries: FileSystemEntry[] = await new Promise((resolve) =>
      reader.readEntries(resolve)
    );
    for (let i = 0; i < entries.length; i++) {
      const droppedItem = await toDroppedItem(entries[i]);
      if (droppedItem) {
        children.push(droppedItem);
      }
    }
  }

  return children;
}

async function getFile(entry: FileSystemEntry): Promise<File | undefined> {
  let file: File;
  if (entry.isFile) {
    file = await new Promise((resolve) => {
      (entry as FileSystemFileEntry).file(resolve);
    });
  }

  return file;
}
