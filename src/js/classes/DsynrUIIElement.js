class DsynrUIIElement {
    constructor(element, preferences = {}) {
        this.parent = document.body;
        this.prefAttr = 'dsynr-pref';
        lfn('DsynrUIIElement');
        this.content = element;
        this.setPref(preferences);
        DsynrUIIElement.instances.push(this);
    }
    setDefaults(reset = false) {
    }
    setup() {
    }
    setPref(preferences) {
        lfn('setPref');
        if (Object.keys(preferences).length > 0) {
            updateProps(this, preferences);
        }
        else {
            let options = getData(this.content, this.prefAttr);
            if (options !== null) {
                preferences = JSON.parse(options);
                updateProps(this, preferences);
            }
        }
    }
    addListeners() { }
    setActive() {
    }
    show(instance) {
    }
    hide() {
    }
    destroy() {
    }
    setName(context, name) {
        return concatStr([this.namePrefix, context, this.nameSuffix], '-');
    }
}
DsynrUIIElement.instances = [];
//# sourceMappingURL=DsynrUIIElement.js.map