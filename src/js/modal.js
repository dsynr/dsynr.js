class Modal extends DsynrUIIElement {
    constructor(modalContent, preferences = {}) {
        super();
        lfn('constructor-modal');
        if (modals === undefined) {
            modals = [];
        }
        modals.push(this);
        this.content = modalContent;
        this.defaults();
        this.updatePref(preferences);
        this.setup();
        this.show();
    }
    show() {
        lfn('show');
        if (this.animate) {
            addClass(this.itself, this.animationClasses);
            addClass(this.root, this.animationClasses);
        }
        else {
            removeClass(this.root, 'o0');
        }
        this.setActive();
    }
    hide() {
        if (this.isOverlayOn) {
            this.hideBlanket();
            removeClass(this.root, 'zoomIn');
            addClass(this.root, 'zoomOut');
        }
    }
    destroy() {
        throw new Error("Method not implemented.");
    }
    defaults() {
        lfn('setDefaultOptions');
        let positionClasses = 'position-absolute';
        let alignmentClasses = 'top left';
        this.parent = addProp(this, 'parent', document.body);
        this.animate = addProp(this, 'animate', true);
        this.isOverlayOn = addProp(this, 'isOverlayOn', false);
        this.useOverlay = addProp(this, 'useOverlay', true);
        this.disableUnderlay = addProp(this, 'disableUnderlay', true);
        this.nameSuffix = addProp(this, 'nameSuffix', modals.length.toString());
        this.namePrefix = addProp(this, 'namePrefix', 'dsynrModal');
        this.animationClasses = addProp(this, 'animationClass', 'animated fadeIn');
        this.overlayClasses = addProp(this, 'overlayClasses', 'o50 bg-dark');
        this.underlayClasses = addProp(this, 'underlayClasses', this.stringup([positionClasses, alignmentClasses, 'z1 wmax hmax']));
        this.modalClasses = addProp(this, 'modalClasses', this.stringup([positionClasses, 'z2']));
        this.rootClasses = addProp(this, 'rootClasses', this.stringup([positionClasses, alignmentClasses, 'z3 o0']));
    }
    updatePref(preferences) {
        lfn('updatePref');
        let options = getData(this.content, 'dsynr-pref');
        if (options !== null) {
            preferences = JSON.parse(options);
            updateProps(this, preferences);
        }
        else if (Object.keys(preferences).length > 0) {
            updateProps(this, preferences);
        }
        l(this);
    }
    setup() {
        lfn('setup');
        if (typeof this.parent === 'string') {
            this.parent = getElementById(this.parent);
        }
        this.root = addDiv(this.setName('root', this.content.id), this.rootClasses, this.parent);
        if (this.disableUnderlay) {
            this.root.style.width = getCssDimension(this.parent.clientWidth);
            this.root.style.height = getCssDimension(this.parent.clientHeight);
            if (this.useOverlay) {
                this.underlayClasses = this.stringup([this.underlayClasses, this.overlayClasses]);
            }
            this.underlay = addDiv(this.setName('underlay', this.content.id), this.underlayClasses, this.root);
        }
        this.itself = addDiv(this.setName('modal', this.parent.id), this.modalClasses, this.root);
        //addListener('xModal', 'click', this.hide);
        if (this.animate) {
            this.itself.addEventListener(transitionEvent, this.modalHidden);
        }
        //update to detect parent (parent) resizing opposed to just window
        this.itself.appendChild(this.content);
        this.align();
        // window.addEventListener('resize', function () {
        //     modals[modals.length].align();
        // });
    }
    setActive() {
        this.root = this.root;
        this.content.focus();
    }
    stringup(strings, seperator = ' ') {
        return strings.join(seperator);
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
        centereStage(this.itself);
    }
    modalHidden(event) {
        // Do something when the transition ends
        if (event.animationName == 'zoomOut') {
            this.root.classList.add('d-none');
            this.root.classList.remove('zoomOut');
            this.root.removeEventListener(transitionEvent, this.modalHidden);
        }
    }
}
function autoModalize(modalClass = 'dsynrModal') {
    lfn('autoModalize');
    makeArray(getElementsByClass(modalClass)).forEach(function (mdl, index) {
        new Modal(mdl);
    });
}
let modals;
//# sourceMappingURL=Modal.js.map