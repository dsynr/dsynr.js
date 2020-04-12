function cssDimension(val: number, unit: string = 'px'): string {
    return val + unit;
}

function randRadius(): number {
    return getRandomArbitrary(5, 150);
}

function randWidth(): number {
    return getRandomArbitrary(2, 15);
}

function getDimensions(e: HTMLElement): any {
    return {w: e.clientWidth, h: e.clientHeight};
}

function hide(e: HTMLElement): void {
    e.style.display = 'none';
}