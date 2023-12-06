export declare class SearchResultList extends HTMLElement {
    private _results;
    constructor();
    connectedCallback(): void;
    render(): void;
    hide(): void;
    show(): void;
    set results(value: {
        text: string;
        path: string;
        score: number;
    }[]);
}
