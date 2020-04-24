function centereStage(e: HTMLElement): void {
    let dimensions = getDimensions(e);
    e.style.marginTop = -(dimensions.h) / 2 + 'px';
    e.style.marginLeft = -(dimensions.w) / 2 + 'px';
    e.style.top = '50%';
    e.style.left = '50%';
}

function updateViewportVars(): void {
    vw = window.innerWidth;
    vh = window.innerHeight;
}

function getBounds(e: HTMLElement): ClientRect {
    return e.getBoundingClientRect();
}

function isInViewportSlightly(e: HTMLElement): boolean {
    let bounding = getBounds(e);
    return (
        bounding.top >= 0 //&&
        // bounding.left >= 0 &&
        // bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        // bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function isInViewportMostly(e): boolean {
    let bounding = getBounds(e);
    return (bounding.top / 2 > -bounding.top);
    // return (getPercentage((e.clientHeight + bounding.top), 50) > -bounding.top);
}

let vw: number, vh: number;
