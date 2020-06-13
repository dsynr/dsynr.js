///<reference path="../DsynrUtil.ts"/>
class DsynrModal extends DsynrUIIElement {

    private instanceRoot: HTMLElement;
    private underlay: HTMLElement;

    private trigger: string; //"auto" => automatically shows as soon as instantiated
    private instanceRootClass: string;

    private parentSizingClass: string;
    private windowSizingClass: string;
    private underlayClass: string;
    private overlayClass: string;
    private disableUnderlay: boolean;
    private useOverlay: boolean;

    private adoptParent: boolean;
    private autoDestroy: boolean;

    private animateUnderlay: boolean;
    private displayTogether: boolean;
    private animateModal: boolean;
    private modalAnimateInClass: string;
    private modalAnimateAttentionClass: string;
    private modalAnimateOutClass: string;

    constructor(modalContent: HTMLElement, preferences: object = {}) {
        super(modalContent, preferences);
        if (!this.selfAbort) {
            d.lfn('DsynrModal');
            this.setDefaults();
            this.setup();
        }
    }

    setDefaults(reset: boolean = false): void {
        d.lfn('setDefaults');

        super.setDefaults();

        let positionClass: string = 'position-absolute';
        let alignmentClass: string = 'top left';

        this.adoptParent = d.addProp(this, 'adoptParent', true, reset);
        this.animateModal = d.addProp(this, 'animateModal', true, reset);
        this.autoDestroy = d.addProp(this, 'autoDestroy', true, reset);
        this.displayTogether = d.addProp(this, 'displayTogether', true, reset);
        this.useOverlay = d.addProp(this, 'useOverlay', true, reset);
        this.disableUnderlay = d.addProp(this, 'disableUnderlay', true, reset);

        this.animateUnderlay = d.addProp(this, 'animateUnderlay', true, reset);

        this.nameSuffix = d.addProp(this, 'nameSuffix', DsynrModal.instances.length.toString(), reset);
        this.namePrefix = d.addProp(this, 'namePrefix', 'dsynrModal', reset);

        this.modalAnimateInClass = d.addProp(this, 'modalAnimateInClass', d.concatStr([this.animateClass, 'flipInX']), reset);
        this.modalAnimateOutClass = d.addProp(this, 'modalAnimateOutClass', d.concatStr([this.animateClass, 'flipOutY']), reset);
        this.modalAnimateAttentionClass = d.addProp(this, 'modalAnimateAttentionClass', d.concatStr([this.animateClass, 'shake']), reset);

        this.overlayClass = d.addProp(this, 'overlayClass', 'o50 bg-dark', reset);
        this.parentSizingClass = d.addProp(this, 'sizingClass', 'wmax hmax', reset);
        this.windowSizingClass = d.addProp(this, 'windowSizingClass', 'vw vh', reset);

        this.underlayClass = d.addProp(this, 'underlayClass', d.concatStr([positionClass, alignmentClass, this.parentSizingClass, 'z1', 'dsynrModalUnderlay']), reset);

        this.instanceClass = d.addProp(this, 'instanceClass', d.concatStr([positionClass, 'z2 o0']), reset);
        this.instanceRootClass = d.addProp(this, 'instanceRootClass', d.concatStr([positionClass, alignmentClass, this.parentSizingClass, 'z3 o0 d-none']), reset);

        this.trigger = d.addProp(this, 'trigger', 'auto', reset);
    }

    setup(): void {
        d.lfn('setup');

        let self: DsynrModal = this;
        d.addClass(this.content, 'd-none');
        if (this.trigger != 'auto') {
            d.l('setting trigger to : ' + this.trigger);
            d.addListener(this.trigger, 'click', function () {
                self.show();
            });
            d.l('Modal Trigger READY!');
        } else {
            d.l('Triggering Automatically...');
            this.show();
        }
    }

    /**
     * @todo
     * add animationEnd listener for root and then animate modal
     * add optional animationEnd listener for modal
     */
    show(): void {
        if (DsynrModal.activeInstance !== this) {
            d.lfn('show via : ' + this.trigger);

            d.addClass(this.content, 'o0');
            d.removeClass(this.content, 'd-none');

            if (this.parent === undefined) {
                d.l('parent unavailable, adding modal to body');
                this.parent = document.body;
            }
            this.instanceRoot = d.addDiv(this.setName('root', this.content.id), this.instanceRootClass, this.parent);

            if (this.disableUnderlay) {
                // this.resizeRoot();

                if (this.useOverlay) {
                    this.underlayClass = d.concatStr([this.underlayClass, this.overlayClass]);
                }

                this.underlay = d.addDiv(this.setName('underlay', this.content.id), this.underlayClass, this.instanceRoot);
            } else {
                d.removeClass(this.instanceRoot, this.parentSizingClass);
            }

            this.instance = d.addDiv(this.setName('modal', this.parent.id), this.instanceClass, this.instanceRoot);

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

    attention(): void {
        d.lfn('attention');
        this.animateDisplay(true);
    }

    private animateDisplay(getAttention: boolean = false): void {
        d.lfn('animateDisplay');

        if (this.displayTogether) {

            if (this.animate && this.animateUnderlay) {
                if (getAttention) {
                    d.removeClass(this.instanceRoot, this.animateInClass);
                    d.addClass(this.instanceRoot, this.animateAttentionClass);

                    d.removeClass(this.instance, this.modalAnimateInClass);
                    d.addClass(this.instance, this.modalAnimateAttentionClass);
                } else {
                    d.addClass(this.instanceRoot, this.animateInClass);
                    d.addClass(this.instance, this.modalAnimateInClass);
                }

            } else {
                if (getAttention) {
                    //@todo
                } else {
                    d.removeClass(this.instanceRoot, 'o0');
                    d.removeClass(this.instance, 'o0');
                }
            }

        } else {
            //@todo animate one after other
        }
    }

    hide(destroy: boolean = this.autoDestroy): void {
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

    private resizeRoot() {
        d.lfn('resizeRoot');
        if (this.parent == document.body) {
            d.removeClass(this.instanceRoot, this.parentSizingClass);
            d.addClass(this.instanceRoot, this.windowSizingClass);
        } else {
            this.instanceRoot.style.width = d.getCssDimension(this.parent.clientWidth);
            this.instanceRoot.style.height = d.getCssDimension(this.parent.clientHeight);
        }
    }

    destroy(): void {
        d.lfn('destroying modal..');
        this.instanceRoot.remove();
    }

    setActive(): void {
        d.lfn('setActive');
        this.instanceRoot = this.instanceRoot;
        this.content.focus();
        DsynrModal.activeInstance = this;
    }

    addListeners() {
        d.lfn('addListeners');
        let self: DsynrModal = this;
        if (this.animate) {
            d.l('enabling animation');
            this.instance.addEventListener(d.transitionEvent, self.modalHidden);
            // this.instance.addEventListener(d.transitionEvent, self.modalHidden);
        }
        d.addListener(this.instanceRoot.id, 'keydown', function (ev: KeyboardEvent) {
            if (ev.key == 'Escape') {
                self.hide(true);
            }
        });
        let ths = this;
        d.addListener(this.instanceRoot.id, 'click', function (ev: MouseEvent) {
            // @ts-ignore
            if ((ev.target.classList.value == ths.underlayClass)) {
                self.hide(true);
            }
        });
    }

    blanketHidden(event): void {
        // Do something when the transition ends
        let blanket: HTMLElement;
        blanket = d.getElementById('blanket');
        if (event.animationName == 'fadeOut') {
            blanket.removeEventListener(d.transitionEvent, this.blanketHidden);
            blanket.remove();
            // this.isOverlayOn = false;
        }
    }

    align(): void {
        d.lfn('align');
        if (!this.disableUnderlay) {
            d.addClass(this.instanceRoot, this.parentSizingClass);
        }
        d.centereStage(this.instance);
        if (!this.disableUnderlay) {
            //@todo d.removeClass(this.instanceRoot,this.parentSizingClass);
        }
    }

    private modalHidden(event): void {
        // Do something when the transition ends
        if (event.animationName == 'zoomOut') {
            this.instanceRoot.classList.add('d-none');
            this.instanceRoot.classList.remove('zoomOut');
            this.instanceRoot.removeEventListener(d.transitionEvent, this.modalHidden);
        }
    }

    static auto(modalClass: string = 'dsynrModal'): void {
        d.lfn('auto');
        d.makeArray(d.getElementsByClass(modalClass)).forEach(function (instance) {
            new DsynrModal(instance);
        });
    }
}