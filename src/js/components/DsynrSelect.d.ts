declare class DsynrSelect extends DsynrUIIElement {
    content: HTMLSelectElement;
    private modal;
    private trigger;
    private options;
    private showFinder;
    private triggerCls;
    private optCls;
    private optionPrefix;
    constructor(select: HTMLElement, preferences?: object);
    setDefaults(reset?: boolean): void;
    setup(): void;
    show(): void;
    private update;
    private addESOption;
    private setTrigger;
    private getOption;
    hide(): void;
}
declare function autoEnhanceSelects(selectClass?: string): void;
