class Dsynr {
    constructor(conf = {}) {
        this.conf = {
            domain: document.baseURI,
            defaultParent: document.body,
            ani: {
                superfix: 'animate__animated',
                prefix: 'animate__',
                speed: {
                    faster: 'animate__faster',
                    default: '',
                },
                styles: {
                    zoomIn: 'zoomIn',
                    fadeIn: 'fadeIn',
                    fadeInUp: 'fadeInUp',
                    slideInDown: 'slideInDown',
                    slideInUp: 'slideInUp',
                    slideInLeft: 'slideInLeft',
                    slideInRight: 'slideInRight',
                    slideOutUp: 'slideOutUp',
                    heartBeat: 'heartBeat',
                }
            },
        };
        this.transitionEvent = this.whichAnimationEvent();
        this.requestDataset = {};
        this.totalRequestDatasets = 0;
        this.documentScripts = [];
        this.updateConfig(conf);
        this.updateViewportVars();
        this.reqDataReady = new Event('reqDataReady');
    }
    /**
     * @todo
     * @param params
     */
    updateConfig(params) {
        this.lfn('updateConfig Dsynr....');
        this.defaultConf();
    }
    defaultConf() {
        this.lfn('defaultConf');
        this.conf.ani.prefix = this.conf.ani.superfix + ' ' + this.conf.ani.prefix;
        this.conf.ani.speed.default = this.conf.ani.speed.faster;
    }
    docReady(fn) {
        if (document.readyState == 'complete') {
            fn();
        }
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
    getRandArrayItem(mixed_arr) {
        return mixed_arr[Math.floor(Math.random() * mixed_arr.length)];
    }
    /**
     *
     * @param obj
     * @return {any}
     */
    getRandObjItem(obj) {
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
    /**
     *
     * @param obj
     * @param propSet
     */
    updateProps(obj, propSet) {
        this.lfn('updateProps...');
        for (let prop in propSet) {
            if (propSet.hasOwnProperty(prop)) {
                obj[prop] = propSet[prop];
            }
            console.log(prop + ':' + obj[prop]);
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
        console.log(objList);
        let hasIt = false;
        objList.forEach((o, i) => {
            if (o === obj) {
                hasIt = true;
                return;
            }
        });
        console.log(hasIt);
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
    /**
     *
     * @param id
     * @param classes
     * @param parent
     */
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
    getFirstElement(list) {
        return list[0];
    }
    getElementsBySelector(selector, parent = document.body, getFirst = false) {
        let list = parent.querySelectorAll(selector);
        return getFirst ? this.getFirstElement(list) : list;
    }
    getElementsByTag(tagName, parent = document.body, getFirst = false) {
        let list = parent.querySelectorAll(tagName);
        return getFirst ? this.getFirstElement(list) : list;
    }
    getElementsByClass(className, parent = document.body, getFirst = false) {
        let list = parent.getElementsByClassName(className);
        return getFirst ? this.getFirstElement(list) : list;
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
        this.makeArray(this.getElementsByClass(d.conf.ani.superfix)).forEach((e) => {
            if (this.isInViewportSlightly(e)) {
                this.removeClass(e, 'o0');
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
    addListener(el, ev, fn) {
        this._event(el, ev, fn);
    }
    removeListener(el, ev, fn) {
        this._event(el, ev, fn, false);
    }
    toggleClass(e, remove, add) {
        if (typeof e === "object") {
            e = e.target;
        }
        this.removeClass(e, remove);
        this.addClass(e, add);
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
    serialize(obj) {
        return Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
    }
    ajax(url, saveAs = false, data = false, add2dom = true, parent = document.body, enableDsynrSelect = false, method = 'GET') {
        this.lfn('ajax ' + url);
        this.curReq = new XMLHttpRequest();
        if (this.curReq) {
            this.curReq.open(method, url, true);
            this._setHeaders(method == 'POST');
            this.curReq.send(this.serialize(data));
            let ths = this;
            this.curReq.addEventListener('readystatechange', function () {
                return ths._stateChanged(ths, saveAs, add2dom, parent, enableDsynrSelect);
            });
        }
        else {
            this._failed();
        }
    }
    _failed() {
        console.log('Cannot create an XMLHTTP instance');
        return false;
    }
    _event(el, ev, fn, add = true) {
        let ths = this;
        function _(e) {
            if (add) {
                e.addEventListener(ev, fn);
            }
            else {
                e.removeEventListener(ev, fn);
            }
        }
        if (typeof el === "string" && this.getElementById(el) !== undefined) {
            _(ths.getElementById(el));
        }
        else {
            if (el.length === undefined) {
                _(el);
            }
            else {
                ths.makeArray(el).forEach((e) => {
                    _(e);
                });
            }
        }
    }
    _setHeaders(isPost = false) {
        if (isPost) {
            this.curReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
        this.curReq.setRequestHeader('Cache-Control', 'no-cache');
        this.curReq.setRequestHeader('Powered-by', 'Dsynr.com');
    }
    _stateChanged(ths, saveAs, add2dom, parent = document.body, enableDsynrSelect = false) {
        this.lfn('_stateChanged');
        let req = ths.curReq;
        if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status === 200) {
                return ths._succeeded(saveAs, add2dom, parent, enableDsynrSelect);
            }
            else {
                console.log('Not ready yet :: ' + req.status + ' / ' + req.readyState);
            }
        }
        else {
            console.log(req);
        }
    }
    _succeeded(saveAs, add2dom, parent = document.body, enableDsynrSelect = false) {
        this.lfn('_succeeded!');
        this.totalRequestDatasets++;
        if (typeof saveAs === 'string') {
            console.log('Saving to dataset; Reference key: ' + saveAs);
            // this.requestDataset[saveAs] = this.htmlToElements(this.curReq.response);
            this.requestDataset[saveAs] = this.curReq.response;
        }
        add2dom ? this.addFetchedData(this.curReq.response, parent, enableDsynrSelect) : false;
        return this.curReq.response;
    }
    _showFetchedData(fdp) {
        this.lfn('_showFetchedData');
        this.removeClass(fdp, 'd-none');
        new DsynrModal(fdp);
    }
    addFetchedData(requestResponse, parent = document.body, enableDsynrSelect = false) {
        d.lfn('addFetchedData..');
        let fdp = this.addDiv('dsynrFetchedData-' + this.totalRequestDatasets, 'd-none', parent);
        let ths = this;
        this.addListener(fdp.id, 'reqDataReady', function () {
            ths._showFetchedData(fdp);
        });
        fdp.innerHTML = requestResponse;
        console.log('enableDsynrSelect:' + enableDsynrSelect);
        enableDsynrSelect ? DsynrSelect.auto() : null;
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
    IsJson(str) {
        try {
            JSON.parse(str);
        }
        catch (e) {
            return false;
        }
        return true;
    }
    getAniClass(styleName) {
        return ' ' + this.conf.ani.prefix + styleName;
    }
    autoPrefixAniClasses(speed = this.conf.ani.speed.default) {
        for (const style in this.conf.ani.styles) {
            this.makeArray(this.getElementsByClass(style)).forEach((e) => {
                this.removeClass(e, style);
                this.addClass(e, this.conf.ani.prefix + style + ' ' + speed);
            });
        }
    }
    setHighestZindex(el) {
        let highestZindex = this.getHighestZindex();
        let delta = 3;
        highestZindex = highestZindex == undefined ? delta : highestZindex + delta;
        el.style.zIndex = highestZindex;
    }
    getHighestZindex(el = document.body) {
        return Array.from(el.querySelectorAll('*'))
            .map(a => parseFloat(window.getComputedStyle(a).zIndex))
            .filter(a => !isNaN(a))
            .sort((n1, n2) => {
            return n1 - n2;
        })
            .pop();
    }
    /**
     * Log to the console
     * @param data
     * @param isFormData
     */
    xxxl(data, isFormData = false) {
        if (isFormData) {
            console.log('Logging FormData:');
            for (let key of data.entries()) {
                console.log(key[0] + ' : ' + key[1]);
            }
        }
        else {
            console.log(data);
        }
    }
    /**
     * Log active function name
     * @param functionName
     */
    lfn(functionName) {
        console.log(' {} ' + functionName);
    }
    /**
     * Log click
     * @param element
     */
    lclk(element) {
        console.log('* click ' + element);
    }
}
let d = new Dsynr();
//# sourceMappingURL=Dsynr.js.map