declare class DsynrSelect extends DsynrUIIElement {
    content: HTMLSelectElement;
    private trigger;
    private esPrevOpt;
    private options;
    private option;
    private adoptParent;
    private showFinder;
    private autoExit;
    private isActive;
    private triggerCls;
    private optCls;
    private optClsActive;
    private optionPrefix;
    private modal;
    private modalPref;
    constructor(select: HTMLElement, preferences?: object);
    setDefaults(reset?: boolean): void;
    setup(): void;
    show(): void;
    attention(): void;
    private update;
    private addESOption;
    private setTrigger;
    destroy(): void;
    protected setActive(): void;
    static auto(selectClass?: string): void;
}
