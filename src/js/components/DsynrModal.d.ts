declare class DsynrModal extends DsynrUIIElement {
    private instanceRoot;
    private underlay;
    private trigger;
    private instanceRootClasses;
    private underlayClasses;
    private overlayClasses;
    private disableUnderlay;
    private useOverlay;
    private adoptParent;
    private animateUnderlay;
    private animateTogether;
    private modalAnimate;
    private autoDestroy;
    private modalAnimateInClasses;
    private modalAnimateOutClasses;
    private parentSizingClasses;
    private windowSizingClasses;
    constructor(modalContent: HTMLElement, preferences?: object);
    setDefaults(reset?: boolean): void;
    setup(): void;
    /**
     * @todo
     * add animationEnd listener for root and then animate modal
     * add optional animationEnd listener for modal
     */
    show(): void;
    hide(destroy?: boolean): void;
    private resizeRoot;
    destroy(): void;
    setActive(): void;
    addListeners(): void;
    blanketHidden(event: any): void;
    align(): void;
    private modalHidden;
    static auto(modalClass?: string): void;
}
