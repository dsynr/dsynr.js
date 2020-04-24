class modal {

    private root: HTMLElement;
    private context: HTMLElement;
    private content: HTMLElement;
    private modal: HTMLElement;
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

    constructor(modalContent: HTMLElement, options: object | null) {
        this.content = modalContent;
        this.updateOptions(options);
        this.setup();
        this.showModal();
    }

    private setup() {

        if (this.animate) {
            this.modalClasses = this.stringup([this.modalClasses, this.animationClasses]);
            this.underlayClasses = this.stringup([this.underlayClasses, this.animationClasses]);
        }

        if (this.disableUnderlay) {
            this.root.style.width = getCssDimension(this.context.clientWidth);
            this.root.style.height = getCssDimension(this.context.clientHeight);

            if (this.useOverlay) {
                this.underlayClasses = this.stringup([this.underlayClasses, this.overlayClasses]);
            }

            this.underlay = addDiv(this.setName('underlay', this.content.id), this.underlayClasses, this.root);
        }

        this.root = addDiv(this.setName('root', this.content.id), this.rootClasses, this.context);
        this.modal = addDiv(this.setName('modal', this.context.id), this.modalClasses, this.root);
    }

    private setName(context: string, n: string): string {
        return this.stringup([this.prefix, context, this.suffix], '-');
    }

    private stringup(strings: Array<any>, seperator: string = ' '): string {
        return strings.join(seperator);
    }

    public updateOptions(options: object | null) {
        let alignmentClasses: string = 'top left';
        let positionClasses: string = 'position-absolute';
        if (options === null) {
            for (let prop in this) {
                if (this[prop] === undefined) {
                    switch (prop) {
                        case 'animate':
                            this.animate = true;
                            break;
                        case 'animationClasses':
                            this.animationClasses = 'animated fadeIn';
                            break;
                        case 'context':
                            this.context = document.body;
                            break;
                        case 'disableUnderlay':
                            this.disableUnderlay = true;
                            break;
                        case 'modalClasses':
                            this.modalClasses = this.stringup([positionClasses, 'z2']);
                            break;
                        case 'overlayClasses':
                            this.overlayClasses = 'o05 bg-dark';
                            break;
                        case 'prefix':
                            this.prefix = 'dsynrModal';
                            break;
                        case 'rootClasses':
                            this.rootClasses = 'z3 o0';
                            break;
                        case 'suffix':
                            this.suffix = totModals.toString();
                            break;
                        case 'underlayClasses':
                            this.underlayClasses = this.stringup([positionClasses, alignmentClasses, 'z1 wmax hmax']);
                            break;
                        case 'useOverlay':
                            this.useOverlay = this.disableUnderlay;
                            break;
                    }
                }
            }
        } else {
            updateProps(this, options);
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
        if (this.useOverlay) {
            this.showBlanket();
        }
        let mid: string;
        mid = 'dsynrModal-' + this.content.id;
        addDiv(mid, 'curModal position-absolute z3 animated zoomIn', document.body);
        curModal = getElementById(mid);
        curModal.append(this.content);
        this.alignCurModal();
        curModal.focus();
        this.addModalListeners();
        totModals++;
    }

    closeCurModal(): void {
        if (this.isOverlayOn) {
            this.hideBlanket();
            curModal.classList.remove('zoomIn');
            curModal.classList.add('zoomOut');
        }
    }

    alignCurModal() {
        if (this.isOverlayOn) {
            centereStage(curModal);
        }
    }

    addModalListeners() {
        window.addEventListener('resize', this.alignCurModal());
        addListener('xModal', 'click', this.closeCurModal());
        curModal.addEventListener(transitionEvent, this.modalHidden());
    }

    modalHidden(event) {
        // Do something when the transition ends
        if (event.animationName == 'zoomOut') {
            curModal.classList.add('d-none');
            curModal.classList.remove('zoomOut');
            curModal.removeEventListener(transitionEvent, this.modalHidden());
        }
    }
}

let activeModal: HTMLElement, totModals: number = 0;
