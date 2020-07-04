/// <reference path="../Dsynr.d.ts" />
declare class DsynrCarousel extends DsynrUIIElement {
    private instanceRoot;
    private instanceRootClass;
    private parentSizingClass;
    private windowSizingClass;
    private underlayClass;
    private overlayClass;
    private disableUnderlay;
    private useOverlay;
    private adoptParent;
    private autoDestroy;
    private respectBounds;
    private animateUnderlay;
    private displayTogether;
    private animateModal;
    private carouselAnimateInClass;
    private carouselAnimateAttentionClass;
    private carouselAnimateOutClass;
    constructor(carouselContent: HTMLElement, preferences?: object);
    private setCarousel;
    private scrollCarousel;
}
