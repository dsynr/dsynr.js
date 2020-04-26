class DsynrUIIElement {
    constructor(preferences = {}) {
        this.parent = document.body;
        this.prefAttr = 'dsynr-pref';
        lfn('constructor-DsynrUIIElement');
        this.updatePref(preferences);
    }
    show() {
    }
    hide() {
    }
    destroy() {
    }
    updatePref(preferences) {
        lfn('updatePref');
        if (Object.keys(preferences).length > 0) {
            updateProps(this, preferences);
        }
        else {
            let options = getData(this.parent, this.prefAttr);
            if (options !== null) {
                preferences = JSON.parse(options);
                updateProps(this, preferences);
            }
        }
        l(this);
    }
    defaults() {
    }
    setup() {
    }
    setName(context, name) {
        return concatStr([this.namePrefix, context, this.nameSuffix], '-');
    }
    setActive() {
    }
}
DsynrUIIElement.instances = [];
//# sourceMappingURL=DsynrUIIElement.js.map