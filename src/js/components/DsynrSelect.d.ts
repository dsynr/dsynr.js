declare class DsynrSelect extends DsynrUIIElement {
    content: HTMLSelectElement;
    private trigger;
    private options;
    private adoptParent;
    private showFinder;
    private triggerCls;
    private optCls;
    private optionPrefix;
    private modal;
    private modalPref;
    constructor(select: HTMLElement, preferences?: object);
    setDefaults(reset?: boolean): void;
    setup(): void;
    show(): void;
    private update;
    private addESOption;
    private setTrigger;
    private getOption;
    hide(): void;
    protected setActive(): void;
    static auto(selectClass?: string): void;
}
