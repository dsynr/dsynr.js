class DsynrUIIElement implements DsynrUI {
    parent: HTMLElement;
    content: HTMLElement;
    root: HTMLElement;

    namePrefix: string;
    nameSuffix: string;

    constructor() {
        lfn('constructor-DsynrUIIElement');
    }

    show(): void {
    }

    hide(): void {
    }

    destroy(): void {
    }

    updatePref(preferences: object = {}): void {
    }

    defaults(): void {
    }

    setup(): void {
    }

    setName(context: string, name: string): string {
        return concatStr([this.namePrefix, context, this.nameSuffix], '-');
    }

    setActive(): void {
    }
}
