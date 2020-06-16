/// <reference path="../Dsynr.d.ts" />
declare class DsynrModal extends DsynrUIIElement {
    private instanceRoot;
    private underlay;
    private onModalDestroy;
    private trigger;
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
    private modalAnimateInClass;
    private modalAnimateAttentionClass;
    private modalAnimateOutClass;
    constructor(modalContent: HTMLElement, preferences?: object);
    setDefaults(reset?: boolean): void;
    setup(): void;
    /**
     * @todo
     * add animationEnd listener for root and then animate modal
     * add optional animationEnd listener for modal
     */
    show(): void;
    attention(): void;
    private animateDisplay;
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
