export declare class Main extends HTMLElement {
    _onFilesDropped: (files: File[]) => Promise<void>;
    _onSearch: (query: string) => Promise<{
        text: string;
        score: number;
    }[]>;
    constructor();
    connectedCallback(): void;
    showSpinner(): void;
    hideSpinner(): void;
    set onFilesDropped(callback: (files: File[]) => Promise<void>);
    set onSearch(callback: (query: string) => Promise<{
        text: string;
        score: number;
    }[]>);
}