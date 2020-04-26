class DsynrSelect extends DsynrUIIElement {

    protected trigger: string; //"auto" => automatically shows as soon as instantiated

    constructor(select: HTMLSelectElement, preferences: object = {}) {
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

    show(): void {
        throw new Error("Method not implemented.");
    }

    hide(): void {
        throw new Error("Method not implemented.");
    }

    destroy(): void {
        throw new Error("Method not implemented.");
    }

    public updatePref(preferences?: object): void {
        throw new Error("Method not implemented.");
    }

    protected defaults(): void {
        throw new Error("Method not implemented.");
    }

    protected setup(): void {
        throw new Error("Method not implemented.");
    }

    protected setName(context: string, name: string): string {
        throw new Error("Method not implemented.");
    }

    protected setActive(): void {
        throw new Error("Method not implemented.");
    }


}