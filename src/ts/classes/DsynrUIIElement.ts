abstract class DsynrUIIElement implements DsynrUI {

    static instances: Array<any> = [];
    static activeInstance: any;

    parent: HTMLElement;
    instance: HTMLElement;
    preferences: object;

    protected content: HTMLElement;
    protected namePrefix: string;
    protected nameSuffix: string;
    protected instanceClass: string;
    protected animateClass: string;
    protected animateInClass: string;
    protected animateOutClass: string;
    protected animateAttentionClass: string;
    protected animate: boolean;

    protected selfAbort: boolean = false;

    private prefAttr: string = 'dsynr-pref';

    protected constructor(element: HTMLElement, preferences: object) {
        d.lfn('DsynrUIIElement');

        this.content = element;

        let self: DsynrUIIElement = this;
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

    setPref(): void {
        d.lfn('setPref');
        // d.l(this.preferences);

        if (Object.keys(this.preferences).length > 0) {
            d.l('Object.keys(preferences).length:' + Object.keys(this.preferences).length);
            // d.l(Object.keys(preferences).length > 0);
            //d.updateProps(this, preferences);
        } else {
            let options: any = d.getData(this.content, this.prefAttr);
            d.l(options);
            if (options !== null) {
                d.l('parsing preferences : ' + options);
                this.preferences = d.IsJson(options) ? JSON.parse(options) : d.conf[options];
            }
        }
        d.updateProps(this, this.preferences);
    }

    setup(): void {
    }

    setParent(): void {
        d.lfn('setParent');
        d.l(this.parent);
        if (this.parent === undefined) {
            // @ts-ignore
            this.parent = 'parent';
        }
        if (typeof this.parent === 'string') {
            d.l(this.parent);
            if (this.parent == 'parent') {
                this.parent = <HTMLElement>this.content.parentElement;
            } else {
                this.parent = d.getElementById(this.parent);
            }
        }
        d.l(this.parent);
    }

    setDefaults(reset: boolean = false): void {
        d.lfn('setDefaults super ');
        this.animate = d.addProp(this, 'animate', true, reset);
        this.animateClass = d.addProp(this, 'animateClass', d.conf.ani.prefix, reset);
        this.animateInClass = d.addProp(this, 'animateInClass', d.concatStr([this.animateClass, d.conf.ani.styles.fadeIn]), reset);
        this.animateOutClass = d.addProp(this, 'animateOutClass', d.concatStr([this.animateClass, d.conf.ani.styles.slideOutUp]), reset);
        this.animateAttentionClass = d.addProp(this, 'animateOutClass', d.concatStr([this.animateClass, 'heartBeat']), reset);
    }

    protected addListeners(): void {
    }

    protected setActive(): void {
    }

    attention(): void {
    }

    show(): void {
    }

    hide(): void {
    }

    destroy(): void {
        d.lfn('destroy');
        this.instance.remove();
    }

    protected setName(context: string, name: string): string {
        return d.concatStr([this.namePrefix, context, this.nameSuffix], '-');
    }
}