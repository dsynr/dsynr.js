function addDiv(id: string = '', cls: string = '', root: HTMLElement | boolean = false): HTMLElement {
    let div: HTMLElement = document.createElement('DIV');
    div.id = id;
    div.className = cls;
    if (root) {
        // @ts-ignore
        root.appendChild(div);
    }
    return div;
}

function addText(txt: string = '', root: HTMLElement): void {
    root.appendChild(document.createTextNode(txt));
}

function getElementsBySelector(selector: string): any {
    return document.querySelectorAll(selector);
}

function getElementsByTag(tagName: string) {
    return document.querySelectorAll(tagName);
}

function getElementsByClass(className: string): HTMLCollection {
    return document.getElementsByClassName(className);
}

function getElementById(elementID: string): HTMLElement {
    return window[elementID];
}