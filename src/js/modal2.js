class modal extends DsynrUIIElement {
    constructor(modalContent, preferences = {}) {
        super();
        lfn('constructor-modal');
        this.content = modalContent;
        this.defaults();
        this.updatePref(preferences);
        this.setup();
        this.show();
    }
    show() {
        this.content.style.display = '';
        this.root.classList.remove('o0');
        totModals++;
    }
    hide() {
        throw new Error("Method not implemented.");
    }
    destroy() {
        throw new Error("Method not implemented.");
    }
    defaults() {
        lfn('setDefaultOptions');
        let positionClasses = 'position-absolute top left';
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
    updatePref(preferences) {
        lfn('updatePref');
        let options = getData(this.content, 'dsynr-options');
        if (options !== null) {
            preferences = JSON.parse(options);
        }
        else if (Object.keys(preferences).length > 0) {
            updateProps(this, preferences);
        }
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
        this.theModal = addDiv(this.setName('modal', this.context.id), this.modalClasses, this.root);
        if (this.animate) {
            this.theModal.addEventListener(transitionEvent, this.modalHidden);
        }
        window.addEventListener('resize', this.align);
        this.theModal.appendChild(this.content);
        this.align();
        this.setActive();
    }
    setActive() {
        activeModal = this.root;
        this.content.focus();
    }
    stringup(strings, seperator = ' ') {
        return strings.join(seperator);
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
    closeCurModal() {
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
let activeModal, totModals = 0, modals = [];
