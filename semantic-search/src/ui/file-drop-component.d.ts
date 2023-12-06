export declare class FileDropComponent extends HTMLElement {
    private _onFilesDropped;
    constructor();
    connectedCallback(): void;
    initializeDropArea(): void;
    hide(): void;
    set onFilesDropped(handler: (items: DroppedItems) => void);
}
export type DroppedItem = {
    name: string;
    path: string;
    file?: File;
    isDirectory: boolean;
    children?: DroppedItems;
};
export type DroppedItems = DroppedItem[];
