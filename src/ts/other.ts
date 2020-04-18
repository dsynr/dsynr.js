function getData(e: Element, attrName: string): string | null {
    return e.getAttribute('data-' + attrName);
}

function setData(e: Element, attrName: string, attrVal: string = '') {
    e.setAttribute('data-' + attrName, attrVal);
}

function l(data: any): void {
    console.log(data);
}

/**
 * Log active function name
 * @param fnName
 */
function lfn(fnName: string): void {
    l(' {} ' + fnName);
}

// debounce so filtering doesn't happen every millisecond
function debounce(fn, threshold) {
    let timeout: any;
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