function getPercentage(x, percent): number {
    return (x * percent) / 100;
}

function getRandFloor(min: number = 0, max: number = 255): number {
    return getRandDecimal(min, max, 0);
}

function getRandNum(min: number = 0, max: number = 255): number {
    return Math.round(getRandDecimal(min, max, 0));
}

function getRandDecimal(min: number = 0, max: number = 1, precision: number = 2): number {
    return parseFloat((Math.random() * (max - min) + min).toFixed(precision));
}

function getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}