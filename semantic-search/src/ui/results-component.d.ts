export declare class SearchResultList extends HTMLElement {
    private _results;
    constructor();
    connectedCallback(): void;
    render(): void;
    set results(value: {
        text: string;
        score: number;
    }[]);
}
