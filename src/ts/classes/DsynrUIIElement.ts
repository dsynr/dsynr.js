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
        lfn('DsynrUIIElement');

        this.content = element;

        let self: DsynrUIIElement = this;
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

    setPref(): void {
        lfn('setPref');
        // l(this.preferences);

        if (Object.keys(this.preferences).length > 0) {
            l('Object.keys(preferences).length:' + Object.keys(this.preferences).length);
            // l(Object.keys(preferences).length > 0);
            //updateProps(this, preferences);
        } else {
            let options: any = getData(this.content, this.prefAttr);
            l(options);
            if (options !== null) {
                l('parsing preferences as JSON');
                this.preferences = JSON.parse(options);
            }
        }
        updateProps(this, this.preferences);
    }

    setup(): void {
    }

    setParent(): void {
        lfn('setParent');
        l(this.parent);
        if (this.parent === undefined) {
            // @ts-ignore
            this.parent = 'parent';
        }
        if (typeof this.parent === 'string') {
            l(this.parent);
            if (this.parent == 'parent') {
                this.parent = <HTMLElement>this.content.parentElement;
            } else {
                this.parent = getElementById(this.parent);
            }
        }
        l(this.parent);
    }

    setDefaults(reset: boolean = false): void {
        lfn('setDefaults super ');
        this.animate = addProp(this, 'animate', true, reset);
        this.animateClass = addProp(this, 'animateClass', 'animated', reset);
        this.animateInClass = addProp(this, 'animateInClass', concatStr([this.animateClass, 'fadeIn']), reset);
        this.animateOutClass = addProp(this, 'animateOutClass', concatStr([this.animateClass, 'fadeOut']), reset);
        this.animateAttentionClass = addProp(this, 'animateOutClass', concatStr([this.animateClass, 'heartBeat']), reset);
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
        lfn('destroy');
        this.instance.remove();
    }

    protected setName(context: string, name: string): string {
        return concatStr([this.namePrefix, context, this.nameSuffix], '-');
    }
}
