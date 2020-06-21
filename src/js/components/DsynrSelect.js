class DsynrSelect extends DsynrUIIElement {
    constructor(select, preferences = {}) {
        super(select, preferences);
        if (!this.selfAbort) {
            d.lfn('DsynrSelect');
            this.setDefaults();
            this.setup();
        }
    }
    setDefaults(reset = false) {
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
    setup() {
        d.lfn('setup');
        if (this.content.id === '') {
            this.content.id = 'dsynrSelect-' + DsynrSelect.instances.length;
        }
        this.options = this.content.options;
        this.option = this.options[this.options.selectedIndex];
        this.setTrigger();
        d.l('Select Trigger READY!');
    }
    show() {
        d.lfn('show triggered via : ' + this.trigger.id);
        if (this.isActive) {
            this.attention();
        }
        else {
            this.instance = d.addDiv(this.setName('', this.content.id), this.instanceClass);
            this.instance.tabIndex = 0;
            this.instance.style.outline = 'none';
            let ths = this;
            d.makeArray(this.options).forEach(function (o, index) {
                ths.addESOption(o, index);
            });
            this.modalPref = d.mergeObjs(this.preferences, {
                'trigger': 'auto', 'parent': this.parent, 'adoptParent': this.adoptParent, 'onModalDestroy': () => {
                    ths.destroy();
                }
            });
            this.modal = new DsynrModal(this.instance, this.modalPref);
            this.setActive();
        }
    }
    attention() {
        DsynrSelect.activeInstance = this;
        this.modal.attention();
    }
    update(selectOption) {
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
    addESOption(o, i) {
        d.lfn('addESOption');
        let oid = d.concatStr([this.optionPrefix, this.content.id, i], '-');
        let ocls;
        d.l(this.esPrevOpt);
        ocls = (i == this.content.selectedIndex) ? d.concatStr([this.optCls, this.optClsActive]) : ocls = this.optCls;
        let eso = d.addDiv(oid, ocls, this.instance);
        eso.tabIndex = i;
        eso.style.outline = 'none';
        if (i == this.option.index) {
            this.esPrevOpt = eso;
        }
        let oe = d.getElementById(oid);
        oe.textContent = o.text;
        d.setData(oe, 'index', o.index.toString());
        let ths = this;
        d.addListener(oe.id, 'click', function () {
            d.lclk(oe.id);
            ths.update(oe);
        });
        d.addListener(oe.id, 'keydown', function (ev) {
            if (ev.key == 'Enter') {
                ths.update(oe);
            }
        });
    }
    setTrigger() {
        d.lfn('addTrigger');
        this.trigger = d.addDiv(this.setName('btn', this.content.id), this.triggerCls, this.content.parentElement);
        d.addText(this.option.text, this.trigger);
        let ths = this;
        d.addListener(this.trigger.id, 'click', function (ev) {
            ev.preventDefault();
            ths.show();
        });
        d.hide(this.content);
    }
    addListeners() {
        d.lfn('d.addListeners...');
        let ths = this;
        d.addListener(this.instance.id, 'focus', ev => {
            d.l('focused!');
        });
        d.addListener(this.instance.id, 'keydown', function (evnt) {
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
    next() {
        d.lfn('next');
    }
    prev() {
        d.lfn('prev');
    }
    destroy() {
        d.lfn('destroy');
        this.modal.hide(true);
        this.isActive = false;
        DsynrSelect.activeInstance = false;
    }
    setActive() {
        d.lfn('setActive');
        this.isActive = true;
        DsynrSelect.activeInstance = this;
        this.addListeners();
        this.instance.focus();
    }
    static auto(selectClass = 'dsynrSelect') {
        d.lfn('auto');
        d.makeArray(d.getElementsByClass(selectClass)).forEach(function (instance) {
            new DsynrSelect(instance);
        });
    }
}
//# sourceMappingURL=DsynrSelect.js.map