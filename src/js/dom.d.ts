declare function addDiv(id?: string, cls?: string, root?: HTMLElement): HTMLElement;
declare function addText(txt: string | undefined, root: HTMLElement): void;
declare function getElementsBySelector(selector: string): any;
declare function getElementsByTag(tagName: string): NodeListOf<Element>;
declare function getElementsByClass(className: string): HTMLCollection;
declare function getElementById(elementID: string): HTMLElement;
