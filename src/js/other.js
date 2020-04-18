function getData(e, attrName) {
    return e.getAttribute('data-' + attrName);
}
function setData(e, attrName, attrVal = '') {
    e.setAttribute('data-' + attrName, attrVal);
}
function l(data) {
    console.log(data);
}
function lfn(fnName) {
    l(' {} ' + fnName);
}
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
