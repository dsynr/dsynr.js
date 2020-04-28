declare class DsynrSelect extends DsynrUIIElement {
    constructor(element: HTMLElement, preferences?: object);
    setDefaults(reset?: boolean): void;
}
declare function autoEnhanceSelects(selectClass?: string): void;
