export declare class ListOfFiles extends HTMLElement {
    private _files;
    constructor();
    connectedCallback(): void;
    render(): void;
    set files(filesNames: Tree);
}
export type TreeNode = {
    name: string;
    children?: Tree;
};
export type Tree = TreeNode[];
