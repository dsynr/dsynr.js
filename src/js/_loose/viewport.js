function centereStage(e) {
    let dimensions = getDimensions(e);
    e.style.marginTop = getCssDimension(-(dimensions.h) / 2);
    e.style.marginLeft = getCssDimension(-(dimensions.w) / 2);
    e.style.top = '50%';
    e.style.left = '50%';
}
function updateViewportVars() {
    vw = window.innerWidth;
    vh = window.innerHeight;
}
function getBounds(e) {
    return e.getBoundingClientRect();
}
function isInViewportSlightly(e) {
    let bounding = getBounds(e);
    return (bounding.top >= 0 //&&
    // bounding.left >= 0 &&
    // bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    // bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
function isInViewportMostly(e) {
    let bounding = getBounds(e);
    return (bounding.top / 2 > -bounding.top);
    // return (getPercentage((e.clientHeight + bounding.top), 50) > -bounding.top);
}
let vw, vh;
//# sourceMappingURL=viewport.js.map