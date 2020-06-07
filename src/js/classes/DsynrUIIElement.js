class DsynrUIIElement {
    constructor(element, preferences) {
        this.selfAbort = false;
        this.prefAttr = 'dsynr-pref';
        d.lfn('DsynrUIIElement');
        this.content = element;
        let self = this;
        if (DsynrUIIElement.instances.length > 0) {
            DsynrUIIElement.instances.forEach(function (instance, index) {
                if (instance.content === element) {
                    self.selfAbort = true;
                    d.l("already instantiated, aborting...");
                    return;
                }
            });
        }
        if (!this.selfAbort) {
            this.preferences = preferences;
            this.setPref();
            this.setParent();
            DsynrUIIElement.instances.push(this);
            d.l(DsynrUIIElement.instances);
        }
    }
    setPref() {
        d.lfn('setPref');
        // d.l(this.preferences);
        if (Object.keys(this.preferences).length > 0) {
            d.l('Object.keys(preferences).length:' + Object.keys(this.preferences).length);
            // d.l(Object.keys(preferences).length > 0);
            //d.updateProps(this, preferences);
        }
        else {
            let options = d.getData(this.content, this.prefAttr);
            d.l(options);
            if (options !== null) {
                d.l('parsing preferences as JSON');
                this.preferences = JSON.parse(options);
            }
        }
        d.updateProps(this, this.preferences);
    }
    setup() {
    }
    setParent() {
        d.lfn('setParent');
        d.l(this.parent);
        if (this.parent === undefined) {
            // @ts-ignore
            this.parent = 'parent';
        }
        if (typeof this.parent === 'string') {
            d.l(this.parent);
            if (this.parent == 'parent') {
                this.parent = this.content.parentElement;
            }
            else {
                this.parent = d.getElementById(this.parent);
            }
        }
        d.l(this.parent);
    }
    setDefaults(reset = false) {
        d.lfn('setDefaults super ');
        this.animate = d.addProp(this, 'animate', true, reset);
        this.animateClass = d.addProp(this, 'animateClass', 'animated', reset);
        this.animateInClass = d.addProp(this, 'animateInClass', d.concatStr([this.animateClass, 'fadeIn']), reset);
        this.animateOutClass = d.addProp(this, 'animateOutClass', d.concatStr([this.animateClass, 'fadeOut']), reset);
        this.animateAttentionClass = d.addProp(this, 'animateOutClass', d.concatStr([this.animateClass, 'heartBeat']), reset);
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
        d.lfn('destroy');
        this.instance.remove();
    }
    setName(context, name) {
        return d.concatStr([this.namePrefix, context, this.nameSuffix], '-');
    }
}
DsynrUIIElement.instances = [];
//# sourceMappingURL=DsynrUIIElement.js.map