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
    show(): void;
    hide(): void;
    destroy(): void;
    updatePref(preferences: object): void;
    protected defaults(): void;
    protected setup(): void;
    protected setName(context: string, name: string): string;
    protected setActive(): void;
}
