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
    constructor(modalContent: HTMLElement, preferences?: object);
    show(): void;
    hide(): void;
    destroy(): void;
    setDefaults(): void;
    setup(): void;
    setActive(): void;
    showBlanket(): void;
    hideBlanket(): void;
    blanketHidden(event: any): void;
    align(): void;
    private modalHidden;
}
declare function autoModalize(modalClass?: string): void;
