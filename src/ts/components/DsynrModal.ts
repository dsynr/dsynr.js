///<reference path="../Dsynr.ts"/>
class DsynrModal extends DsynrUIIElement {

    private instanceRoot: HTMLElement;
    private underlay: HTMLElement;

    private onModalDestroy: Function;

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
    private respectBounds: boolean;

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

    setup(): void {
        d.lfn('setup');

        let self: DsynrModal = this;
        d.addClass(this.content, 'd-none');
        if (this.trigger != 'auto') {
            console.log('setting trigger to : ' + this.trigger);
            d.addListener(this.trigger, 'click', function () {
                self.show();
            });
            console.log('Modal Trigger READY!');
        } else {
            console.log('Triggering Automatically...');
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
            } else {
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

    attention(): void {
        d.lfn('attention');
        this.animateDisplay(true);
    }

    private animateDisplay(getAttention: boolean = false): void {
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
                } else {
                    console.log('NOT getAttention..');
                    d.addClass(this.instanceRoot, this.animateClass + d.conf.ani.styles.fadeIn);
                    d.addClass(this.instance, this.animateClass + d.conf.ani.styles.fadeIn);


                    // d.removeClass(this.instanceRoot, 'o0');
                    // d.removeClass(this.instance, 'o0');
                }

            } else {
                if (getAttention) {
                    //@todo
                    console.log('getting Attention.....');
                } else {
                    d.removeClass(this.instanceRoot, 'o0');
                    d.removeClass(this.instance, 'o0');
                }
            }

        } else {
            //@todo animate one after other
            console.log('animate one after other...');
        }
    }

    hide(destroy: boolean = this.autoDestroy): void {
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
        let ths = this;
        if (this.animate) {
            console.log('enabling animation');
            this.instance.addEventListener(d.transitionEvent, ths.modalHidden);
            // this.instance.addEventListener(d.transitionEvent, ths.modalHidden);
        }
        d.addListener(this.instanceRoot.id, 'keydown', function (ev: KeyboardEvent) {
            if (ev.key == 'Escape') {
                ths.hide(ths.autoDestroy);
            }
        });
        d.addListener(this.instanceRoot.id, 'click', function (ev: MouseEvent) {
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