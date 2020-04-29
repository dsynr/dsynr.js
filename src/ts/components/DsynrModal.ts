class DsynrModal extends DsynrUIIElement {

    private instanceRoot: HTMLElement;
    private underlay: HTMLElement;
    private trigger: string; //"auto" => automatically shows as soon as instantiated
    private rootClasses: string;
    private underlayClasses: string;
    private overlayClasses: string;
    private disableUnderlay: boolean;
    private useOverlay: boolean;
    private isOverlayOn: boolean;
    private adoptParent: boolean;
    private animateTogether: boolean;
    private modalAnimate: boolean;
    private modalAnimationClasses: string;

    constructor(modalContent: HTMLElement, preferences: object = {}) {
        super(modalContent, preferences);
        if (!this.selfAbort) {
            lfn('DsynrModal');
            this.setDefaults();
            this.setup();
        }
    }

    setDefaults(reset: boolean = false): void {
        lfn('setDefaults');

        let positionClasses: string = 'position-absolute';
        let alignmentClasses: string = 'top left';

        this.adoptParent = addProp(this, 'adoptParent', true, reset);
        this.animate = addProp(this, 'animate', true, reset);
        this.modalAnimate = addProp(this, 'modalAnimate', true, reset);
        this.animateTogether = addProp(this, 'animateTogether', true, reset);
        this.isOverlayOn = addProp(this, 'isOverlayOn', false, reset);
        this.useOverlay = addProp(this, 'useOverlay', true, reset);
        this.disableUnderlay = addProp(this, 'disableUnderlay', true, reset);
        this.nameSuffix = addProp(this, 'nameSuffix', DsynrModal.instances.length.toString(), reset);
        this.namePrefix = addProp(this, 'namePrefix', 'dsynrModal', reset);
        this.animationClasses = addProp(this, 'animationClasses', 'animated fadeInDown', reset);
        this.modalAnimationClasses = addProp(this, 'modalAnimationClasses', 'animated flipInX', reset);
        this.overlayClasses = addProp(this, 'overlayClasses', 'o50 bg-dark', reset);
        this.underlayClasses = addProp(this, 'underlayClasses', concatStr([positionClasses, alignmentClasses, 'z1 wmax hmax']), reset);
        this.instanceClasses = addProp(this, 'instanceClasses', concatStr([positionClasses, 'z2']), reset);
        this.rootClasses = addProp(this, 'rootClasses', concatStr([positionClasses, alignmentClasses, 'z3 o0 d-none']), reset);
        this.trigger = addProp(this, 'trigger', 'auto', reset);
    }

    setup(): void {
        lfn('setup');

        let self: DsynrModal = this;
        if (this.trigger != 'auto') {
            l('setting trigger to : ' + this.trigger);
            addListener(this.trigger, 'click', function () {
                self.show();
            });
            l('Modal Trigger READY!');
        } else {
            l('Triggering Automatically...');
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
            lfn('show triggered via : ' + this.trigger);
            l(this);

            if (this.parent === undefined) {
                l('parent unavailable, adding modal to body');
                this.parent = document.body;
            }
            this.instanceRoot = addDiv(this.setName('root', this.content.id), this.rootClasses, this.parent);

            if (this.disableUnderlay) {
                this.resizeRoot();

                if (this.useOverlay) {
                    this.underlayClasses = concatStr([this.underlayClasses, this.overlayClasses]);
                }

                this.underlay = addDiv(this.setName('underlay', this.content.id), this.underlayClasses, this.instanceRoot);
            }

            this.instance = addDiv(this.setName('modal', this.parent.id), this.instanceClasses, this.instanceRoot);

            this.addListeners();
            //update to detect parent (parent) resizing opposed to just window
            this.instance.appendChild(this.content);
            // window.addEventListener('resize', function () {
            //     modals[modals.length].align();
            // });


            removeClass(this.instanceRoot, 'd-none');

            l(this.parent.id);
            if (this.adoptParent && (this.content.clientHeight > this.parent.clientHeight || this.content.clientWidth > this.parent.clientWidth)) {
                lfn('adoptParent');
                l('parent cannot accommodate child, adopting body as parent!');
                this.parent = document.body;
                this.parent.append(this.instanceRoot);
                this.resizeRoot();
            }

            this.align();
            if (this.animate) {
                addClass(this.instanceRoot, this.animationClasses);
                if (this.animateTogether) {
                    addClass(this.instance, this.modalAnimationClasses);
                } else {
                    //@todo animationEnd
                }
            } else {
                removeClass(this.instanceRoot, 'o0');
            }
            this.setActive();
        }
    }

    private resizeRoot() {
        this.instanceRoot.style.width = getCssDimension(this.parent.clientWidth);
        this.instanceRoot.style.height = getCssDimension(this.parent.clientHeight);
    }

    hide(): void {
        lfn('hide');
        if (this.isOverlayOn) {
            this.hideBlanket();
            removeClass(this.instanceRoot, 'zoomIn');
            addClass(this.instanceRoot, 'zoomOut');
        }
    }

    destroy(): void {
        throw new Error("Method not implemented.");
    }

    setActive(): void {
        lfn('setActive');
        this.instanceRoot = this.instanceRoot;
        this.content.focus();
        DsynrModal.activeInstance = this;
    }

    addListeners() {
        lfn('addListeners');
        let self: DsynrModal = this;
        if (this.animate) {
            l('enabling animation');
            this.instance.addEventListener(transitionEvent, self.modalHidden);
        }
    }

    showBlanket(): void {
        let blanket: HTMLElement;
        blanket = addDiv('blanket', this.overlayClasses, document.body);
        addDiv('blanketcoat', this.underlayClasses, blanket);
        blanket.classList.remove('o0');
        blanket.addEventListener(transitionEvent, this.blanketHidden);
        this.isOverlayOn = true;
    }

    hideBlanket(): void {
        let blanket: HTMLElement;
        blanket = getElementById('blanket');
        blanket.classList.remove('fadeIn');
        blanket.classList.add('fadeOut');
    }

    blanketHidden(event): void {
        // Do something when the transition ends
        let blanket: HTMLElement;
        blanket = getElementById('blanket');
        if (event.animationName == 'fadeOut') {
            blanket.removeEventListener(transitionEvent, this.blanketHidden);
            blanket.remove();
            this.isOverlayOn = false;
        }
    }

    align(): void {
        lfn('align');
        centereStage(this.instance);
    }

    private modalHidden(event): void {
        // Do something when the transition ends
        if (event.animationName == 'zoomOut') {
            this.instanceRoot.classList.add('d-none');
            this.instanceRoot.classList.remove('zoomOut');
            this.instanceRoot.removeEventListener(transitionEvent, this.modalHidden);
        }
    }

    static auto(modalClass: string = 'dsynrModal'): void {
        lfn('auto');
        makeArray(getElementsByClass(modalClass)).forEach(function (instance) {
            new DsynrModal(instance);
        });
    }
}