function addDiv(id = '', cls = '', root = false) {
    let div = document.createElement('DIV');
    div.id = id;
    div.className = cls;
    if (root) {
        root.appendChild(div);
    }
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