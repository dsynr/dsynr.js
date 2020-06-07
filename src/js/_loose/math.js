function getPercentage(x, percent) {
    return (x * percent) / 100;
}
function getRandFloor(min = 0, max = 255) {
    return getRandDecimal(min, max, 0);
}
function getRandNum(min = 0, max = 255) {
    return Math.round(getRandDecimal(min, max, 0));
}
function getRandDecimal(min = 0, max = 1, precision = 2) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(precision));
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
//# sourceMappingURL=math.js.map