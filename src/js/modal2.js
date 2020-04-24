class modal {
    constructor(modalContent, options = null) {
        lfn('constructor-modal');
        let alignmentClasses = 'top left';
        let positionClasses = 'position-absolute';
        this.animate = addProp(this, 'animate', true);
        this.isOverlayOn = addProp(this, 'isOverlayOn', false);
        this.useOverlay = addProp(this, 'useOverlay', true);
        this.disableUnderlay = addProp(this, 'disableUnderlay', true);
        this.suffix = addProp(this, 'suffix', totModals.toString());
        this.prefix = addProp(this, 'prefix', 'dsynrModal');
        this.animationClasses = addProp(this, 'animationClasses', 'animated fadeIn');
        this.overlayClasses = addProp(this, 'overlayClasses', 'o05 bg-dark');
        this.underlayClasses = addProp(this, 'underlayClasses', this.stringup([positionClasses, alignmentClasses, 'z1 wmax hmax']));
        this.modalClasses = addProp(this, 'modalClasses', this.stringup([positionClasses, 'z2']));
        this.rootClasses = addProp(this, 'rootClasses', 'z3 o0');
        this.content = modalContent;
        this.updateOptions(options);
        this.setup();
        this.showModal();
    }
    setup() {
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
        this.modal = addDiv(this.setName('modal', this.context.id), this.modalClasses, this.root);
        if (this.animate) {
            curModal.addEventListener(transitionEvent, this.modalHidden);
        }
        window.addEventListener('resize', this.align);
        this.modal.appendChild(this.content);
        this.align();
        this.setActive();
    }
    setActive() {
        activeModal = this.root;
        this.content.focus();
    }
    setName(context, n) {
        return this.stringup([this.prefix, context, this.suffix], '-');
    }
    stringup(strings, seperator = ' ') {
        return strings.join(seperator);
    }
    updateOptions(options) {
        lfn('updateOptions');
        let preferences = getData(this.content, 'dsynr-options');
        if (preferences !== null) {
            options = JSON.parse(preferences);
        }
        else if (options !== null) {
            updateProps(this, options);
        }
        l(this);
    }
    showBlanket() {
        let blanket;
        blanket = addDiv('blanket', this.overlayClasses, document.body);
        addDiv('blanketcoat', this.underlayClasses, blanket);
        blanket.classList.remove('o0');
        blanket.addEventListener(transitionEvent, blanketHidden);
        this.isOverlayOn = true;
    }
    hideBlanket() {
        let blanket;
        blanket = getElementById('blanket');
        blanket.classList.remove('fadeIn');
        blanket.classList.add('fadeOut');
    }
    blanketHidden(event) {
        let blanket;
        blanket = getElementById('blanket');
        if (event.animationName == 'fadeOut') {
            blanket.removeEventListener(transitionEvent, blanketHidden);
            blanket.remove();
            this.isOverlayOn = false;
        }
    }
    showModal() {
        if (this.useOverlay) {
            this.showBlanket();
        }
        totModals++;
    }
    closeCurModal() {
        if (this.isOverlayOn) {
            this.hideBlanket();
            curModal.classList.remove('zoomIn');
            curModal.classList.add('zoomOut');
        }
    }
    align() {
        if (this.isOverlayOn) {
            centereStage(this.modal);
        }
    }
    modalHidden(event) {
        if (event.animationName == 'zoomOut') {
            curModal.classList.add('d-none');
            curModal.classList.remove('zoomOut');
            curModal.removeEventListener(transitionEvent, this.modalHidden);
        }
    }
}
function autoModalize(modalClass = 'dsynrModal') {
    lfn('autoModalize');
    makeArray(getElementsByClass(modalClass)).forEach(function (mdl, index) {
        mdl.style.display = 'none';
        l(getData(mdl, 'dsynr-options'));
        let modl = new modal(mdl);
        modals.push(mdl);
    });
}
let activeModal, totModals = 0, modals;
