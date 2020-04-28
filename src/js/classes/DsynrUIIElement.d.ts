declare abstract class DsynrUIIElement implements DsynrUI {
    static instances: Array<any>;
    parent: HTMLElement;
    instance: HTMLElement;
    protected content: HTMLElement;
    protected namePrefix: string;
    protected nameSuffix: string;
    protected instanceClasses: string;
    protected animationClasses: string;
    protected animate: boolean;
    private prefAttr;
    protected constructor(element: HTMLElement, preferences?: object);
    setDefaults(reset?: boolean): void;
    setup(): void;
    setPref(preferences: object): void;
    protected addListeners(): void;
    protected setActive(): void;
    show(): void;
    hide(): void;
    destroy(): void;
    protected setName(context: string, name: string): string;
}
