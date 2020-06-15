class DsynrSelect extends DsynrUIIElement {

    content: HTMLSelectElement;
    private trigger: HTMLElement;
    private esPrevOpt: HTMLElement;

    private options: HTMLOptionsCollection;
    private option: HTMLOptionElement;

    private adoptParent: boolean;
    private showFinder: boolean;
    private autoExit: boolean;
    private isActive: boolean;

    private triggerCls: string;
    private optCls: string;
    private optClsActive: string;
    private optionPrefix: string;

    private modal: DsynrModal;
    private modalPref: object;

    constructor(select: HTMLElement, preferences: object = {}) {
        super(select, preferences);
        if (!this.selfAbort) {
            d.lfn('DsynrSelect');
            this.setDefaults();
            this.setup();
        }
    }

    setDefaults(reset: boolean = false): void {

        super.setDefaults();

        d.lfn('setDefaults');

        this.adoptParent = d.addProp(this, 'adoptParent', true, reset);
        this.nameSuffix = d.addProp(this, 'nameSuffix', DsynrSelect.instances.length.toString(), reset);
        this.namePrefix = d.addProp(this, 'namePrefix', 'dsynrEnhancedSelect', reset);
        this.optionPrefix = d.addProp(this, 'namePrefix', d.concatStr([this.namePrefix, 'option'], '-'), reset);
        this.instanceClass = d.addProp(this, 'instanceClasses', d.concatStr([this.namePrefix, 'rounded bg-light shadow p-5']), reset);
        this.showFinder = d.addProp(this, 'showFinder', false, reset);
        this.autoExit = d.addProp(this, 'autoExit', true, reset);
        this.isActive = d.addProp(this, 'isActive', false, reset);
        this.triggerCls = d.addProp(this, 'btnCls', d.concatStr([this.namePrefix, 'trigger btn btn-link'], '-'), reset);
        this.optCls = d.addProp(this, 'optCls', d.concatStr([this.optionPrefix, 'hand p-2']), reset);
        this.optClsActive = d.addProp(this, 'optClsActive', 'active bg-warning rounded', reset);
    }

    setup(): void {
        d.lfn('setup');
        if (this.content.id === '') {
            this.content.id = 'dsynrSelect-' + DsynrSelect.instances.length;
        }
        this.options = this.content.options;
        this.option = this.options[this.options.selectedIndex];
        this.setTrigger();
        d.l('Select Trigger READY!');
    }

    show(): void {
        d.lfn('show triggered via : ' + this.trigger.id);
        if (this.isActive) {
            this.attention();
        } else {
            this.instance = d.addDiv(this.setName('', this.content.id), this.instanceClass);
            this.instance.tabIndex = 0;
            this.instance.style.outline = 'none';
            let self: DsynrSelect = this;
            d.makeArray(this.options).forEach(function (o: HTMLOptionElement, index: number) {
                self.addESOption(o, index);
            });
            let ths = this;
            this.modalPref = d.mergeObjs(this.preferences, {
                'trigger': 'auto', 'parent': this.parent, 'adoptParent': this.adoptParent, 'onModalDestroy': () => {
                    ths.destroy();
                }
            });
            this.modal = new DsynrModal(this.instance, this.modalPref);
            this.setActive();
        }
    }

    attention(): void {
        DsynrSelect.activeInstance = this;
        this.modal.attention();
    }

    private update(selectOption: HTMLOptionElement): void {
        d.lfn('update');
        d.removeClass(this.esPrevOpt, this.optClsActive);
        this.option = selectOption;
        d.addClass(this.option, this.optClsActive);
        this.esPrevOpt = d.getElementById(selectOption.id);
        this.content.selectedIndex = parseInt(d.getData(selectOption, 'index'));
        this.trigger.textContent = this.option.innerText;
        if (this.autoExit) {
            this.destroy();
        }
    }

    private addESOption(o: HTMLOptionElement, i: number): void {
        d.lfn('addESOption');
        let oid: string = d.concatStr([this.optionPrefix, this.content.id, i], '-');
        let ocls: string;
        d.l(this.esPrevOpt);
        ocls = (i == this.content.selectedIndex) ? d.concatStr([this.optCls, this.optClsActive]) : ocls = this.optCls;

        let eso: HTMLElement = d.addDiv(oid, ocls, this.instance);
        eso.tabIndex = i;
        eso.style.outline = 'none';
        if (i == this.option.index) {
            this.esPrevOpt = eso;
        }
        let oe: HTMLOptionElement = <HTMLOptionElement>d.getElementById(oid);
        oe.textContent = o.text;
        d.setData(oe, 'index', o.index.toString());

        let self: DsynrSelect = this;
        d.addListener(oe.id, 'click', function () {
            d.lclk(oe.id);
            self.update(oe);
        });
        d.addListener(oe.id, 'keydown', function (ev) {
            if (ev.key == 'Enter') {
                self.update(oe);
            }
        });
    }

    private setTrigger(): void {
        d.lfn('addTrigger');
        this.trigger = d.addDiv(this.setName('btn', this.content.id), this.triggerCls, <HTMLElement>this.content.parentElement);
        d.addText(this.option.text, this.trigger);
        let self: DsynrSelect = this;
        d.addListener(this.trigger.id, 'click', function (ev) {
            ev.preventDefault();
            self.show();
        });
        d.hide(this.content);
    }

    protected addListeners() {
        d.lfn('d.addListeners...');
        let ths: DsynrSelect = this;
        d.addListener(this.instance.id, 'focus', ev => {
            d.l('focused!');
        });
        d.addListener(this.instance.id, 'keydown', function (evnt: KeyboardEvent) {
            switch (evnt.key) {
                case 'ArrowDown':
                case 'ArrowRight':
                case 'Tab':
                    ths.next();
                    break;
                case 'ArrowUp':
                case 'ArrowLeft':
                    ths.prev();
                    break;
                case 'Escape':
                    ths.destroy();
                    break;
            }
        });
    }

    private next(): void {
        d.lfn('next');
    }

    private prev(): void {
        d.lfn('prev');
    }

    destroy() {
        d.lfn('destroy');
        this.modal.hide(true);
        this.isActive = false;
        DsynrSelect.activeInstance = false;
    }

    protected setActive(): void {
        d.lfn('setActive');
        this.isActive = true;
        DsynrSelect.activeInstance = this;
        this.addListeners();
        this.instance.focus();
    }

    static auto(selectClass: string = 'dsynrSelect'): void {
        d.lfn('auto');
        d.makeArray(d.getElementsByClass(selectClass)).forEach(function (instance) {
            new DsynrSelect(instance);
        });
    }
}