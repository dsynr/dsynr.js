declare class DsynrSelect extends DsynrUIIElement {
    protected trigger: string;
    constructor(select: HTMLSelectElement, preferences?: object);
    show(): void;
    hide(): void;
    destroy(): void;
    updatePref(preferences?: object): void;
    protected defaults(): void;
    protected setup(): void;
    protected setName(context: string, name: string): string;
    protected setActive(): void;
}
