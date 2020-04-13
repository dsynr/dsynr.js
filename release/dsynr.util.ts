/**
 * @todo
 */
function gtag(type: any, name: any, other: any) {
}

/**
 * @todo
 */
function PING(type: any, name: any) {
}
function getData(e: Element, attrName: string): string | null {
    return e.getAttribute('data-' + attrName);
}

function setData(e: Element, attrName: string, attrVal: string = '') {
    e.setAttribute('data-' + attrName, attrVal);
}

function l(data: any): void {
    console.log(data);
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
function getPercentage(x, percent): number {
    return (x * percent) / 100;
}

function getRandFloor(min: number = 0, max: number = 255): number {
    return getRandDecimal(min, max, 0);
}

function getRandNum(min: number = 0, max: number = 255): number {
    return Math.round(getRandDecimal(min, max, 0));
}

function getRandDecimal(min: number = 0, max: number = 1, precision: number = 2): number {
    return parseFloat((Math.random() * (max - min) + min).toFixed(precision));
}

function getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}
function makeArray(collection: any): Array<any> {
    return Array.from(collection);
}

function get_rand_array_item(mixed_arr: any): any {
    return mixed_arr[Math.floor(Math.random() * mixed_arr.length)];
}

function get_rand_obj_item(obj: Object) {
    let keys: Array<any> = Object.keys(obj);
    return obj[keys[keys.length * Math.random() << 0]];
}

function getRandColour(): string {
    return '#' + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6);
}

function getRandColourRGBA(maxO: number = 1, maxR: number = 255, maxG: number = 255, maxB: number = 255): string {
    return 'rgba(' + getRandFloor(0, maxR) + ',' + getRandFloor(0, maxG) + ',' + getRandFloor(0, maxB) + ',' + getRandDecimal(0, maxO) + ')';
}
function cssDimension(val: number, unit: string = 'px'): string {
    return val + unit;
}

function randRadius(): number {
    return getRandomArbitrary(5, 150);
}

function randWidth(): number {
    return getRandomArbitrary(2, 15);
}

function getDimensions(e: HTMLElement): any {
    return {w: e.clientWidth, h: e.clientHeight};
}

function hide(e: HTMLElement): void {
    e.style.display = 'none';
}
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
let transitionEvent = whichAnimationEvent();

function animateIn(): void {
    makeArray(getElementsByClass('animated')).forEach((e) => {
        if (getData(e, 'ani') !== null && getData(e, 'ani') != null && isInViewportSlightly(e)) {
            e.classList.remove('o0');
            e.classList.add(e.dataset.ani);
        }
    });
}

function whichAnimationEvent() {
    let t,
        el = document.createElement("fakeelement");

    let animations = {
        "animation": "animationend",
        "OAnimation": "oAnimationEnd",
        "MozAnimation": "animationend",
        "WebkitAnimation": "webkitAnimationEnd"
    };

    for (t in animations) {
        if (el.style[t] !== undefined) {
            return animations[t];
        }
    }
}//
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
function centereStage(e: HTMLElement): void {
    let dimensions = getDimensions(e);
    e.style.marginTop = -(dimensions.h) / 2 + 'px';
    e.style.marginLeft = -(dimensions.w) / 2 + 'px';
}

function getBounds(e: HTMLElement): ClientRect {
    return e.getBoundingClientRect();
}

function isInViewportSlightly(e: HTMLElement): boolean {
    let bounding = getBounds(e);
    return (
        bounding.top >= 0 //&&
        // bounding.left >= 0 &&
        // bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        // bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function isInViewportMostly(e): boolean {
    let bounding = getBounds(e);
    return (bounding.top / 2 > -bounding.top);
    // return (getPercentage((e.clientHeight + bounding.top), 50) > -bounding.top);
}
function showBlanket() {
    let blanket: HTMLElement = addDiv('blanket', 'z2 position-fixed top left vw vh o0 animated fadeIn', document.body);
    addDiv('blanketcoat', 'position-absolute top left vw vh bg-gradient-dark o85', blanket);
    blanket.classList.remove('o0');
    blanket.addEventListener(transitionEvent, blanketHidden);
    isBlanketOn = true;
}

function hideBlanket() {
    let blanket: HTMLElement = getElementById('blanket');
    blanket.classList.remove('fadeIn');
    blanket.classList.add('fadeOut');
}

function blanketHidden(event) {
    // Do something when the transition ends
    let blanket: HTMLElement = getElementById('blanket');
    if (event.animationName == 'fadeOut') {
        blanket.removeEventListener(transitionEvent, blanketHidden);
        blanket.remove();
        isBlanketOn = false;
    }
}

function showAsModal(e: HTMLElement): void {
    if (!isBlanketOn) {
        showBlanket();
        curModal = e;
        curModal.classList.remove('zoomOut');
        curModal.classList.add('zoomIn');
        curModal.classList.remove('d-none');
        alignCurModal();
        curModal.focus();
        addModalListeners();
    } else {
        alert('MULTI-MODALS NOT YET ENABLED');
    }
}

function closeCurModal(): void {
    if (isBlanketOn) {
        hideBlanket();
        curModal.classList.remove('zoomIn');
        curModal.classList.add('zoomOut');
    }
}

function alignCurModal() {
    if (isBlanketOn) {
        centereStage(curModal);
    }
}

function addModalListeners() {
    window.addEventListener('resize', alignCurModal);
    addListener('xModal', 'click', closeCurModal);
    curModal.addEventListener(transitionEvent, modalHidden);
}

function modalHidden(event) {
    // Do something when the transition ends
    if (event.animationName == 'zoomOut') {
        curModal.classList.add('d-none');
        curModal.classList.remove('zoomOut');
        curModal.removeEventListener(transitionEvent, modalHidden);
    }
}

let isBlanketOn: boolean = false, curModal: HTMLElement;//
(function () {
    //
})();