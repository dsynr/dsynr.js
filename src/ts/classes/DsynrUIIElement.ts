abstract class DsynrUIIElement implements DsynrUI {

    static instances: Array<any> = [];

    parent: HTMLElement = document.body;
    instance: HTMLElement;

    protected content: HTMLElement;
    protected namePrefix: string;
    protected nameSuffix: string;
    protected instanceClasses: string;
    protected animationClasses: string;
    protected animate: boolean;

    private prefAttr: string = 'dsynr-pref';

    protected constructor(element: HTMLElement, preferences: object = {}) {
        lfn('DsynrUIIElement');
        this.content = element;
        this.updatePref(preferences);
        DsynrUIIElement.instances.push(this);
    }

    show(): void {
    }

    hide(): void {
    }

    destroy(): void {
    }

    updatePref(preferences: object) {
        lfn('updatePref');

        if (Object.keys(preferences).length > 0) {
            updateProps(this, preferences);
        } else {
            let options: any = getData(this.content, this.prefAttr);
            l(options);
            if (options !== null) {
                preferences = JSON.parse(options);
                updateProps(this, preferences);
            }

        }
        l(this);
    }

    protected defaults(): void {
    }

    protected setup(): void {
    }

    protected setName(context: string, name: string): string {
        return concatStr([this.namePrefix, context, this.nameSuffix], '-');
    }

    protected setActive(): void {
    }
}
