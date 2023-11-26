export declare class ListOfFiles extends HTMLElement {
    private _files;
    constructor();
    connectedCallback(): void;
    render(): void;
    set files(filesNames: string[]);
}
