//# sourceMappingURL=DsynrSite.js.map
//# sourceMappingURL=DsynrUI.js.map
class DsynrUIIElement {
    constructor(element, preferences) {
        this.selfAbort = false;
        this.prefAttr = 'dsynr-pref';
        d.lfn('DsynrUIIElement');
        this.content = element;
        let self = this;
        if (DsynrUIIElement.instances.length > 0) {
            DsynrUIIElement.instances.forEach(function (instance, index) {
                if (instance.content === element) {
                    self.selfAbort = true;
                    console.log("already instantiated, aborting...");
                    return;
                }
            });
        }
        if (!this.selfAbort) {
            this.preferences = preferences;
            this.setPref();
            this.setParent();
            DsynrUIIElement.instances.push(this);
            console.log(DsynrUIIElement.instances);
        }
    }
    setPref() {
        d.lfn('setPref');
        // console.log(this.preferences);
        if (Object.keys(this.preferences).length > 0) {
            console.log('Object.keys(preferences).length:' + Object.keys(this.preferences).length);
            // console.log(Object.keys(preferences).length > 0);
            //d.updateProps(this, preferences);
        }
        else {
            let options = d.getData(this.content, this.prefAttr);
            console.log(options);
            if (options !== null) {
                console.log('parsing preferences : ' + options);
                this.preferences = d.IsJson(options) ? JSON.parse(options) : d.conf[options];
            }
        }
        d.updateProps(this, this.preferences);
    }
    setup() {
    }
    setParent() {
        d.lfn('setParent');
        console.log(this.parent);
        if (this.parent === undefined) {
            // @ts-ignore
            this.parent = 'parent';
        }
        if (typeof this.parent === 'string') {
            console.log(this.parent);
            if (this.parent == 'parent') {
                this.parent = this.content.parentElement;
            }
            else {
                this.parent = d.getElementById(this.parent);
            }
        }
        console.log(this.parent);
    }
    setDefaults(reset = false) {
        d.lfn('setDefaults super ');
        this.animate = d.addProp(this, 'animate', true, reset);
        this.animateClass = d.addProp(this, 'animateClass', d.conf.ani.prefix, reset);
        this.animateInClass = d.addProp(this, 'animateInClass', d.concatStr([this.animateClass, d.conf.ani.styles.fadeIn]), reset);
        this.animateOutClass = d.addProp(this, 'animateOutClass', d.concatStr([this.animateClass, d.conf.ani.styles.slideOutUp]), reset);
        this.animateAttentionClass = d.addProp(this, 'animateOutClass', d.concatStr([this.animateClass, 'heartBeat']), reset);
    }
    addListeners() {
    }
    setActive() {
    }
    attention() {
    }
    show() {
    }
    hide() {
    }
    destroy() {
        d.lfn('destroy');
        this.instance.remove();
    }
    setName(context, name) {
        return d.concatStr([this.namePrefix, context, this.nameSuffix], '-');
    }
}
DsynrUIIElement.instances = [];
//# sourceMappingURL=DsynrUIIElement.js.map
///<reference path="../Dsynr.ts"/>
class DsynrModal extends DsynrUIIElement {
    constructor(modalContent, preferences = {}) {
        super(modalContent, preferences);
        if (!this.selfAbort) {
            d.lfn('DsynrModal');
            this.setDefaults();
            this.setup();
        }
    }
    setDefaults(reset = false) {
        d.lfn('setDefaults');
        super.setDefaults();
        let positionClass = 'position-absolute';
        let alignmentClass = 'top left';
        this.adoptParent = d.addProp(this, 'adoptParent', true, reset);
        this.animateModal = d.addProp(this, 'animateModal', true, reset);
        this.autoDestroy = d.addProp(this, 'autoDestroy', true, reset);
        this.displayTogether = d.addProp(this, 'displayTogether', true, reset);
        this.useOverlay = d.addProp(this, 'useOverlay', true, reset);
        this.disableUnderlay = d.addProp(this, 'disableUnderlay', true, reset);
        this.respectBounds = d.addProp(this, 'respectBounds', true, reset);
        this.animateUnderlay = d.addProp(this, 'animateUnderlay', true, reset);
        this.nameSuffix = d.addProp(this, 'nameSuffix', DsynrModal.instances.length.toString(), reset);
        this.namePrefix = d.addProp(this, 'namePrefix', 'dsynrModal', reset);
        this.modalAnimateInClass = d.addProp(this, 'modalAnimateInClass', d.concatStr([this.animateClass, 'flipInX']), reset);
        this.modalAnimateOutClass = d.addProp(this, 'modalAnimateOutClass', d.concatStr([this.animateClass, 'flipOutY']), reset);
        this.modalAnimateAttentionClass = d.addProp(this, 'modalAnimateAttentionClass', d.concatStr([this.animateClass, 'shake']), reset);
        this.overlayClass = d.addProp(this, 'overlayClass', 'o50 bg-dark', reset);
        this.parentSizingClass = d.addProp(this, 'sizingClass', 'wmax hmax', reset);
        this.windowSizingClass = d.addProp(this, 'windowSizingClass', 'vw vh', reset);
        this.underlayClass = d.addProp(this, 'underlayClass', d.concatStr([positionClass, alignmentClass, this.parentSizingClass, 'dsynrModalUnderlay']), reset);
        this.instanceClass = d.addProp(this, 'instanceClass', d.concatStr([positionClass, 'o0 rounded nooverflow', 'dsynrModalContentRoot']), reset);
        this.instanceRootClass = d.addProp(this, 'instanceRootClass', d.concatStr([positionClass, alignmentClass, this.parentSizingClass, 'o0 d-none', 'dsynrModal']), reset);
        this.trigger = d.addProp(this, 'trigger', 'auto', reset);
        this.onModalDestroy = d.addProp(this, 'onModalDestroy', () => {
            this.hide(this.autoDestroy);
        }, reset);
    }
    setup() {
        d.lfn('setup');
        let self = this;
        d.addClass(this.content, 'd-none');
        if (this.trigger != 'auto') {
            console.log('setting trigger to : ' + this.trigger);
            d.addListener(this.trigger, 'click', function () {
                self.show();
            });
            console.log('Modal Trigger READY!');
        }
        else {
            console.log('Triggering Automatically...');
            this.show();
        }
    }
    /**
     * @todo
     * add animationEnd listener for root and then animate modal
     * add optional animationEnd listener for modal
     */
    show() {
        if (DsynrModal.activeInstance !== this) {
            d.lfn('show via : ' + this.trigger);
            d.addClass(this.content, 'o0');
            d.removeClass(this.content, 'd-none');
            if (this.parent === undefined) {
                console.log('parent unavailable, adding modal to body');
                this.parent = document.body;
            }
            this.instanceRoot = d.addDiv(this.setName('root', this.content.id), this.instanceRootClass, this.parent);
            d.setHighestZindex(this.instanceRoot);
            this.instance = d.addDiv(this.setName('modal', this.parent.id), this.instanceClass, this.instanceRoot);
            this.instance.style.zIndex = (parseInt(this.instanceRoot.style.zIndex) - 1).toString();
            if (this.disableUnderlay) {
                // this.resizeRoot();
                if (this.useOverlay) {
                    this.underlayClass = d.concatStr([this.underlayClass, this.overlayClass]);
                }
                this.underlay = d.addDiv(this.setName('underlay', this.content.id), this.underlayClass, this.instanceRoot);
                this.underlay.style.zIndex = (parseInt(this.instance.style.zIndex) - 1).toString();
            }
            else {
                d.removeClass(this.instanceRoot, this.parentSizingClass);
            }
            this.addListeners();
            //update to detect parent (parent) resizing opposed to just window
            this.instance.appendChild(this.content);
            // window.addEventListener('resize', function () {
            //     modals[modals.length].align();
            // });
            d.removeClass(this.instanceRoot, 'd-none');
            d.removeClass(this.instance, 'o0');
            d.removeClass(this.content, 'o0');
            console.log(this.parent.id);
            if (this.respectBounds) {
                if (this.content.clientHeight > this.parent.clientHeight) {
                    this.instance.style.height = d.getCssDimension(this.parent.clientHeight - 50);
                    this.instance.style.overflowY = 'auto';
                }
                if (this.content.clientWidth > this.parent.clientWidth) {
                    this.instance.style.width = d.getCssDimension(this.parent.clientWidth - 50);
                    this.instance.style.overflowX = 'auto';
                }
            }
            if (this.adoptParent && (this.content.clientHeight > this.parent.clientHeight || this.content.clientWidth > this.parent.clientWidth)) {
                d.lfn('adoptParent');
                console.log('parent cannot accommodate child, adopting body as parent!');
                this.parent = document.body;
                this.parent.append(this.instanceRoot);
                this.resizeRoot();
            }
            this.align();
            this.animateDisplay();
            this.setActive();
        }
    }
    attention() {
        d.lfn('attention');
        this.animateDisplay(true);
    }
    animateDisplay(getAttention = false) {
        d.lfn('animateDisplay');
        if (this.displayTogether) {
            console.log('displayTogether...');
            if (this.animate && this.animateUnderlay) {
                console.log('this.animate && this.animateUnderlay....');
                if (getAttention) {
                    console.log('getAttention..');
                    d.removeClass(this.instanceRoot, this.animateInClass);
                    d.addClass(this.instanceRoot, this.animateAttentionClass);
                    d.removeClass(this.instance, this.modalAnimateInClass);
                    d.addClass(this.instance, this.modalAnimateAttentionClass);
                }
                else {
                    console.log('NOT getAttention..');
                    d.addClass(this.instanceRoot, this.animateClass + d.conf.ani.styles.fadeIn);
                    d.addClass(this.instance, this.animateClass + d.conf.ani.styles.fadeIn);
                    // d.removeClass(this.instanceRoot, 'o0');
                    // d.removeClass(this.instance, 'o0');
                }
            }
            else {
                if (getAttention) {
                    //@todo
                    console.log('getting Attention.....');
                }
                else {
                    d.removeClass(this.instanceRoot, 'o0');
                    d.removeClass(this.instance, 'o0');
                }
            }
        }
        else {
            //@todo animate one after other
            console.log('animate one after other...');
        }
    }
    hide(destroy = this.autoDestroy) {
        d.lfn('hide');
        if (this.useOverlay) {
            d.removeClass(this.instanceRoot, this.modalAnimateInClass);
            d.addClass(this.instanceRoot, this.modalAnimateOutClass);
        }
        if (destroy) {
            console.log('TODO ONANIMATIONEND LISTENER...');
            this.destroy();
        }
        DsynrModal.activeInstance = false;
    }
    resizeRoot() {
        d.lfn('resizeRoot');
        if (this.parent == document.body) {
            d.removeClass(this.instanceRoot, this.parentSizingClass);
            d.addClass(this.instanceRoot, this.windowSizingClass);
        }
        else {
            this.instanceRoot.style.width = d.getCssDimension(this.parent.clientWidth);
            this.instanceRoot.style.height = d.getCssDimension(this.parent.clientHeight);
        }
    }
    destroy() {
        d.lfn('destroying modal..');
        this.instanceRoot.remove();
    }
    setActive() {
        d.lfn('setActive');
        this.instanceRoot = this.instanceRoot;
        this.content.focus();
        DsynrModal.activeInstance = this;
    }
    addListeners() {
        d.lfn('addListeners');
        let ths = this;
        if (this.animate) {
            console.log('enabling animation');
            this.instance.addEventListener(d.transitionEvent, ths.modalHidden);
            // this.instance.addEventListener(d.transitionEvent, ths.modalHidden);
        }
        d.addListener(this.instanceRoot.id, 'keydown', function (ev) {
            if (ev.key == 'Escape') {
                ths.hide(ths.autoDestroy);
            }
        });
        d.addListener(this.instanceRoot.id, 'click', function (ev) {
            console.log(ev.target);
            // @ts-ignore
            console.log(ev.target.offsetParent);
            // @ts-ignore
            console.log(ev.target.classList.value);
            // @ts-ignore
            if (ev.target.classList.value == ths.underlayClass) {
                ths.onModalDestroy();
                // if (this.onModalDestroy !== undefined) {
                // } else {
                //     ths.hide(true);
                // }
            }
        });
    }
    blanketHidden(event) {
        // Do something when the transition ends
        let blanket;
        blanket = d.getElementById('blanket');
        if (event.animationName == 'fadeOut') {
            blanket.removeEventListener(d.transitionEvent, this.blanketHidden);
            blanket.remove();
            // this.isOverlayOn = false;
        }
    }
    align() {
        d.lfn('align');
        if (!this.disableUnderlay) {
            d.addClass(this.instanceRoot, this.parentSizingClass);
        }
        d.centereStage(this.instance);
        if (!this.disableUnderlay) {
            //@todo d.removeClass(this.instanceRoot,this.parentSizingClass);
        }
    }
    modalHidden(event) {
        // Do something when the transition ends
        if (event.animationName == 'zoomOut') {
            this.instanceRoot.classList.add('d-none');
            this.instanceRoot.classList.remove('zoomOut');
            this.instanceRoot.removeEventListener(d.transitionEvent, this.modalHidden);
        }
    }
    static auto(modalClass = 'dsynrModal') {
        d.lfn('auto');
        d.makeArray(d.getElementsByClass(modalClass)).forEach(function (instance) {
            new DsynrModal(instance);
        });
    }
}
//# sourceMappingURL=DsynrModal.js.map
class DsynrSelect extends DsynrUIIElement {
    constructor(select, preferences = {}) {
        super(select, preferences);
        if (!this.selfAbort) {
            d.lfn('DsynrSelect');
            this.setDefaults();
            this.setup();
        }
    }
    setDefaults(reset = false) {
        super.setDefaults();
        d.lfn('setDefaults');
        this.adoptParent = d.addProp(this, 'adoptParent', true, reset);
        this.nameSuffix = d.addProp(this, 'nameSuffix', DsynrSelect.instances.length.toString(), reset);
        this.namePrefix = d.addProp(this, 'namePrefix', 'dsynrEnhancedSelect', reset);
        this.optionPrefix = d.addProp(this, 'namePrefix', d.concatStr([this.namePrefix, 'option'], '-'), reset);
        this.instanceClass = d.addProp(this, 'instanceClasses', d.concatStr([this.namePrefix, 'rounded bg-light shadow p-5']), reset);
        this.showFinder = d.addProp(this, 'showFinder', false, reset);
        this.autoExit = d.addProp(this, 'autoExit', true, reset);
        this.isActive = d.addProp(this, 'isActive', false, reset);
        this.triggerCls = d.addProp(this, 'btnCls', d.concatStr([this.namePrefix, 'trigger btn btn-link'], '-'), reset);
        this.optCls = d.addProp(this, 'optCls', d.concatStr([this.optionPrefix, 'hand p-2']), reset);
        this.optClsActive = d.addProp(this, 'optClsActive', 'active bg-warning rounded', reset);
    }
    setup() {
        d.lfn('setup');
        if (this.content.id === '') {
            this.content.id = 'dsynrSelect-' + DsynrSelect.instances.length;
        }
        this.options = this.content.options;
        this.option = this.options[this.options.selectedIndex];
        this.setTrigger();
        console.log('Select Trigger READY!');
    }
    show() {
        d.lfn('show triggered via : ' + this.trigger.id);
        if (this.isActive) {
            this.attention();
        }
        else {
            this.instance = d.addDiv(this.setName('', this.content.id), this.instanceClass);
            this.instance.tabIndex = 0;
            this.instance.style.outline = 'none';
            let ths = this;
            d.makeArray(this.options).forEach(function (o, index) {
                ths.addESOption(o, index);
            });
            this.modalPref = d.mergeObjs(this.preferences, {
                'trigger': 'auto', 'parent': this.parent, 'adoptParent': this.adoptParent, 'onModalDestroy': () => {
                    ths.destroy();
                }
            });
            this.modal = new DsynrModal(this.instance, this.modalPref);
            this.setActive();
        }
    }
    attention() {
        DsynrSelect.activeInstance = this;
        this.modal.attention();
    }
    update(selectOption) {
        d.lfn('update');
        d.removeClass(this.esPrevOpt, this.optClsActive);
        this.option = selectOption;
        d.addClass(this.option, this.optClsActive);
        this.esPrevOpt = d.getElementById(selectOption.id);
        this.content.selectedIndex = parseInt(d.getData(selectOption, 'index'));
        this.trigger.textContent = this.option.innerText;
        if (this.autoExit) {
            this.destroy();
        }
    }
    addESOption(o, i) {
        d.lfn('addESOption');
        let oid = d.concatStr([this.optionPrefix, this.content.id, i], '-');
        let ocls;
        console.log(this.esPrevOpt);
        ocls = (i == this.content.selectedIndex) ? d.concatStr([this.optCls, this.optClsActive]) : ocls = this.optCls;
        let eso = d.addDiv(oid, ocls, this.instance);
        eso.tabIndex = i;
        eso.style.outline = 'none';
        if (i == this.option.index) {
            this.esPrevOpt = eso;
        }
        let oe = d.getElementById(oid);
        oe.textContent = o.text;
        d.setData(oe, 'index', o.index.toString());
        let ths = this;
        d.addListener(oe.id, 'click', function () {
            d.lclk(oe.id);
            ths.update(oe);
        });
        d.addListener(oe.id, 'keydown', function (ev) {
            if (ev.key == 'Enter') {
                ths.update(oe);
            }
        });
    }
    setTrigger() {
        d.lfn('addTrigger');
        this.trigger = d.addDiv(this.setName('btn', this.content.id), this.triggerCls, this.content.parentElement);
        d.addText(this.option.text, this.trigger);
        let ths = this;
        d.addListener(this.trigger.id, 'click', function (ev) {
            ev.preventDefault();
            ths.show();
        });
        d.hide(this.content);
    }
    addListeners() {
        d.lfn('d.addListeners...');
        let ths = this;
        d.addListener(this.instance.id, 'focus', ev => {
            console.log('focused!');
        });
        d.addListener(this.instance.id, 'keydown', function (evnt) {
            switch (evnt.key) {
                case 'ArrowDown':
                case 'ArrowRight':
                case 'Tab':
                    ths.next();
                    break;
                case 'ArrowUp':
                case 'ArrowLeft':
                    ths.prev();
                    break;
                case 'Escape':
                    ths.destroy();
                    break;
            }
        });
    }
    next() {
        d.lfn('next');
    }
    prev() {
        d.lfn('prev');
    }
    destroy() {
        d.lfn('destroy');
        this.modal.hide(true);
        this.isActive = false;
        DsynrSelect.activeInstance = false;
    }
    setActive() {
        d.lfn('setActive');
        this.isActive = true;
        DsynrSelect.activeInstance = this;
        this.addListeners();
        this.instance.focus();
    }
    static auto(selectClass = 'dsynrSelect') {
        d.lfn('auto');
        d.makeArray(d.getElementsByClass(selectClass)).forEach(function (instance) {
            new DsynrSelect(instance);
        });
    }
}
//# sourceMappingURL=DsynrSelect.js.map
class Dsynr {
    constructor(conf = {}) {
        this.conf = {
            domain: document.baseURI,
            defaultParent: document.body,
            ani: {
                prefix: 'animate__animated animate__',
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
    getElementsBySelector(selector) {
        return document.querySelectorAll(selector);
    }
    getElementsByTag(tagName) {
        return document.querySelectorAll(tagName);
    }
    /**
     *
     * @param className
     */
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
            console.log(el);
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
    serialize(obj) {
        return Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
    }
    ajax(url, saveAs = false, data = false, add2dom = true, parent = document.body, enableDsynrSelect = false, method = 'GET') {
        this.lfn('ajax ' + url);
        this.curReq = new XMLHttpRequest();
        if (this.curReq) {
            this.curReq.open(method, url, true);
            this.setHeaders(method == 'POST');
            this.curReq.send(this.serialize(data));
            let ths = this;
            this.curReq.addEventListener('readystatechange', function () {
                return ths.stateChanged(ths, saveAs, add2dom, parent, enableDsynrSelect);
            });
        }
        else {
            this.failed();
        }
    }
    setHeaders(isPost = false) {
        if (isPost) {
            this.curReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
        this.curReq.setRequestHeader('Cache-Control', 'no-cache');
        this.curReq.setRequestHeader('Powered-by', 'Dsynr.com');
    }
    stateChanged(ths, saveAs, add2dom, parent = document.body, enableDsynrSelect = false) {
        this.lfn('stateChanged');
        let req = ths.curReq;
        if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status === 200) {
                return ths.succeeded(saveAs, add2dom, parent, enableDsynrSelect);
            }
            else {
                console.log('Not ready yet :: ' + req.status + ' / ' + req.readyState);
            }
        }
        else {
            console.log(req);
        }
    }
    failed() {
        console.log('Cannot create an XMLHTTP instance');
        return false;
    }
    succeeded(saveAs, add2dom, parent = document.body, enableDsynrSelect = false) {
        this.lfn('succeeded!');
        this.totalRequestDatasets++;
        if (typeof saveAs === 'string') {
            console.log('Saving to dataset; Reference key: ' + saveAs);
            // this.requestDataset[saveAs] = this.htmlToElements(this.curReq.response);
            this.requestDataset[saveAs] = this.curReq.response;
        }
        add2dom ? this.addFetchedData(this.curReq.response, parent, enableDsynrSelect) : false;
        return this.curReq.response;
    }
    addFetchedData(requestResponse, parent = document.body, enableDsynrSelect = false) {
        d.lfn('addFetchedData..');
        let fdp = this.addDiv('dsynrFetchedData-' + this.totalRequestDatasets, 'd-none', parent);
        let ths = this;
        this.addListener(fdp.id, 'reqDataReady', function () {
            ths.showFetchedData(fdp);
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
class DsynrWp {
    constructor() {
        this.conf = {
            formURL: 'form/',
        };
    }
    ready() {
        d.lfn('DsynrUtilWp');
        d.getPageScripts(d);
    }
    getForm(formName, parent = d.conf.defaultParent, enableDsynrSelect = false) {
        d.lfn('getForm');
        d.lfn('form parent::' + parent);
        if (d.requestDataset[formName] != undefined) {
            console.log(formName + ' Previously loaded / Reinstantiating from memory...');
            d.addFetchedData(d.requestDataset[formName], parent, enableDsynrSelect);
        }
        else {
            d.ajax(d.conf.domain + this.conf.formURL + formName + '?min', formName, false, true, parent, enableDsynrSelect);
        }
    }
    ajax(params = {}, parent = d.conf.defaultParent) {
        d.lfn('ajax / ' + name);
        let formData = d.mergeObjs({ action: 'dw_ajax' }, params);
        console.log(formData);
        // @ts-ignore
        d.ajax(ajxRequest.ajaxurl, false, formData, true, parent, 'POST');
    }
}
let dw = new DsynrWp();
//# sourceMappingURL=DsynrWp.js.map