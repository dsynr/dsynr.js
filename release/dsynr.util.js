//# sourceMappingURL=DsynrUI.js.map
class DsynrUIIElement {
    constructor(element, preferences) {
        this.selfAbort = false;
        this.prefAttr = 'dsynr-pref';
        lfn('DsynrUIIElement');
        this.content = element;
        let self = this;
        if (DsynrUIIElement.instances.length > 0) {
            DsynrUIIElement.instances.forEach(function (instance, index) {
                if (instance.content === element) {
                    self.selfAbort = true;
                    l("already instantiated, aborting...");
                    return;
                }
            });
        }
        if (!this.selfAbort) {
            this.preferences = preferences;
            this.setPref();
            this.setParent();
            DsynrUIIElement.instances.push(this);
            l(DsynrUIIElement.instances);
        }
    }
    setPref() {
        lfn('setPref');
        // l(this.preferences);
        if (Object.keys(this.preferences).length > 0) {
            l('Object.keys(preferences).length:' + Object.keys(this.preferences).length);
            // l(Object.keys(preferences).length > 0);
            //updateProps(this, preferences);
        }
        else {
            let options = getData(this.content, this.prefAttr);
            l(options);
            if (options !== null) {
                l('parsing preferences as JSON');
                this.preferences = JSON.parse(options);
            }
        }
        updateProps(this, this.preferences);
    }
    setup() {
    }
    setParent() {
        lfn('setParent');
        l(this.parent);
        if (this.parent === undefined) {
            // @ts-ignore
            this.parent = 'parent';
        }
        if (typeof this.parent === 'string') {
            l(this.parent);
            if (this.parent == 'parent') {
                this.parent = this.content.parentElement;
            }
            else {
                this.parent = getElementById(this.parent);
            }
        }
        l(this.parent);
    }
    setDefaults(reset = false) {
        lfn('setDefaults super ');
        this.animate = addProp(this, 'animate', true, reset);
        this.animateClass = addProp(this, 'animateClass', 'animated', reset);
        this.animateInClass = addProp(this, 'animateInClass', concatStr([this.animateClass, 'fadeIn']), reset);
        this.animateOutClass = addProp(this, 'animateOutClass', concatStr([this.animateClass, 'fadeOut']), reset);
        this.animateAttentionClass = addProp(this, 'animateOutClass', concatStr([this.animateClass, 'heartBeat']), reset);
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
        lfn('destroy');
        this.instance.remove();
    }
    setName(context, name) {
        return concatStr([this.namePrefix, context, this.nameSuffix], '-');
    }
}
DsynrUIIElement.instances = [];
//# sourceMappingURL=DsynrUIIElement.js.map
class DsynrModal extends DsynrUIIElement {
    constructor(modalContent, preferences = {}) {
        super(modalContent, preferences);
        if (!this.selfAbort) {
            lfn('DsynrModal');
            this.setDefaults();
            this.setup();
        }
    }
    setDefaults(reset = false) {
        lfn('setDefaults');
        super.setDefaults();
        let positionClass = 'position-absolute';
        let alignmentClass = 'top left';
        this.adoptParent = addProp(this, 'adoptParent', true, reset);
        this.animateModal = addProp(this, 'animateModal', true, reset);
        this.autoDestroy = addProp(this, 'autoDestroy', true, reset);
        this.displayTogether = addProp(this, 'displayTogether', true, reset);
        this.useOverlay = addProp(this, 'useOverlay', true, reset);
        this.disableUnderlay = addProp(this, 'disableUnderlay', true, reset);
        this.animateUnderlay = addProp(this, 'animateUnderlay', true, reset);
        this.nameSuffix = addProp(this, 'nameSuffix', DsynrModal.instances.length.toString(), reset);
        this.namePrefix = addProp(this, 'namePrefix', 'dsynrModal', reset);
        this.modalAnimateInClass = addProp(this, 'modalAnimateInClass', concatStr([this.animateClass, 'flipInX']), reset);
        this.modalAnimateOutClass = addProp(this, 'modalAnimateOutClass', concatStr([this.animateClass, 'flipOutY']), reset);
        this.modalAnimateAttentionClass = addProp(this, 'modalAnimateAttentionClass', concatStr([this.animateClass, 'shake']), reset);
        this.overlayClass = addProp(this, 'overlayClass', 'o50 bg-dark', reset);
        this.parentSizingClass = addProp(this, 'sizingClass', 'wmax hmax', reset);
        this.windowSizingClass = addProp(this, 'windowSizingClass', 'vw vh', reset);
        this.underlayClass = addProp(this, 'underlayClass', concatStr([positionClass, alignmentClass, this.parentSizingClass, 'z1']), reset);
        this.instanceClass = addProp(this, 'instanceClass', concatStr([positionClass, 'z2 o0']), reset);
        this.instanceRootClass = addProp(this, 'instanceRootClass', concatStr([positionClass, alignmentClass, this.parentSizingClass, 'z3 o0 d-none']), reset);
        this.trigger = addProp(this, 'trigger', 'auto', reset);
    }
    setup() {
        lfn('setup');
        let self = this;
        addClass(this.content, 'd-none');
        if (this.trigger != 'auto') {
            l('setting trigger to : ' + this.trigger);
            addListener(this.trigger, 'click', function () {
                self.show();
            });
            l('Modal Trigger READY!');
        }
        else {
            l('Triggering Automatically...');
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
            lfn('show triggered via : ' + this.trigger);
            l(this);
            addClass(this.content, 'o0');
            removeClass(this.content, 'd-none');
            if (this.parent === undefined) {
                l('parent unavailable, adding modal to body');
                this.parent = document.body;
            }
            this.instanceRoot = addDiv(this.setName('root', this.content.id), this.instanceRootClass, this.parent);
            if (this.disableUnderlay) {
                // this.resizeRoot();
                if (this.useOverlay) {
                    this.underlayClass = concatStr([this.underlayClass, this.overlayClass]);
                }
                this.underlay = addDiv(this.setName('underlay', this.content.id), this.underlayClass, this.instanceRoot);
            }
            else {
                removeClass(this.instanceRoot, this.parentSizingClass);
            }
            this.instance = addDiv(this.setName('modal', this.parent.id), this.instanceClass, this.instanceRoot);
            this.addListeners();
            //update to detect parent (parent) resizing opposed to just window
            this.instance.appendChild(this.content);
            // window.addEventListener('resize', function () {
            //     modals[modals.length].align();
            // });
            removeClass(this.instanceRoot, 'd-none');
            removeClass(this.instance, 'o0');
            removeClass(this.content, 'o0');
            l(this.parent.id);
            if (this.adoptParent && (this.content.clientHeight > this.parent.clientHeight || this.content.clientWidth > this.parent.clientWidth)) {
                lfn('adoptParent');
                l('parent cannot accommodate child, adopting body as parent!');
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
        lfn('attention');
        this.animateDisplay(true);
    }
    animateDisplay(getAttention = false) {
        lfn('animateDisplay');
        if (this.displayTogether) {
            if (this.animate && this.animateUnderlay) {
                if (getAttention) {
                    removeClass(this.instanceRoot, this.animateInClass);
                    addClass(this.instanceRoot, this.animateAttentionClass);
                    removeClass(this.instance, this.modalAnimateInClass);
                    addClass(this.instance, this.modalAnimateAttentionClass);
                }
                else {
                    addClass(this.instanceRoot, this.animateInClass);
                    addClass(this.instance, this.modalAnimateInClass);
                }
            }
            else {
                if (getAttention) {
                    //@todo
                }
                else {
                    removeClass(this.instanceRoot, 'o0');
                    removeClass(this.instance, 'o0');
                }
            }
        }
        else {
            //@todo animate one after other
        }
    }
    hide(destroy = this.autoDestroy) {
        lfn('hide');
        if (this.useOverlay) {
            removeClass(this.instanceRoot, this.modalAnimateInClass);
            addClass(this.instanceRoot, this.modalAnimateOutClass);
        }
        if (destroy) {
            l('TODO ONANIMATIONEND LISTENER...');
            this.destroy();
        }
        DsynrModal.activeInstance = false;
    }
    resizeRoot() {
        lfn('resizeRoot');
        if (this.parent == document.body) {
            removeClass(this.instanceRoot, this.parentSizingClass);
            addClass(this.instanceRoot, this.windowSizingClass);
        }
        else {
            this.instanceRoot.style.width = getCssDimension(this.parent.clientWidth);
            this.instanceRoot.style.height = getCssDimension(this.parent.clientHeight);
        }
    }
    destroy() {
        lfn('destroying modal..');
        this.instanceRoot.remove();
    }
    setActive() {
        lfn('setActive');
        this.instanceRoot = this.instanceRoot;
        this.content.focus();
        DsynrModal.activeInstance = this;
    }
    addListeners() {
        lfn('addListeners');
        let self = this;
        if (this.animate) {
            l('enabling animation');
            this.instance.addEventListener(transitionEvent, self.modalHidden);
        }
    }
    blanketHidden(event) {
        // Do something when the transition ends
        let blanket;
        blanket = getElementById('blanket');
        if (event.animationName == 'fadeOut') {
            blanket.removeEventListener(transitionEvent, this.blanketHidden);
            blanket.remove();
            // this.isOverlayOn = false;
        }
    }
    align() {
        lfn('align');
        if (!this.disableUnderlay) {
            addClass(this.instanceRoot, this.parentSizingClass);
        }
        centereStage(this.instance);
        if (!this.disableUnderlay) {
            //@todo removeClass(this.instanceRoot,this.parentSizingClass);
        }
    }
    modalHidden(event) {
        // Do something when the transition ends
        if (event.animationName == 'zoomOut') {
            this.instanceRoot.classList.add('d-none');
            this.instanceRoot.classList.remove('zoomOut');
            this.instanceRoot.removeEventListener(transitionEvent, this.modalHidden);
        }
    }
    static auto(modalClass = 'dsynrModal') {
        lfn('auto');
        makeArray(getElementsByClass(modalClass)).forEach(function (instance) {
            new DsynrModal(instance);
        });
    }
}
//# sourceMappingURL=DsynrModal.js.map
class DsynrSelect extends DsynrUIIElement {
    constructor(select, preferences = {}) {
        super(select, preferences);
        if (!this.selfAbort) {
            lfn('DsynrSelect');
            this.setDefaults();
            this.setup();
        }
    }
    setDefaults(reset = false) {
        super.setDefaults();
        lfn('setDefaults');
        this.adoptParent = addProp(this, 'adoptParent', true, reset);
        this.nameSuffix = addProp(this, 'nameSuffix', DsynrSelect.instances.length.toString(), reset);
        this.namePrefix = addProp(this, 'namePrefix', 'dsynrEnhancedSelect', reset);
        this.optionPrefix = addProp(this, 'namePrefix', concatStr([this.namePrefix, 'option'], '-'), reset);
        this.instanceClass = addProp(this, 'instanceClasses', concatStr([this.namePrefix, 'rounded bg-light shadow p-5']), reset);
        this.showFinder = addProp(this, 'showFinder', false, reset);
        this.autoExit = addProp(this, 'autoExit', true, reset);
        this.isActive = addProp(this, 'isActive', false, reset);
        this.triggerCls = addProp(this, 'btnCls', concatStr([this.namePrefix, 'trigger btn btn-link'], '-'), reset);
        this.optCls = addProp(this, 'optCls', concatStr([this.optionPrefix, 'hand p-2']), reset);
        this.optClsActive = addProp(this, 'optClsActive', 'active bg-warning rounded', reset);
    }
    setup() {
        lfn('setup');
        if (this.content.id === '') {
            this.content.id = 'dsynrSelect-' + DsynrSelect.instances.length;
        }
        this.options = this.content.options;
        this.option = this.options[this.options.selectedIndex];
        this.setTrigger();
        l('Select Trigger READY!');
    }
    show() {
        lfn('show triggered via : ' + this.trigger.id);
        if (this.isActive) {
            this.attention();
        }
        else {
            this.instance = addDiv(this.setName('', this.content.id), this.instanceClass);
            let self = this;
            makeArray(this.options).forEach(function (o, index) {
                self.addESOption(o, index);
            });
            this.modalPref = mergeObjs(this.preferences, { 'trigger': 'auto', 'parent': this.parent, 'adoptParent': this.adoptParent });
            this.modal = new DsynrModal(this.instance, this.modalPref);
            this.setActive();
        }
    }
    attention() {
        DsynrSelect.activeInstance = this;
        this.modal.attention();
    }
    update(selectOption) {
        lfn('update');
        removeClass(this.esPrevOpt, this.optClsActive);
        this.option = selectOption;
        addClass(this.option, this.optClsActive);
        this.esPrevOpt = getElementById(selectOption.id);
        this.content.selectedIndex = parseInt(getData(selectOption, 'index'));
        this.trigger.textContent = this.option.innerText;
        if (this.autoExit) {
            this.destroy();
        }
    }
    addESOption(o, i) {
        lfn('addESOption');
        let oid = concatStr([this.optionPrefix, this.content.id, i], '-');
        let ocls;
        l(this.esPrevOpt);
        ocls = (i == this.option.index) ? concatStr([this.optCls, this.optClsActive]) : ocls = this.optCls;
        addDiv(oid, ocls, this.instance);
        if (i == this.option.index) {
            this.esPrevOpt = getElementById(oid);
        }
        let oe = getElementById(oid);
        oe.textContent = o.text;
        setData(oe, 'index', o.index.toString());
        let self = this;
        addListener(oe.id, 'click', function () {
            lclk(oe.id);
            self.update(oe);
        });
    }
    setTrigger() {
        lfn('addTrigger');
        this.trigger = addDiv(this.setName('btn', this.content.id), this.triggerCls, this.content.parentElement);
        addText(this.option.text, this.trigger);
        let self = this;
        addListener(this.trigger.id, 'click', function () {
            self.show();
        });
        hide(this.content);
    }
    destroy() {
        lfn('destroy');
        this.modal.hide(true);
        this.isActive = false;
        DsynrSelect.activeInstance = false;
    }
    setActive() {
        lfn('setActive');
        this.isActive = true;
        DsynrSelect.activeInstance = this;
    }
    static auto(selectClass = 'dsynrSelect') {
        lfn('auto');
        makeArray(getElementsByClass(selectClass)).forEach(function (instance) {
            new DsynrSelect(instance);
        });
    }
}
//# sourceMappingURL=DsynrSelect.js.map
/**
 * @todo
 */
function gtag(type, name, other) {
}
/**
 * @todo
 */
function PING(type, name) {
}
//# sourceMappingURL=analytics.js.map
/**
 * Get data attribute value of a DOM element
 * @param element e DOM element
 * @param string attrName Name of the data-attribute
 */
function getData(e, attrName) {
    return e.getAttribute('data-' + attrName);
}
/**
 * Set data attribute for a DOM element
 * @param element e DOM element
 * @param string attrName Name of the data-attribute
 * @param string attrVal Value to be set for the attribute, default ''
 */
function setData(e, attrName, attrVal = '') {
    e.setAttribute('data-' + attrName, attrVal);
}
// debounce so filtering doesn't happen every millisecond
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
//# sourceMappingURL=other.js.map
function concatStr(strings, separator = ' ') {
    return strings.join(separator);
}
//# sourceMappingURL=string.js.map
function getPercentage(x, percent) {
    return (x * percent) / 100;
}
function getRandFloor(min = 0, max = 255) {
    return getRandDecimal(min, max, 0);
}
function getRandNum(min = 0, max = 255) {
    return Math.round(getRandDecimal(min, max, 0));
}
function getRandDecimal(min = 0, max = 1, precision = 2) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(precision));
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
//# sourceMappingURL=math.js.map
function makeArray(collection) {
    return Array.from(collection);
}
function get_rand_array_item(mixed_arr) {
    return mixed_arr[Math.floor(Math.random() * mixed_arr.length)];
}
function get_rand_obj_item(obj) {
    let keys = Object.keys(obj);
    return obj[keys[keys.length * Math.random() << 0]];
}
function addProp(obj, propName, propVal = undefined, overwrite = false) {
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
function updateProps(obj, propSet) {
    lfn('updateProps...');
    for (let prop in propSet) {
        if (propSet.hasOwnProperty(prop)) {
            obj[prop] = propSet[prop];
        }
        l(prop + ':' + obj[prop]);
    }
}
function mergeObjs(main, sub) {
    for (let prop in sub) {
        main[prop] = sub[prop];
    }
    return main;
}
function hasInstance(objList, obj) {
    lfn('hasInstance');
    l(objList);
    let hasIt = false;
    objList.forEach(function (o, i) {
        if (o === obj) {
            hasIt = true;
            return;
        }
    });
    l(hasIt);
    return hasIt;
}
//# sourceMappingURL=obj.js.map
function getRandColour() {
    return '#' + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6);
}
function getRandColourRGBA(maxO = 1, maxR = 255, maxG = 255, maxB = 255) {
    return 'rgba(' + getRandFloor(0, maxR) + ',' + getRandFloor(0, maxG) + ',' + getRandFloor(0, maxB) + ',' + getRandDecimal(0, maxO) + ')';
}
//# sourceMappingURL=graphics.js.map
/**
 *
 * @param val
 * @param unit
 */
function getCssDimension(val, unit = 'px') {
    return val + unit;
}
function randRadius() {
    return getRandomArbitrary(5, 150);
}
function randWidth() {
    return getRandomArbitrary(2, 15);
}
/**
 *
 * @param e
 */
function getDimensions(e) {
    return { w: e.clientWidth, h: e.clientHeight };
}
/**
 *
 * @param e
 */
function hide(e) {
    e.style.display = 'none';
}
/**
 *
 * @param e
 * @param classes
 */
function addClass(e, classes) {
    e.classList.add(...classes.split(' '));
}
/**
 *
 * @param e
 * @param classes
 */
function removeClass(e, classes) {
    e.classList.remove(...classes.split(' '));
}
/**
 *
 * @param e
 * @param classes
 */
function hasClass(e, classes) {
    return e.classList.contains(classes);
}
//# sourceMappingURL=css.js.map
function addDiv(id = '', classes = '', parent = document.body) {
    let div = document.createElement('DIV');
    div.id = id;
    div.className = classes;
    parent.appendChild(div);
    return div;
}
function addText(txt = '', root) {
    root.appendChild(document.createTextNode(txt));
}
function getElementsBySelector(selector) {
    return document.querySelectorAll(selector);
}
function getElementsByTag(tagName) {
    return document.querySelectorAll(tagName);
}
function getElementsByClass(className) {
    return document.getElementsByClassName(className);
}
function getElementById(elementID) {
    return window[elementID];
}
//# sourceMappingURL=dom.js.map
let transitionEvent = whichAnimationEvent();
function animateIn() {
    makeArray(getElementsByClass('animated')).forEach((e) => {
        if (getData(e, 'ani') !== null && getData(e, 'ani') != null && isInViewportSlightly(e)) {
            e.classList.remove('o0');
            e.classList.add(e.dataset.ani);
        }
    });
}
function whichAnimationEvent() {
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
} //
//# sourceMappingURL=animation.js.map
function addListener(eID, event, fn) {
    if (getElementById(eID) !== undefined) {
        getElementById(eID).addEventListener(event, fn);
    }
}
function removeListener(eID, event, fn) {
    getElementById(eID).removeEventListener(event, fn);
}
function addEvent(e, listener, fn) {
    makeArray(e).forEach((el) => {
        el.addEventListener(listener, fn);
        l(el);
    });
}
//# sourceMappingURL=events.js.map
function centereStage(e) {
    let dimensions = getDimensions(e);
    e.style.marginTop = getCssDimension(-(dimensions.h) / 2);
    e.style.marginLeft = getCssDimension(-(dimensions.w) / 2);
    e.style.top = '50%';
    e.style.left = '50%';
}
function updateViewportVars() {
    vw = window.innerWidth;
    vh = window.innerHeight;
}
function getBounds(e) {
    return e.getBoundingClientRect();
}
function isInViewportSlightly(e) {
    let bounding = getBounds(e);
    return (bounding.top >= 0 //&&
    // bounding.left >= 0 &&
    // bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    // bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
function isInViewportMostly(e) {
    let bounding = getBounds(e);
    return (bounding.top / 2 > -bounding.top);
    // return (getPercentage((e.clientHeight + bounding.top), 50) > -bounding.top);
}
let vw, vh;
//# sourceMappingURL=viewport.js.map
(function () {
    updateViewportVars();
})();
//# sourceMappingURL=main.js.map