class DsynrUIIElement {
    constructor() {
        lfn('constructor-DsynrUIIElement');
    }
    show() {
    }
    hide() {
    }
    destroy() {
    }
    updatePref(preferences = {}) {
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
//# sourceMappingURL=DsynrUIIElement.js.map