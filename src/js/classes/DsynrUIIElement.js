class DsynrUIIElement {
    constructor(element, preferences = {}) {
        this.parent = document.body;
        this.selfAbort = false;
        this.prefAttr = 'dsynr-pref';
        lfn('DsynrUIIElement');
        this.content = element;
        let self = this;
        if (DsynrUIIElement.instances.length > 0) {
            DsynrUIIElement.instances.forEach(function (instance, index) {
                if (instance.content === element) {
                    self.selfAbort = true;
                    l("already instantiated, aborting...");
                    return;
                }
            });
        }
        if (!this.selfAbort) {
            this.setPref(preferences);
            DsynrUIIElement.instances.push(this);
        }
    }
    setDefaults(reset = false) {
    }
    setup() {
    }
    setPref(preferences) {
        lfn('setPref');
        // l(preferences);
        if (Object.keys(preferences).length > 0) {
            // l('Object.keys(preferences).length:' + Object.keys(preferences).length);
            // l(Object.keys(preferences).length > 0);
            //updateProps(this, preferences);
        }
        else {
            let options = getData(this.content, this.prefAttr);
            if (options !== null) {
                preferences = JSON.parse(options);
            }
        }
        updateProps(this, preferences);
    }
    addListeners() {
    }
    setActive() {
    }
    show() {
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