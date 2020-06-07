/**
 *
 * @param val
 * @param unit
 */
function getCssDimension(val, unit = 'px') {
    return val + unit;
}
function randRadius() {
    return getRandomArbitrary(5, 150);
}
function randWidth() {
    return getRandomArbitrary(2, 15);
}
/**
 *
 * @param e
 */
function getDimensions(e) {
    return { w: e.clientWidth, h: e.clientHeight };
}
/**
 *
 * @param e
 */
function hide(e) {
    e.style.display = 'none';
}
/**
 *
 * @param e
 * @param classes
 */
function addClass(e, classes) {
    e.classList.add(...classes.split(' '));
}
/**
 *
 * @param e
 * @param classes
 */
function removeClass(e, classes) {
    e.classList.remove(...classes.split(' '));
}
/**
 *
 * @param e
 * @param classes
 */
function hasClass(e, classes) {
    return e.classList.contains(classes);
}
//# sourceMappingURL=css.js.map