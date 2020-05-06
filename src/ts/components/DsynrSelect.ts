class DsynrSelect extends DsynrUIIElement {

    content: HTMLSelectElement;
    private trigger: HTMLElement;
    private options: HTMLOptionsCollection;
    private option: HTMLOptionElement;
    private esPrevOpt: HTMLElement;
    private adoptParent: boolean;
    private showFinder: boolean;
    private autoExit: boolean;
    private triggerCls: string;
    private optCls: string;
    private optClsActive: string;
    private optionPrefix: string;

    private modal: DsynrModal;
    private modalPref: object;

    constructor(select: HTMLElement, preferences: object = {}) {
        super(select, preferences);
        if (!this.selfAbort) {
            lfn('DsynrSelect');
            this.setDefaults();
            this.setup();
        }
    }

    setDefaults(reset: boolean = false): void {

        super.setDefaults();

        lfn('setDefaults');

        this.adoptParent = addProp(this, 'adoptParent', true, reset);
        this.nameSuffix = addProp(this, 'nameSuffix', DsynrSelect.instances.length.toString(), reset);
        this.namePrefix = addProp(this, 'namePrefix', 'dsynrEnhancedSelect', reset);
        this.optionPrefix = addProp(this, 'namePrefix', concatStr([this.namePrefix, 'option'], '-'), reset);
        this.instanceClasses = addProp(this, 'instanceClasses', concatStr([this.namePrefix, 'rounded bg-light shadow p-5']), reset);
        this.showFinder = addProp(this, 'showFinder', false, reset);
        this.autoExit = addProp(this, 'autoExit', true, reset);
        this.triggerCls = addProp(this, 'btnCls', concatStr([this.namePrefix, 'trigger btn btn-link'], '-'), reset);
        this.optCls = addProp(this, 'optCls', concatStr([this.optionPrefix, 'hand p-2']), reset);
        this.optClsActive = addProp(this, 'optClsActive', 'active bg-warning rounded', reset);
    }

    setup(): void {
        lfn('setup');
        if (this.content.id === '') {
            this.content.id = 'dsynrSelect-' + DsynrSelect.instances.length;
        }
        this.options = this.content.options;
        this.option = this.options[this.options.selectedIndex];
        this.setTrigger();
        l('Select Trigger READY!');
    }

    show(): void {
        if (DsynrSelect.activeInstance !== this) {
            lfn('show triggered via : ' + this.trigger.id);
            this.instance = addDiv(this.setName('', this.content.id), this.instanceClasses);
            let self: DsynrSelect = this;
            makeArray(this.options).forEach(function (o: HTMLOptionElement, index: number) {
                self.addESOption(o, index);
            });

            this.modalPref = mergeObjs(this.preferences, {'trigger': 'auto', 'parent': this.parent, 'adoptParent': this.adoptParent});
            this.modal = new DsynrModal(this.instance, this.modalPref);
        }
        this.setActive();
    }

    private update(selectOption: HTMLOptionElement): void {
        lfn('update');
        removeClass(this.esPrevOpt, this.optClsActive);
        this.option = selectOption;
        addClass(this.option, this.optClsActive);
        this.esPrevOpt = getElementById(selectOption.id);
        this.content.selectedIndex = parseInt(getData(selectOption, 'index'));
        this.trigger.textContent = this.option.innerText;
        if (this.autoExit) {
            this.destroy();
        }
    }

    private addESOption(o: HTMLOptionElement, i: number): void {
        lfn('addESOption');
        let oid: string = concatStr([this.optionPrefix, this.content.id, i], '-');
        let ocls: string;
        ocls = (i == this.option.index) ? concatStr([this.optCls, this.optClsActive]) : ocls = this.optCls;

        addDiv(oid, ocls, this.instance);
        if (i == this.option.index) {
            this.esPrevOpt = getElementById(oid);
        }
        let oe: HTMLOptionElement = <HTMLOptionElement>getElementById(oid);
        oe.textContent = o.text;
        setData(oe, 'index', o.index.toString());

        let self: DsynrSelect = this;
        addListener(oe.id, 'click', function () {
            lclk(oe.id);
            self.update(oe);
        });
    }

    private setTrigger(): void {
        lfn('addTrigger');
        this.trigger = addDiv(this.setName('btn', this.content.id), this.triggerCls, <HTMLElement>this.content.parentElement);
        addText(this.option.text, this.trigger);
        let self: DsynrSelect = this;
        addListener(this.trigger.id, 'click', function () {
            self.show();
        });
        hide(this.content);
    }

    destroy() {
        lfn('destroy');
        this.modal.hide(true);
    }

    protected setActive(): void {
        lfn('setActive');
        DsynrSelect.activeInstance = this;
    }

    static auto(selectClass: string = 'dsynrSelect'): void {
        lfn('auto');
        makeArray(getElementsByClass(selectClass)).forEach(function (instance) {
            new DsynrSelect(instance);
        });
    }
}