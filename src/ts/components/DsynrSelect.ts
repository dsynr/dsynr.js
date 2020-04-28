class DsynrSelect extends DsynrUIIElement {

    constructor(element: HTMLElement, preferences: object = {}) {
        super(element, preferences);
    }

    setDefaults(reset: boolean = false): void {
        super.setDefaults(reset);
    }

}

function autoEnhanceSelects(selectClass: string = 'dsynrSelect'): void {
    lfn('autoEnhanceSelects');
    makeArray(getElementsByClass(selectClass)).forEach(function (select, index) {
        new DsynrSelect(select);
    });
}