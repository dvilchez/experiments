export declare class FileDropComponent extends HTMLElement {
    private _onFilesDropped;
    constructor();
    connectedCallback(): void;
    initializeDropArea(): void;
    set onFilesDropped(handler: (files: FileList) => void);
    handleFiles(files: FileList): void;
}
