//# sourceMappingURL=DsynrUI.js.map
class DsynrUIIElement {
    constructor(element, preferences = {}) {
        this.parent = document.body;
        this.prefAttr = 'dsynr-pref';
        lfn('DsynrUIIElement');
        this.content = element;
        this.updatePref(preferences);
        DsynrUIIElement.instances.push(this);
    }
    show() {
    }
    hide() {
    }
    destroy() {
    }
    updatePref(preferences) {
        lfn('updatePref');
        if (Object.keys(preferences).length > 0) {
            updateProps(this, preferences);
        }
        else {
            let options = getData(this.content, this.prefAttr);
            l(options);
            if (options !== null) {
                preferences = JSON.parse(options);
                updateProps(this, preferences);
            }
        }
        l(this);
    }
    defaults() {
    }
    setup() {
    }
    setName(context, name) {
        return concatStr([this.namePrefix, context, this.nameSuffix], '-');
    }
    setActive() {
    }
}
DsynrUIIElement.instances = [];
//# sourceMappingURL=DsynrUIIElement.js.map
class DsynrModal extends DsynrUIIElement {
    constructor(modalContent, preferences = {}) {
        lfn('DsynrModal');
        super(modalContent, preferences);
        this.setDefaults();
        this.setup();
        if (this.trigger == 'auto') {
            this.show();
        }
    }
    show() {
        lfn('show via : ' + this.trigger);
        if (this.animate) {
            addClass(this.instance, this.animationClasses);
            addClass(this.instanceRoot, this.animationClasses);
        }
        else {
            removeClass(this.instanceRoot, 'o0');
        }
        this.setActive();
    }
    hide() {
        lfn('hide');
        if (this.isOverlayOn) {
            this.hideBlanket();
            removeClass(this.instanceRoot, 'zoomIn');
            addClass(this.instanceRoot, 'zoomOut');
        }
    }
    destroy() {
        throw new Error("Method not implemented.");
    }
    setDefaults() {
        lfn('setDefaultOptions');
        let positionClasses = 'position-absolute';
        let alignmentClasses = 'top left';
        this.animate = addProp(this, 'animate', true);
        this.isOverlayOn = addProp(this, 'isOverlayOn', false);
        this.useOverlay = addProp(this, 'useOverlay', true);
        this.disableUnderlay = addProp(this, 'disableUnderlay', true);
        this.nameSuffix = addProp(this, 'nameSuffix', DsynrModal.instances.length.toString());
        this.namePrefix = addProp(this, 'namePrefix', 'dsynrModal');
        this.animationClasses = addProp(this, 'animationClasses', 'animated fadeIn');
        this.overlayClasses = addProp(this, 'overlayClasses', 'o50 bg-dark');
        this.underlayClasses = addProp(this, 'underlayClasses', concatStr([positionClasses, alignmentClasses, 'z1 wmax hmax']));
        this.instanceClasses = addProp(this, 'modalClasses', concatStr([positionClasses, 'z2']));
        this.rootClasses = addProp(this, 'rootClasses', concatStr([positionClasses, alignmentClasses, 'z3 o0']));
        this.trigger = addProp(this, 'trigger', 'auto');
    }
    setup() {
        lfn('setup');
        if (typeof this.parent === 'string') {
            this.parent = getElementById(this.parent);
        }
        this.instanceRoot = addDiv(this.setName('root', this.content.id), this.rootClasses, this.parent);
        if (this.disableUnderlay) {
            this.instanceRoot.style.width = getCssDimension(this.parent.clientWidth);
            this.instanceRoot.style.height = getCssDimension(this.parent.clientHeight);
            if (this.useOverlay) {
                this.underlayClasses = concatStr([this.underlayClasses, this.overlayClasses]);
            }
            this.underlay = addDiv(this.setName('underlay', this.content.id), this.underlayClasses, this.instanceRoot);
        }
        this.instance = addDiv(this.setName('modal', this.parent.id), this.instanceClasses, this.instanceRoot);
        if (this.trigger != 'auto') {
            addListener(this.trigger, 'click', this.show);
        }
        if (this.animate) {
            this.instance.addEventListener(transitionEvent, this.modalHidden);
        }
        //update to detect parent (parent) resizing opposed to just window
        this.instance.appendChild(this.content);
        this.align();
        // window.addEventListener('resize', function () {
        //     modals[modals.length].align();
        // });
        l('Modal READY!');
    }
    setActive() {
        this.instanceRoot = this.instanceRoot;
        this.content.focus();
    }
    showBlanket() {
        let blanket;
        blanket = addDiv('blanket', this.overlayClasses, document.body);
        addDiv('blanketcoat', this.underlayClasses, blanket);
        blanket.classList.remove('o0');
        blanket.addEventListener(transitionEvent, this.blanketHidden);
        this.isOverlayOn = true;
    }
    hideBlanket() {
        let blanket;
        blanket = getElementById('blanket');
        blanket.classList.remove('fadeIn');
        blanket.classList.add('fadeOut');
    }
    blanketHidden(event) {
        // Do something when the transition ends
        let blanket;
        blanket = getElementById('blanket');
        if (event.animationName == 'fadeOut') {
            blanket.removeEventListener(transitionEvent, this.blanketHidden);
            blanket.remove();
            this.isOverlayOn = false;
        }
    }
    align() {
        centereStage(this.instance);
    }
    modalHidden(event) {
        // Do something when the transition ends
        if (event.animationName == 'zoomOut') {
            this.instanceRoot.classList.add('d-none');
            this.instanceRoot.classList.remove('zoomOut');
            this.instanceRoot.removeEventListener(transitionEvent, this.modalHidden);
        }
    }
}
function autoModalize(modalClass = 'dsynrModal') {
    lfn('autoModalize');
    makeArray(getElementsByClass(modalClass)).forEach(function (mdl, index) {
        new DsynrModal(mdl);
    });
}
//# sourceMappingURL=DsynrModal.js.map
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
function updateProps(obj, propSet) {
    for (let prop in propSet) {
        if (propSet.hasOwnProperty(prop)) {
            obj[prop] = propSet[prop];
        }
    }
}
function addProp(obj, propName, propVal = undefined, overwrite = false) {
    lfn('addProp');
    l(propName + ":" + propVal);
    if (overwrite || !obj.hasOwnProperty(propName)) {
        Object.defineProperty(obj, propName, {
            configurable: true,
            enumerable: true,
            writable: true,
            value: propVal
        });
    }
    // l(obj);
    return obj[propName];
}
//# sourceMappingURL=obj.js.map
function getRandColour() {
    return '#' + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6);
}
function getRandColourRGBA(maxO = 1, maxR = 255, maxG = 255, maxB = 255) {
    return 'rgba(' + getRandFloor(0, maxR) + ',' + getRandFloor(0, maxG) + ',' + getRandFloor(0, maxB) + ',' + getRandDecimal(0, maxO) + ')';
}
//# sourceMappingURL=graphics.js.map
function getCssDimension(val, unit = 'px') {
    return val + unit;
}
function randRadius() {
    return getRandomArbitrary(5, 150);
}
function randWidth() {
    return getRandomArbitrary(2, 15);
}
function getDimensions(e) {
    return { w: e.clientWidth, h: e.clientHeight };
}
function hide(e) {
    e.style.display = 'none';
}
function addClass(e, classes) {
    e.className += ' ' + classes;
}
function removeClass(e, classes) {
    e.classList.remove(classes);
}
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