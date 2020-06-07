/**
 * Log to the console
 * @param any data
 */
function l(data: any): void {
    console.log(data);
}

/**
 * Log active function name
 * @param string functionName
 */
function lfn(functionName: string): void {
    l(' {} ' + functionName);
}

/**
 * Log click
 * @param e
 */
function lclk(element: string) {
    l('* click ' + element);
}