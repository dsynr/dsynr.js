function addDiv(id = '', classes = '', parent = document.body) {
    let div = document.createElement('DIV');
    div.id = id;
    div.className = classes;
    parent.appendChild(div);
    return div;
}
function addText(txt = '', root) {
    root.appendChild(document.createTextNode(txt));
}
function getElementsBySelector(selector) {
    return document.querySelectorAll(selector);
}
function getElementsByTag(tagName) {
    return document.querySelectorAll(tagName);
}
function getElementsByClass(className) {
    return document.getElementsByClassName(className);
}
function getElementById(elementID) {
    return window[elementID];
}
function addJS(src, id = '') {
    let js = document.createElement('script');
    js.setAttribute('src', src);
    js.id = id;
    document.head.appendChild(js);
}
//# sourceMappingURL=dom.js.map