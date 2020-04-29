/**
 *
 * @param val
 * @param unit
 */
function getCssDimension(val: number, unit: string = 'px'): string {
    return val + unit;
}

function randRadius(): number {
    return getRandomArbitrary(5, 150);
}

function randWidth(): number {
    return getRandomArbitrary(2, 15);
}

/**
 *
 * @param e
 */
function getDimensions(e: HTMLElement): any {
    return {w: e.clientWidth, h: e.clientHeight};
}

/**
 *
 * @param e
 */
function hide(e: HTMLElement): void {
    e.style.display = 'none';
}

/**
 *
 * @param e
 * @param classes
 */
function addClass(e: HTMLElement, classes: string): void {
    e.classList.add(...classes.split(' '));
}

/**
 *
 * @param e
 * @param classes
 */
function removeClass(e: HTMLElement, classes: string): void {
    e.classList.remove(...classes.split(' '));
}

/**
 *
 * @param e
 * @param classes
 */
function hasClass(e: HTMLElement, classes: string): boolean {
    return e.classList.contains(classes);
}