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
            d.l('setting trigger to : ' + this.trigger);
            d.addListener(this.trigger, 'click', function () {
                self.show();
            });
            d.l('Modal Trigger READY!');
        }
        else {
            d.l('Triggering Automatically...');
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
                d.l('parent unavailable, adding modal to body');
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
            d.l(this.parent.id);
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
                d.l('parent cannot accommodate child, adopting body as parent!');
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
            d.l('displayTogether...');
            if (this.animate && this.animateUnderlay) {
                d.l('this.animate && this.animateUnderlay....');
                if (getAttention) {
                    d.l('getAttention..');
                    d.removeClass(this.instanceRoot, this.animateInClass);
                    d.addClass(this.instanceRoot, this.animateAttentionClass);
                    d.removeClass(this.instance, this.modalAnimateInClass);
                    d.addClass(this.instance, this.modalAnimateAttentionClass);
                }
                else {
                    d.l('NOT getAttention..');
                    d.addClass(this.instanceRoot, this.animateClass + d.conf.ani.styles.fadeIn);
                    d.addClass(this.instance, this.animateClass + d.conf.ani.styles.fadeIn);
                    // d.removeClass(this.instanceRoot, 'o0');
                    // d.removeClass(this.instance, 'o0');
                }
            }
            else {
                if (getAttention) {
                    //@todo
                    d.l('getting Attention.....');
                }
                else {
                    d.removeClass(this.instanceRoot, 'o0');
                    d.removeClass(this.instance, 'o0');
                }
            }
        }
        else {
            //@todo animate one after other
            d.l('animate one after other...');
        }
    }
    hide(destroy = this.autoDestroy) {
        d.lfn('hide');
        if (this.useOverlay) {
            d.removeClass(this.instanceRoot, this.modalAnimateInClass);
            d.addClass(this.instanceRoot, this.modalAnimateOutClass);
        }
        if (destroy) {
            d.l('TODO ONANIMATIONEND LISTENER...');
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
            d.l('enabling animation');
            this.instance.addEventListener(d.transitionEvent, ths.modalHidden);
            // this.instance.addEventListener(d.transitionEvent, ths.modalHidden);
        }
        d.addListener(this.instanceRoot.id, 'keydown', function (ev) {
            if (ev.key == 'Escape') {
                ths.hide(ths.autoDestroy);
            }
        });
        d.addListener(this.instanceRoot.id, 'click', function (ev) {
            d.l(ev.target);
            // @ts-ignore
            d.l(ev.target.offsetParent);
            // @ts-ignore
            d.l(ev.target.classList.value);
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