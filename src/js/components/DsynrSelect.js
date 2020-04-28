class DsynrSelect extends DsynrUIIElement {
    constructor(element, preferences = {}) {
        super(element, preferences);
    }
    setDefaults(reset = false) {
        super.setDefaults(reset);
    }
}
function autoEnhanceSelects(selectClass = 'dsynrSelect') {
    lfn('autoEnhanceSelects');
    makeArray(getElementsByClass(selectClass)).forEach(function (select, index) {
        new DsynrSelect(select);
    });
}
//# sourceMappingURL=DsynrSelect.js.map