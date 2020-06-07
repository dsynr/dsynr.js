/**
 * Log to the console
 * @param any data
 */
function l(data) {
    console.log(data);
}
/**
 * Log active function name
 * @param string functionName
 */
function lfn(functionName) {
    l(' {} ' + functionName);
}
/**
 * Log click
 * @param e
 */
function lclk(element) {
    l('* click ' + element);
}
//# sourceMappingURL=debug.js.map