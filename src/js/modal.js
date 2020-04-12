function showBlanket() {
    let blanket = addDiv('blanket', 'z2 position-fixed top left vw vh o0 animated fadeIn', document.body);
    addDiv('blanketcoat', 'position-absolute top left vw vh bg-gradient-dark o85', blanket);
    blanket.classList.remove('o0');
    blanket.addEventListener(transitionEvent, blanketHidden);
    isBlanketOn = true;
}
function hideBlanket() {
    let blanket = getElementById('blanket');
    blanket.classList.remove('fadeIn');
    blanket.classList.add('fadeOut');
}
function blanketHidden(event) {
    let blanket = getElementById('blanket');
    if (event.animationName == 'fadeOut') {
        blanket.removeEventListener(transitionEvent, blanketHidden);
        blanket.remove();
        isBlanketOn = false;
    }
}
function showAsModal(e) {
    if (!isBlanketOn) {
        showBlanket();
        curModal = e;
        curModal.classList.remove('zoomOut');
        curModal.classList.add('zoomIn');
        curModal.classList.remove('d-none');
        alignCurModal();
        curModal.focus();
        addModalListeners();
    }
    else {
        alert('MULTI-MODALS NOT YET ENABLED');
    }
}
function closeCurModal() {
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
    if (event.animationName == 'zoomOut') {
        curModal.classList.add('d-none');
        curModal.classList.remove('zoomOut');
        curModal.removeEventListener(transitionEvent, modalHidden);
    }
}
let isBlanketOn = false, curModal;
