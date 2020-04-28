declare interface DsynrUI {
    parent: HTMLElement;
    instance: HTMLElement;

    setPref(preferences: object): void

    setDefaults(reset: boolean): void

    setup(): void

    show(instance:object): void

    hide(): void

    destroy(): void
}
