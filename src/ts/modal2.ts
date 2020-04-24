class modalr {

    private root: HTMLElement;
    private context: HTMLElement;
    private content: HTMLElement;
    private theModal: HTMLElement;
    private underlay: HTMLElement;

    private rootClasses: string;
    private modalClasses: string;
    private underlayClasses: string;
    private overlayClasses: string;
    private animationClasses: string;

    private prefix: string;
    private suffix: string;

    private disableUnderlay: boolean;
    private useOverlay: boolean;
    private isOverlayOn: boolean;
    private animate: boolean;

    constructor(modalContent: HTMLElement, preferences: object | null = null) {
        lfn('constructor-modal');

        this.content = modalContent;

        this.setDefaults();
        this.updatePreferences(preferences);
        this.setup();
        this.showModal();
    }

    private setDefaults() {
        lfn('setDefaultOptions');

        let positionClasses: string = 'position-absolute top left';

        this.context = addProp(this, 'context', document.body);
        this.animate = addProp(this, 'animate', true);
        this.isOverlayOn = addProp(this, 'isOverlayOn', false);
        this.useOverlay = addProp(this, 'useOverlay', true);
        this.disableUnderlay = addProp(this, 'disableUnderlay', true);
        this.suffix = addProp(this, 'suffix', totModals.toString());
        this.prefix = addProp(this, 'prefix', 'dsynrModal');
        this.animationClasses = addProp(this, 'animationClasses', 'animated fadeIn');
        this.overlayClasses = addProp(this, 'overlayClasses', 'o05 bg-dark');
        this.underlayClasses = addProp(this, 'underlayClasses', this.stringup([positionClasses, 'z1 wmax hmax']));
        this.modalClasses = addProp(this, 'modalClasses', this.stringup([positionClasses, 'z2']));
        this.rootClasses = addProp(this, 'rootClasses', this.stringup([positionClasses, 'z3 o0']));
    }

    private setup() {
        lfn('setup');

        if (this.animate) {
            this.modalClasses = this.stringup([this.modalClasses, this.animationClasses]);
            this.underlayClasses = this.stringup([this.underlayClasses, this.animationClasses]);
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

        this.theModal = addDiv(this.setName('modal', this.context.id), this.modalClasses, this.root);
        //addListener('xModal', 'click', this.closeCurModal());
        if (this.animate) {
            this.theModal.addEventListener(transitionEvent, this.modalHidden);
        }
        //update to detect parent (context) resizing opposed to just window
        window.addEventListener('resize', this.align);
        this.theModal.appendChild(this.content);
        this.align();
        this.setActive();
    }

    private setActive() {
        activeModal = this.root;
        this.content.focus();
    }

    private setName(context: string, n: string): string {
        return this.stringup([this.prefix, context, this.suffix], '-');
    }

    private stringup(strings: Array<any>, seperator: string = ' '): string {
        return strings.join(seperator);
    }

    public updatePreferences(preferences: object | null) {
        lfn('updateOptions');

        let options: any = getData(this.content, 'dsynr-options');
        if (options !== null) {
            preferences = JSON.parse(options);
        } else if (preferences !== null) {
            updateProps(this, preferences);
        }
    }

    showBlanket(): void {
        let blanket: HTMLElement;
        blanket = addDiv('blanket', this.overlayClasses, document.body);
        addDiv('blanketcoat', this.underlayClasses, blanket);
        blanket.classList.remove('o0');
        blanket.addEventListener(transitionEvent, blanketHidden);
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
            blanket.removeEventListener(transitionEvent, blanketHidden);
            blanket.remove();
            this.isOverlayOn = false;
        }
    }

    showModal(): void {
        this.content.style.display = '';
        this.root.classList.remove('o0');
        totModals++;
    }

    closeCurModal(): void {
        if (this.isOverlayOn) {
            this.hideBlanket();
            curModal.classList.remove('zoomIn');
            curModal.classList.add('zoomOut');
        }
    }

    align() {
        if (this.isOverlayOn) {
            centereStage(this.theModal);
        }
    }

    modalHidden(event) {
        // Do something when the transition ends
        if (event.animationName == 'zoomOut') {
            curModal.classList.add('d-none');
            curModal.classList.remove('zoomOut');
            curModal.removeEventListener(transitionEvent, this.modalHidden);
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

let activeModal: HTMLElement, totModals: number = 0, modals: Array<modal> = [];
