class DsynrUIIElement {
    constructor(element, preferences) {
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
            this.preferences = preferences;
            this.setPref();
            this.setParent();
            DsynrUIIElement.instances.push(this);
            l(DsynrUIIElement.instances);
        }
    }
    setPref() {
        lfn('setPref');
        // l(this.preferences);
        if (Object.keys(this.preferences).length > 0) {
            l('Object.keys(preferences).length:' + Object.keys(this.preferences).length);
            // l(Object.keys(preferences).length > 0);
            //updateProps(this, preferences);
        }
        else {
            let options = getData(this.content, this.prefAttr);
            l(options);
            if (options !== null) {
                l('parsing preferences as JSON');
                this.preferences = JSON.parse(options);
            }
        }
        updateProps(this, this.preferences);
    }
    setup() {
    }
    setParent() {
        lfn('setParent');
        l(this.parent);
        if (this.parent === undefined) {
            // @ts-ignore
            this.parent = 'parent';
        }
        if (typeof this.parent === 'string') {
            l(this.parent);
            if (this.parent == 'parent') {
                this.parent = this.content.parentElement;
            }
            else {
                this.parent = getElementById(this.parent);
            }
        }
        l(this.parent);
    }
    setDefaults(reset = false) {
        lfn('setDefaults super ');
        this.animate = addProp(this, 'animate', true, reset);
        this.animateClass = addProp(this, 'animateClass', 'animated', reset);
        this.animateInClass = addProp(this, 'animateInClass', concatStr([this.animateClass, 'fadeIn']), reset);
        this.animateOutClass = addProp(this, 'animateOutClass', concatStr([this.animateClass, 'fadeOut']), reset);
        this.animateAttentionClass = addProp(this, 'animateOutClass', concatStr([this.animateClass, 'heartBeat']), reset);
    }
    addListeners() {
    }
    setActive() {
    }
    attention() {
    }
    show() {
    }
    hide() {
    }
    destroy() {
        lfn('destroy');
        this.instance.remove();
    }
    setName(context, name) {
        return concatStr([this.namePrefix, context, this.nameSuffix], '-');
    }
}
DsynrUIIElement.instances = [];
//# sourceMappingURL=DsynrUIIElement.js.map