export declare class SearchBox extends HTMLElement {
    private _onSearch;
    constructor();
    render(): void;
    handleSearch(query: string): void;
    set onSearch(callback: (query: string) => Promise<void>);
}
