declare class DsynrModal extends DsynrUIIElement {
    private instanceRoot;
    private underlay;
    private trigger;
    private rootClasses;
    private underlayClasses;
    private overlayClasses;
    private disableUnderlay;
    private useOverlay;
    private isOverlayOn;
    private adoptParent;
    private animateTogether;
    private modalAnimate;
    private modalAnimationClasses;
    constructor(modalContent: HTMLElement, preferences?: object);
    setDefaults(reset?: boolean): void;
    setup(): void;
    /**
     * @todo
     * add animationEnd listener for root and then animate modal
     * add optional animationEnd listener for modal
     */
    show(): void;
    private resizeRoot;
    hide(): void;
    destroy(): void;
    setActive(): void;
    addListeners(): void;
    showBlanket(): void;
    hideBlanket(): void;
    blanketHidden(event: any): void;
    align(): void;
    private modalHidden;
    static auto(modalClass?: string): void;
}
