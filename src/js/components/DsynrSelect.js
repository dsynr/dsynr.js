class DsynrSelect extends DsynrUIIElement {
    constructor(select, preferences = {}) {
        super();
        lfn('constructor-EnhancedSelect');
        DsynrSelect.instances.push(this);
        this.defaults();
        this.updatePref(preferences);
        this.setup();
        if (this.trigger == 'auto') {
            this.show();
        }
    }
    show() {
        throw new Error("Method not implemented.");
    }
    hide() {
        throw new Error("Method not implemented.");
    }
    destroy() {
        throw new Error("Method not implemented.");
    }
    updatePref(preferences) {
        throw new Error("Method not implemented.");
    }
    defaults() {
        throw new Error("Method not implemented.");
    }
    setup() {
        throw new Error("Method not implemented.");
    }
    setName(context, name) {
        throw new Error("Method not implemented.");
    }
    setActive() {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=DsynrSelect.js.map