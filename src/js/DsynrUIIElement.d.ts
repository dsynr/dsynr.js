declare class DsynrUIIElement implements DsynrUI {
    parent: HTMLElement;
    content: HTMLElement;
    root: HTMLElement;
    namePrefix: string;
    nameSuffix: string;
    constructor();
    show(): void;
    hide(): void;
    destroy(): void;
    updatePref(preferences?: object): void;
    defaults(): void;
    setup(): void;
    setName(context: string, name: string): string;
    setActive(): void;
}
