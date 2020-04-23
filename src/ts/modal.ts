function showBlanket() {
    let blanket: HTMLElement = addDiv('blanket', 'z2 position-fixed top left vw vh o0 animated fadeIn', document.body);
    addDiv('blanketcoat', 'position-absolute top left vw vh bg-dark o05', blanket);
    blanket.classList.remove('o0');
    blanket.addEventListener(transitionEvent, blanketHidden);
    isBlanketOn = true;
}

function hideBlanket() {
    let blanket: HTMLElement = getElementById('blanket');
    blanket.classList.remove('fadeIn');
    blanket.classList.add('fadeOut');
}

function blanketHidden(event) {
    // Do something when the transition ends
    let blanket: HTMLElement = getElementById('blanket');
    if (event.animationName == 'fadeOut') {
        blanket.removeEventListener(transitionEvent, blanketHidden);
        blanket.remove();
        isBlanketOn = false;
    }
}

function showAsModal(e: HTMLElement): void {
    if (!isBlanketOn) {
        showBlanket();
        let mid: string = 'dsynrModal-' + e.id;
        addDiv(mid, 'curModal position-absolute z3 animated zoomIn', document.body);
        curModal = getElementById(mid);
        curModal.append(e);
        alignCurModal();
        curModal.focus();
        addModalListeners();
    } else {
        alert('MULTI-MODALS NOT YET ENABLED');
    }
}

function closeCurModal(): void {
    if (isBlanketOn) {
        hideBlanket();
        curModal.classList.remove('zoomIn');
        curModal.classList.add('zoomOut');
    }
}

function alignCurModal() {
    if (isBlanketOn) {
        centereStage(curModal);
    }
}

function addModalListeners() {
    window.addEventListener('resize', alignCurModal);
    addListener('xModal', 'click', closeCurModal);
    curModal.addEventListener(transitionEvent, modalHidden);
}

function modalHidden(event) {
    // Do something when the transition ends
    if (event.animationName == 'zoomOut') {
        curModal.classList.add('d-none');
        curModal.classList.remove('zoomOut');
        curModal.removeEventListener(transitionEvent, modalHidden);
    }
}

let isBlanketOn: boolean = false, curModal: HTMLElement;//
