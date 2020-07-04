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
                    console.log("already instantiated, aborting...");
                    return;
                }
            });
        }
        if (!this.selfAbort) {
            this.preferences = preferences;
            this.setPref();
            this.setParent();
            DsynrUIIElement.instances.push(this);
            console.log(DsynrUIIElement.instances);
        }
    }
    setPref() {
        d.lfn('setPref');
        // console.log(this.preferences);
        if (Object.keys(this.preferences).length > 0) {
            console.log('Object.keys(preferences).length:' + Object.keys(this.preferences).length);
            // console.log(Object.keys(preferences).length > 0);
            //d.updateProps(this, preferences);
        }
        else {
            let options = d.getData(this.content, this.prefAttr);
            console.log(options);
            if (options !== null) {
                console.log('parsing preferences : ' + options);
                this.preferences = d.IsJson(options) ? JSON.parse(options) : d.conf[options];
            }
        }
        d.updateProps(this, this.preferences);
    }
    setup() {
    }
    setParent() {
        d.lfn('setParent');
        console.log(this.parent);
        if (this.parent === undefined) {
            // @ts-ignore
            this.parent = 'parent';
        }
        if (typeof this.parent === 'string') {
            console.log(this.parent);
            if (this.parent == 'parent') {
                this.parent = this.content.parentElement;
            }
            else {
                this.parent = d.getElementById(this.parent);
            }
        }
        console.log(this.parent);
    }
    setDefaults(reset = false) {
        d.lfn('setDefaults super ');
        this.animate = d.addProp(this, 'animate', true, reset);
        this.animateClass = d.addProp(this, 'animateClass', d.conf.ani.prefix, reset);
        this.animateInClass = d.addProp(this, 'animateInClass', d.concatStr([this.animateClass, d.conf.ani.styles.fadeIn]), reset);
        this.animateOutClass = d.addProp(this, 'animateOutClass', d.concatStr([this.animateClass, d.conf.ani.styles.slideOutUp]), reset);
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