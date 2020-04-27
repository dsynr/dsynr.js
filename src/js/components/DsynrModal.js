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