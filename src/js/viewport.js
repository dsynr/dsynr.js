function centereStage(e) {
    let dimensions = getDimensions(e);
    e.style.marginTop = -(dimensions.h) / 2 + 'px';
    e.style.marginLeft = -(dimensions.w) / 2 + 'px';
    e.style.top = '50%';
    e.style.left = '50%';
}
function getBounds(e) {
    return e.getBoundingClientRect();
}
function isInViewportSlightly(e) {
    let bounding = getBounds(e);
    return (bounding.top >= 0);
}
function isInViewportMostly(e) {
    let bounding = getBounds(e);
    return (bounding.top / 2 > -bounding.top);
}
