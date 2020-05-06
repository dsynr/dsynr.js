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