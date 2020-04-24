class modal extends DsynrUIIElement {
    parent: HTMLElement;
    itself: HTMLElement;
    content: HTMLElement;
    root: HTMLElement;
    namePrefix: string;
    nameSuffix: string;

    show() {
        this.content.style.display = '';
        this.root.classList.remove('o0');
        totalModals++;
    }

    hide() {
        if (this.isOverlayOn) {
            this.hideBlanket();
            activeModal.classList.remove('zoomIn');
            activeModal.classList.add('zoomOut');
        }
    }

    destroy() {
        throw new Error("Method not implemented.");
    }

    protected defaults() {
        lfn('setDefaultOptions');

        let positionClasses: string = 'position-absolute top left';

        this.context = addProp(this, 'context', document.body);
        this.animate = addProp(this, 'animate', true);
        this.isOverlayOn = addProp(this, 'isOverlayOn', false);
        this.useOverlay = addProp(this, 'useOverlay', true);
        this.disableUnderlay = addProp(this, 'disableUnderlay', true);
        this.nameSuffix = addProp(this, 'nameSuffix', totalModals.toString());
        this.namePrefix = addProp(this, 'namePrefix', 'dsynrModal');
        this.animationClasses = addProp(this, 'animationClasses', 'animated fadeIn');
        this.overlayClasses = addProp(this, 'overlayClasses', 'o50 bg-dark');
        this.underlayClasses = addProp(this, 'underlayClasses', this.stringup([positionClasses, 'z1 wmax hmax']));
        this.modalClasses = addProp(this, 'modalClasses', this.stringup([positionClasses, 'z2']));
        this.rootClasses = addProp(this, 'rootClasses', this.stringup([positionClasses, 'z3 o0']));
    }

    updatePref(preferences: object) {
        lfn('updatePref');

        let options: any = getData(this.content, 'dsynr-options');
        if (options !== null) {
            preferences = JSON.parse(options);
        } else if (Object.keys(preferences).length > 0) {
            updateProps(this, preferences);
        }
    }

    protected setup() {
        lfn('setup');

        if (this.animate) {
            this.modalClasses = this.stringup([this.modalClasses, this.animationClasses]);
            this.rootClasses = this.stringup([this.rootClasses, this.animationClasses]);
        }

        this.root = addDiv(this.setName('root', this.content.id), this.rootClasses, this.context);

        if (this.disableUnderlay) {
            this.root.style.width = getCssDimension(this.context.clientWidth);
            this.root.style.height = getCssDimension(this.context.clientHeight);

            if (this.useOverlay) {
                this.underlayClasses = this.stringup([this.underlayClasses, this.overlayClasses]);
            }

            this.underlay = addDiv(this.setName('underlay', this.content.id), this.underlayClasses, this.root);
        }

        this.itself = addDiv(this.setName('modal', this.context.id), this.modalClasses, this.root);
        //addListener('xModal', 'click', this.hide);
        if (this.animate) {
            this.itself.addEventListener(transitionEvent, this.modalHidden);
        }
        //update to detect parent (context) resizing opposed to just window
        window.addEventListener('resize', this.align);
        this.itself.appendChild(this.content);
        this.align();
        this.setActive();
    }

    protected setActive() {
        activeModal = this.root;
        this.content.focus();
    }

    protected context: HTMLElement;
    protected underlay: HTMLElement;

    protected rootClasses: string;
    protected modalClasses: string;
    protected underlayClasses: string;
    protected overlayClasses: string;
    protected animationClasses: string;

    protected prefix: string;
    protected suffix: string;

    protected disableUnderlay: boolean;
    protected useOverlay: boolean;
    protected isOverlayOn: boolean;
    protected animate: boolean;

    constructor(modalContent: HTMLElement, preferences: object = {}) {
        super();
        lfn('constructor-modal');

        this.content = modalContent;

        this.defaults();
        this.updatePref(preferences);
        this.setup();
        this.show();
    }

    protected stringup(strings: Array<any>, seperator: string = ' '): string {
        return strings.join(seperator);
    }

    showBlanket(): void {
        let blanket: HTMLElement;
        blanket = addDiv('blanket', this.overlayClasses, document.body);
        addDiv('blanketcoat', this.underlayClasses, blanket);
        blanket.classList.remove('o0');
        blanket.addEventListener(transitionEvent, this.blanketHidden);
        this.isOverlayOn = true;
    }

    hideBlanket() {
        let blanket: HTMLElement;
        blanket = getElementById('blanket');
        blanket.classList.remove('fadeIn');
        blanket.classList.add('fadeOut');
    }

    blanketHidden(event) {
        // Do something when the transition ends
        let blanket: HTMLElement;
        blanket = getElementById('blanket');
        if (event.animationName == 'fadeOut') {
            blanket.removeEventListener(transitionEvent, this.blanketHidden);
            blanket.remove();
            this.isOverlayOn = false;
        }
    }

    protected align() {
        if (this.isOverlayOn) {
            centereStage(this.itself);
        }
    }

    protected modalHidden(event) {
        // Do something when the transition ends
        if (event.animationName == 'zoomOut') {
            activeModal.classList.add('d-none');
            activeModal.classList.remove('zoomOut');
            activeModal.removeEventListener(transitionEvent, this.modalHidden);
        }
    }
}

function autoModalize(modalClass: string = 'dsynrModal') {
    lfn('autoModalize');
    makeArray(getElementsByClass(modalClass)).forEach(function (mdl, index) {
        mdl.style.display = 'none';
        l(getData(mdl, 'dsynr-options'));
        let modl = new modal(mdl);
        modals.push(mdl);
    });
}

let activeModal: HTMLElement, totalModals: number = 0, modals: Array<modal> = [];
