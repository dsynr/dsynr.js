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

function addClass(e: HTMLElement, classes: string): void {
    e.classList.add(classes);
}

function removeClass(e: HTMLElement, classes: string): void {
    e.classList.remove(classes);
}

function hasClass(e: HTMLElement, classes: string): boolean {
    return e.classList.contains(classes);
}
