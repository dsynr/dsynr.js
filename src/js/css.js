function cssDimension(val, unit = 'px') {
    return val + unit;
}
function randRadius() {
    return getRandomArbitrary(5, 150);
}
function randWidth() {
    return getRandomArbitrary(2, 15);
}
function getDimensions(e) {
    return { w: e.clientWidth, h: e.clientHeight };
}
function hide(e) {
    e.style.display = 'none';
}
function addClass(e, classes) {
    e.classList.add(classes);
}
function removeClass(e, classes) {
    e.classList.remove(classes);
}
function hasClass(e, classes) {
    return e.classList.contains(classes);
}
