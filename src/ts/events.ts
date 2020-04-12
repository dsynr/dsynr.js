function addListener(eID, event, fn) {
    if (getElementById(eID) !== undefined) {
        getElementById(eID).addEventListener(event, fn);
    }
}

function removeListener(eID, event, fn) {
    getElementById(eID).removeEventListener(event, fn);
}

function addEvent(e: HTMLCollection, listener: string, fn: VoidFunction): void {
    makeArray(e).forEach((el) => {
        el.addEventListener(listener, fn);
        l(el);
    });
}