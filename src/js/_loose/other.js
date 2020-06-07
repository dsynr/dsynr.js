/**
 * Get data attribute value of a DOM element
 * @param element e DOM element
 * @param string attrName Name of the data-attribute
 */
function getData(e, attrName) {
    return e.getAttribute('data-' + attrName);
}
/**
 * Set data attribute for a DOM element
 * @param element e DOM element
 * @param string attrName Name of the data-attribute
 * @param string attrVal Value to be set for the attribute, default ''
 */
function setData(e, attrName, attrVal = '') {
    e.setAttribute('data-' + attrName, attrVal);
}
// debounce so filtering doesn't happen every millisecond
function debounce(fn, threshold) {
    let timeout;
    threshold = threshold || 100;
    return function debounced() {
        clearTimeout(timeout);
        let args = arguments;
        let _this = this;
        function delayed() {
            fn.apply(_this, args);
        }
        timeout = setTimeout(delayed, threshold);
    };
}
//# sourceMappingURL=other.js.map