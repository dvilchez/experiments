export declare class Main extends HTMLElement {
    _onFilesDropped: (files: File[]) => Promise<void>;
    _onSearch: (query: string) => Promise<{
        text: string;
        path: string;
        score: number;
    }[]>;
    constructor();
    connectedCallback(): void;
    set onClear(callback: () => void);
    set onFilesDropped(callback: (files: File[]) => Promise<void>);
    set onSearch(callback: (query: string) => Promise<{
        text: string;
        path: string;
        score: number;
    }[]>);
    set numberOfFilesnDB(numberOfFilesnDB: number);
    private showSpinner;
    private hideSpinner;
}
