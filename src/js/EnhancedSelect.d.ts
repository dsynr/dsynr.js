declare class EnhancedSelect extends DsynrUIIElement {
    parent: HTMLElement;
    itself: HTMLElement;
    content: HTMLElement;
    root: HTMLElement;
    namePrefix: string;
    nameSuffix: string;
    show(): void;
    hide(): void;
    destroy(): void;
    updatePref(preferences?: object): void;
    protected defaults(): void;
    protected setup(): void;
    protected setName(context: string, name: string): string;
    protected setActive(): void;
}
