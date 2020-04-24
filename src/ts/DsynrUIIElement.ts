class DsynrUIIElement implements DsynrUI {
    parent: HTMLElement;
    itself: HTMLElement;
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

    public updatePref(preferences: object = {}): void {
    }

    protected defaults(): void {
    }

    protected setup(): void {
    }

    protected setName(context: string, name: string): string {
        return concatStr([this.namePrefix, context, this.nameSuffix], '-');
    }

    protected setActive(): void {
    }
}
