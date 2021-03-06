///<reference path="components/DsynrModal.ts"/>
///<reference path="components/DsynrSelect.ts"/>
class Dsynr {
    conf: object = {};
    vw: number;
    vh: number;
    transitionEvent = this.whichAnimationEvent();
    domain: string = document.baseURI;
    requestDataset = {};
    totalRequestDatasets = 0;
    documentScripts: Array<string> = [];
    private curReq: XMLHttpRequest;
    private readonly reqDataReady: Event;

    constructor() {
        this.updateViewportVars();
        this.reqDataReady = new Event('reqDataReady');
    }

    docReady(fn: Function): void {
        if (document.readyState == 'complete') {
            fn();
        }
    }

    /**
     * @todo
     */
    gtag(type: any, name: any, other: any) {
    }

    /**
     * @todo
     */
    PING(type: any, name: any) {
    }

    /**
     * Get data attribute value of a DOM element
     * @param e
     * @param attrName
     */
    getData(e: Element, attrName: string): any {
        return e.getAttribute('data-' + attrName);
    }

    /**
     * Set data attribute for a DOM element
     * @param e
     * @param attrName
     * @param attrVal
     */
    setData(e: Element, attrName: string, attrVal: string = '') {
        e.setAttribute('data-' + attrName, attrVal);
    }

// debounce so filtering doesn't happen every millisecond
    debounce(fn, threshold) {
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
        }
            ;
    }

    concatStr(strings: Array<any>, separator: string = ' '): string {
        return strings.join(separator);
    }

    getPercentage(x, percent): number {
        return (x * percent) / 100;
    }

    getRandFloor(min: number = 0, max: number = 255): number {
        return this.getRandDecimal(min, max, 0);
    }

    getRandNum(min: number = 0, max: number = 255): number {
        return Math.round(this.getRandDecimal(min, max, 0));
    }

    getRandDecimal(min: number = 0, max: number = 1, precision: number = 2): number {
        return parseFloat((Math.random() * (max - min) + min).toFixed(precision));
    }

    getRandomArbitrary(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    makeArray(collection: any): Array<any> {
        return Array.from(collection);
    }

    get_rand_array_item(mixed_arr: any): any {
        return mixed_arr[Math.floor(Math.random() * mixed_arr.length)];
    }

    get_rand_obj_item(obj: object) {
        let keys: Array<any> = Object.keys(obj);
        return obj[keys[keys.length * Math.random() << 0]];
    }

    addProp(obj: object, propName: string, propVal: any = undefined, overwrite: boolean = false): any {
        if (overwrite || !obj.hasOwnProperty(propName)) {
            Object.defineProperty(obj, propName, {
                configurable: true,
                enumerable: true,
                writable: true,
                value: propVal
            });
        }
        return obj[propName];
    }

    updateProps(obj: object, propSet: object): void {
        this.lfn('updateProps...');
        for (let prop in propSet) {
            if (propSet.hasOwnProperty(prop)) {
                obj[prop] = propSet[prop];
            }
            this.l(prop + ':' + obj[prop]);
        }
    }

    mergeObjs(main: object, sub: object): object {
        for (let prop in sub) {
            main[prop] = sub[prop];
        }
        return main;
    }

    hasInstance(objList: Array<object>, obj: object): boolean {
        this.lfn('hasInstance');
        this.l(objList);
        let hasIt: boolean = false;
        objList.forEach((o, i) => {
                if (o === obj) {
                    hasIt = true;
                    return;
                }
            }
        );
        this.l(hasIt);
        return hasIt;
    }

    getRandColour(): string {
        return '#' + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6);
    }

    getRandColourRGBA(maxO: number = 1, maxR: number = 255, maxG: number = 255, maxB: number = 255): string {
        return 'rgba(' + this.getRandFloor(0, maxR) + ',' + this.getRandFloor(0, maxG) + ',' + this.getRandFloor(0, maxB) + ',' + this.getRandDecimal(0, maxO) + ')';
    }

    /**
     *
     * @param val
     * @param unit
     */
    getCssDimension(val: number, unit: string = 'px'): string {
        return val + unit;
    }

    randRadius(): number {
        return this.getRandomArbitrary(5, 150);
    }

    randWidth(): number {
        return this.getRandomArbitrary(2, 15);
    }

    /**
     *
     * @param e
     */
    getDimensions(e: HTMLElement): any {
        return {w: e.clientWidth, h: e.clientHeight};
    }

    /**
     *
     * @param e
     */
    hide(e: HTMLElement): void {
        e.style.display = 'none';
    }

    /**
     *
     * @param e
     * @param classes
     */
    addClass(e: HTMLElement, classes: string): void {
        e.classList.add(...classes.split(' '));
    }

    /**
     *
     * @param e
     * @param classes
     */
    removeClass(e: HTMLElement, classes: string): void {
        e.classList.remove(...classes.split(' '));
    }

    /**
     *
     * @param e
     * @param classes
     */
    hasClass(e: HTMLElement, classes: string): boolean {
        return e.classList.contains(classes);
    }

    addDiv(id: string = '', classes: string = '', parent: HTMLElement = document.body): HTMLElement {
        let div: HTMLElement = document.createElement('DIV');
        div.id = id;
        div.className = classes;
        parent.appendChild(div);
        return div;
    }

    addText(txt: string = '', root: HTMLElement): void {
        root.appendChild(document.createTextNode(txt));
    }

    getElementsBySelector(selector: string): any {
        return document.querySelectorAll(selector);
    }

    getElementsByTag(tagName: string) {
        return document.querySelectorAll(tagName);
    }

    getElementsByClass(className: string): HTMLCollection {
        return document.getElementsByClassName(className);
    }

    getElementById(elementID: string): HTMLElement {
        return window[elementID];
    }

    addJS(src: string, id: string = ''): void {
        let js = document.createElement('script');
        js.setAttribute('src', src);
        js.id = id;
        document.head.appendChild(js);
    }

    animateIn(): void {
        this.makeArray(this.getElementsByClass('animated')).forEach((e) => {
            if (this.getData(e, 'ani') !== null && this.getData(e, 'ani') != null && this.isInViewportSlightly(e)) {
                e.classList.remove('o0');
                e.classList.add(e.dataset.ani);
            }
        });
    }

    whichAnimationEvent() {
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
    }

    addListener(eID, event, fn): void {
        if (this.getElementById(eID) !== undefined) {
            this.getElementById(eID).addEventListener(event, fn);
        }
    }

    removeListener(eID, event, fn) {
        this.getElementById(eID).removeEventListener(event, fn);
    }

    addEvent(e: HTMLCollection, listener: string, fn: VoidFunction): void {
        this.makeArray(e).forEach((el) => {
            el.addEventListener(listener, fn);
            this.l(el);
        });
    }

    centereStage(e: HTMLElement): void {
        let dimensions = this.getDimensions(e);
        e.style.marginTop = this.getCssDimension(-(dimensions.h) / 2);
        e.style.marginLeft = this.getCssDimension(-(dimensions.w) / 2);
        e.style.top = '50%';
        e.style.left = '50%';
    }

    updateViewportVars(): void {
        this.vw = window.innerWidth;
        this.vh = window.innerHeight;
    }

    getBounds(e: HTMLElement): ClientRect {
        return e.getBoundingClientRect();
    }

    isInViewportSlightly(e: HTMLElement): boolean {
        let bounding = this.getBounds(e);
        return (
            bounding.top >= 0 //&&
            // bounding.left >= 0 &&
            // bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            // bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    isInViewportMostly(e): boolean {
        let bounding = this.getBounds(e);
        return (bounding.top / 2 > -bounding.top);
        // return (getPercentage((e.clientHeight + bounding.top), 50) > -bounding.top);
    }

    serialize(obj: object): string {
        return Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
    }

    ajax(url: string, saveAs: string | boolean = false, data: any = false, add2dom: boolean = true, method: string = 'GET') {
        this.lfn('ajax ' + url);
        this.curReq = new XMLHttpRequest();
        if (this.curReq) {
            this.curReq.open(method, url, true);
            this.setHeaders(method == 'POST');
            this.curReq.send(this.serialize(data));
            let ths = this;
            this.curReq.addEventListener('readystatechange', function () {
                return ths.stateChanged(ths, saveAs, add2dom);
            });
        } else {
            this.failed();
        }
    }

    private setHeaders(isPost: boolean = false) {
        if (isPost) {
            this.curReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
        this.curReq.setRequestHeader('Cache-Control', 'no-cache');
        this.curReq.setRequestHeader('Powered-by', 'Dsynr.com');
    }

    private stateChanged(ths: Dsynr, saveAs: string | boolean, add2dom: boolean) {
        this.lfn('stateChanged');
        let req = ths.curReq;
        if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status === 200) {
                return ths.succeeded(saveAs, add2dom);
            } else {
                this.l('Not ready yet :: ' + req.status + ' / ' + req.readyState);
            }
        } else {
            this.l(req);
        }
    }

    private failed(): boolean {
        this.l('Cannot create an XMLHTTP instance');
        return false;
    }

    private succeeded(saveAs: string | boolean, add2dom: boolean) {
        this.lfn('succeeded');
        this.totalRequestDatasets++;
        if (typeof saveAs === 'string') {
            this.l('Saving to dataset; Reference key: ' + saveAs);
            // this.requestDataset[saveAs] = this.htmlToElements(this.curReq.response);
            this.requestDataset[saveAs] = this.curReq.response;
        }
        add2dom ? this.addFetchedData(this.curReq.response) : false;
        return this.curReq.response;
    }

    addFetchedData(requestResponse: string, parent: HTMLElement = document.body): void {
        let fdp = this.addDiv('dsynrFetchedData-' + this.totalRequestDatasets, 'd-none', parent);
        let ths = this;
        this.addListener(fdp.id, 'reqDataReady', function () {
            ths.showFetchedData(fdp);
        });
        fdp.innerHTML = requestResponse;
        DsynrSelect.auto();
        let fetchedScriptTags = fdp.getElementsByTagName('script');
        for (let i = 0; i < fetchedScriptTags.length; ++i) {
            let scriptSRC = fetchedScriptTags[i].getAttribute('src');
            // @ts-ignore
            if (scriptSRC !== null && !this.documentScripts.includes(scriptSRC)) {
                this.addJS(scriptSRC);
            }
        }
        fdp.dispatchEvent(this.reqDataReady);
    }

    private showFetchedData(fdp: HTMLElement): void {
        this.lfn('showFetchedData');
        this.removeClass(fdp, 'd-none');
        new DsynrModal(fdp);
    }

    getPageScripts(dsynrUtil: Dsynr): void {
        function _(parentNode: HTMLElement): void {
            for (let node of parentNode.children) {
                if (node.hasAttribute('src') && node.getAttribute('src') != null) {
                    dsynrUtil.documentScripts.push(<string>node.getAttribute('src'));

                }
            }
        }

        _(document.head);
        _(document.body);
    }

    IsJson(str: string) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    /**
     * Log to the console
     * @param data
     * @param isFormData
     */
    l(data: any, isFormData: boolean = false): void {
        if (isFormData) {
            this.l('Logging FormData:');
            for (let key of data.entries()) {
                this.l(key[0] + ' : ' + key[1]);
            }
        } else {
            console.log(data);
        }
    }

    /**
     * Log active function name
     * @param functionName
     */
    lfn(functionName: string): void {
        this.l(' {} ' + functionName);
    }

    /**
     * Log click
     * @param element
     */
    lclk(element: string) {
        this.l('* click ' + element);
    }
}

let d = new Dsynr();