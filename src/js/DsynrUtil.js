///<reference path="components/DsynrSelect.ts"/>
///<reference path="components/DsynrModal.ts"/>
class DsynrUtil {
    constructor() {
        this.transitionEvent = this.whichAnimationEvent();
        this.domain = document.baseURI;
        this.requestDataset = {};
        this.totalRequestDatasets = 0;
        this.documentScripts = [];
        this.updateViewportVars();
        this.reqDataReady = new Event('reqDataReady');
    }
    /**
     * @todo
     */
    gtag(type, name, other) {
    }
    /**
     * @todo
     */
    PING(type, name) {
    }
    /**
     * Get data attribute value of a DOM element
     * @param e
     * @param attrName
     */
    getData(e, attrName) {
        return e.getAttribute('data-' + attrName);
    }
    /**
     * Set data attribute for a DOM element
     * @param e
     * @param attrName
     * @param attrVal
     */
    setData(e, attrName, attrVal = '') {
        e.setAttribute('data-' + attrName, attrVal);
    }
    // debounce so filtering doesn't happen every millisecond
    debounce(fn, threshold) {
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
    concatStr(strings, separator = ' ') {
        return strings.join(separator);
    }
    getPercentage(x, percent) {
        return (x * percent) / 100;
    }
    getRandFloor(min = 0, max = 255) {
        return this.getRandDecimal(min, max, 0);
    }
    getRandNum(min = 0, max = 255) {
        return Math.round(this.getRandDecimal(min, max, 0));
    }
    getRandDecimal(min = 0, max = 1, precision = 2) {
        return parseFloat((Math.random() * (max - min) + min).toFixed(precision));
    }
    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
    makeArray(collection) {
        return Array.from(collection);
    }
    get_rand_array_item(mixed_arr) {
        return mixed_arr[Math.floor(Math.random() * mixed_arr.length)];
    }
    get_rand_obj_item(obj) {
        let keys = Object.keys(obj);
        return obj[keys[keys.length * Math.random() << 0]];
    }
    addProp(obj, propName, propVal = undefined, overwrite = false) {
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
    updateProps(obj, propSet) {
        this.lfn('updateProps...');
        for (let prop in propSet) {
            if (propSet.hasOwnProperty(prop)) {
                obj[prop] = propSet[prop];
            }
            this.l(prop + ':' + obj[prop]);
        }
    }
    mergeObjs(main, sub) {
        for (let prop in sub) {
            main[prop] = sub[prop];
        }
        return main;
    }
    hasInstance(objList, obj) {
        this.lfn('hasInstance');
        this.l(objList);
        let hasIt = false;
        objList.forEach((o, i) => {
            if (o === obj) {
                hasIt = true;
                return;
            }
        });
        this.l(hasIt);
        return hasIt;
    }
    getRandColour() {
        return '#' + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6);
    }
    getRandColourRGBA(maxO = 1, maxR = 255, maxG = 255, maxB = 255) {
        return 'rgba(' + this.getRandFloor(0, maxR) + ',' + this.getRandFloor(0, maxG) + ',' + this.getRandFloor(0, maxB) + ',' + this.getRandDecimal(0, maxO) + ')';
    }
    /**
     *
     * @param val
     * @param unit
     */
    getCssDimension(val, unit = 'px') {
        return val + unit;
    }
    randRadius() {
        return this.getRandomArbitrary(5, 150);
    }
    randWidth() {
        return this.getRandomArbitrary(2, 15);
    }
    /**
     *
     * @param e
     */
    getDimensions(e) {
        return { w: e.clientWidth, h: e.clientHeight };
    }
    /**
     *
     * @param e
     */
    hide(e) {
        e.style.display = 'none';
    }
    /**
     *
     * @param e
     * @param classes
     */
    addClass(e, classes) {
        e.classList.add(...classes.split(' '));
    }
    /**
     *
     * @param e
     * @param classes
     */
    removeClass(e, classes) {
        e.classList.remove(...classes.split(' '));
    }
    /**
     *
     * @param e
     * @param classes
     */
    hasClass(e, classes) {
        return e.classList.contains(classes);
    }
    addDiv(id = '', classes = '', parent = document.body) {
        let div = document.createElement('DIV');
        div.id = id;
        div.className = classes;
        parent.appendChild(div);
        return div;
    }
    addText(txt = '', root) {
        root.appendChild(document.createTextNode(txt));
    }
    getElementsBySelector(selector) {
        return document.querySelectorAll(selector);
    }
    getElementsByTag(tagName) {
        return document.querySelectorAll(tagName);
    }
    getElementsByClass(className) {
        return document.getElementsByClassName(className);
    }
    getElementById(elementID) {
        return window[elementID];
    }
    addJS(src, id = '') {
        let js = document.createElement('script');
        js.setAttribute('src', src);
        js.id = id;
        document.head.appendChild(js);
    }
    animateIn() {
        this.makeArray(this.getElementsByClass('animated')).forEach((e) => {
            if (this.getData(e, 'ani') !== null && this.getData(e, 'ani') != null && this.isInViewportSlightly(e)) {
                e.classList.remove('o0');
                e.classList.add(e.dataset.ani);
            }
        });
    }
    whichAnimationEvent() {
        let t, el = document.createElement("fakeelement");
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
    addListener(eID, event, fn) {
        if (this.getElementById(eID) !== undefined) {
            this.getElementById(eID).addEventListener(event, fn);
        }
    }
    removeListener(eID, event, fn) {
        this.getElementById(eID).removeEventListener(event, fn);
    }
    addEvent(e, listener, fn) {
        this.makeArray(e).forEach((el) => {
            el.addEventListener(listener, fn);
            this.l(el);
        });
    }
    centereStage(e) {
        let dimensions = this.getDimensions(e);
        e.style.marginTop = this.getCssDimension(-(dimensions.h) / 2);
        e.style.marginLeft = this.getCssDimension(-(dimensions.w) / 2);
        e.style.top = '50%';
        e.style.left = '50%';
    }
    updateViewportVars() {
        this.vw = window.innerWidth;
        this.vh = window.innerHeight;
    }
    getBounds(e) {
        return e.getBoundingClientRect();
    }
    isInViewportSlightly(e) {
        let bounding = this.getBounds(e);
        return (bounding.top >= 0 //&&
        // bounding.left >= 0 &&
        // bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        // bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    isInViewportMostly(e) {
        let bounding = this.getBounds(e);
        return (bounding.top / 2 > -bounding.top);
        // return (getPercentage((e.clientHeight + bounding.top), 50) > -bounding.top);
    }
    ajax(url, saveAs = false, formData = false, add2dom = true) {
        this.lfn('ajax');
        this.curReq = new XMLHttpRequest();
        if (this.curReq) {
            return (typeof formData !== "boolean") ? this.post(url, formData, add2dom) : this.request(url, saveAs, add2dom);
        }
        else {
            this.failed();
        }
    }
    request(url, saveAs = false, add2dom) {
        this.lfn('request');
        this.curReq.open('GET', url, true);
        this.setHeaders();
        this.curReq.send();
        let ths = this;
        this.curReq.addEventListener('readystatechange', function () {
            return ths.stateChanged(ths, saveAs, add2dom);
        });
        this.l('GETTING: ' + url);
    }
    post(url, formData, add2dom = false) {
        this.lfn('post');
        this.curReq.open('POST', url, true);
        this.setHeaders(true);
        this.curReq.send(formData);
        let ths = this;
        this.curReq.addEventListener('readystatechange', function () {
            return ths.stateChanged(ths, false, add2dom);
        });
        this.l('POSTING: ' + url);
    }
    setHeaders(isPost = false) {
        if (isPost) {
            this.curReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
        this.curReq.setRequestHeader('Cache-Control', 'no-cache');
        this.curReq.setRequestHeader('Powered-by', 'Dsynr.com');
    }
    stateChanged(ths, saveAs, add2dom) {
        this.lfn('stateChanged');
        let req = ths.curReq;
        if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status === 200) {
                return ths.succeeded(saveAs, add2dom);
            }
            else {
                this.l('Not ready yet :: ' + req.status + ' / ' + req.readyState);
            }
        }
        else {
            this.l(req);
        }
    }
    failed() {
        this.l('Cannot create an XMLHTTP instance');
        return false;
    }
    succeeded(saveAs, add2dom) {
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
    addFetchedData(requestResponse, parent = document.body) {
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
    showFetchedData(fdp) {
        this.lfn('showFetchedData');
        this.removeClass(fdp, 'd-none');
        new DsynrModal(fdp);
    }
    getPageScripts(dsynrUtil) {
        function _(parentNode) {
            for (let node of parentNode.children) {
                if (node.hasAttribute('src') && node.getAttribute('src') != null) {
                    dsynrUtil.documentScripts.push(node.getAttribute('src'));
                }
            }
        }
        _(document.head);
        _(document.body);
    }
    /**
     * Log to the console
     * @param data
     */
    l(data) {
        console.log(data);
    }
    /**
     * Log active function name
     * @param functionName
     */
    lfn(functionName) {
        this.l(' {} ' + functionName);
    }
    /**
     * Log click
     * @param element
     */
    lclk(element) {
        this.l('* click ' + element);
    }
}
let d = new DsynrUtil();
//# sourceMappingURL=DsynrUtil.js.map