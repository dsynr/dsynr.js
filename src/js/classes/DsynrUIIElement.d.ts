declare abstract class DsynrUIIElement implements DsynrUI {
    static instances: Array<any>;
    static activeInstance: any;
    parent: HTMLElement;
    instance: HTMLElement;
    preferences: object;
    protected content: HTMLElement;
    protected namePrefix: string;
    protected nameSuffix: string;
    protected instanceClasses: string;
    protected animationClasses: string;
    protected animate: boolean;
    protected selfAbort: boolean;
    private prefAttr;
    protected constructor(element: HTMLElement, preferences: object);
    setPref(): void;
    setup(): void;
    setParent(): void;
    setDefaults(reset?: boolean): void;
    protected addListeners(): void;
    protected setActive(): void;
    show(): void;
    hide(): void;
    destroy(): void;
    protected setName(context: string, name: string): string;
}
