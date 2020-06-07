function getRandColour(): string {
    return '#' + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6);
}

function getRandColourRGBA(maxO: number = 1, maxR: number = 255, maxG: number = 255, maxB: number = 255): string {
    return 'rgba(' + getRandFloor(0, maxR) + ',' + getRandFloor(0, maxG) + ',' + getRandFloor(0, maxB) + ',' + getRandDecimal(0, maxO) + ')';
}