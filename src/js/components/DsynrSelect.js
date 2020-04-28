class DsynrSelect extends DsynrUIIElement {
    constructor(select, preferences = {}) {
        super(select, preferences);
        lfn('DsynrSelect');
        this.setDefaults();
        this.setup();
    }
    setDefaults(reset = false) {
        lfn('setDefaults');
        this.nameSuffix = addProp(this, 'nameSuffix', DsynrSelect.instances.length.toString(), reset);
        this.namePrefix = addProp(this, 'namePrefix', 'dsynrEnhancedSelect', reset);
        this.optionPrefix = addProp(this, 'namePrefix', concatStr([this.namePrefix, 'option'], '-'), reset);
        this.instanceClasses = addProp(this, 'instanceClasses', concatStr([this.namePrefix, 'bg-light p-5']), reset);
        this.showFinder = addProp(this, 'showFinder', false, reset);
        this.triggerCls = addProp(this, 'btnCls', concatStr([this.namePrefix, 'trigger btn btn-link'], '-'), reset);
        this.optCls = addProp(this, 'optCls', concatStr([this.optionPrefix, 'hand p-2']), reset);
    }
    setup() {
        lfn('setup');
        if (this.content.id === '') {
            this.content.id = 'dsynrSelect-' + DsynrSelect.instances.length;
        }
        this.options = this.content.options;
        this.setTrigger();
        l('Select Trigger READY!');
    }
    show() {
        lfn('show triggered via : ' + this.trigger.id);
        this.instance = addDiv(this.setName('', this.content.id), this.instanceClasses);
        let self = this;
        makeArray(this.options).forEach(function (o, index) {
            self.addESOption(o, index);
        });
        this.modal = new DsynrModal(this.instance, { 'trigger': 'auto' });
    }
    update(selectOption) {
        lfn('update');
        this.content.selectedIndex = parseInt(getData(selectOption, 'index'));
    }
    addESOption(o, i) {
        lfn('addESOption');
        let oid = concatStr([this.optionPrefix, this.content.id, i], '-');
        addDiv(oid, this.optCls, this.instance);
        let oe = getElementById(oid);
        oe.textContent = o.text;
        setData(oe, 'index', o.index.toString());
        let self = this;
        addListener(oe.id, 'click', function () {
            lclk(oe.id);
            self.update(oe);
        });
    }
    setTrigger() {
        lfn('addTrigger');
        this.trigger = addDiv(this.setName('btn', this.content.id), this.triggerCls, this.content.parentElement);
        addText(this.options[0].text, this.trigger);
        let self = this;
        addListener(this.trigger.id, 'click', function () {
            self.show();
        });
        hide(this.content);
    }
    getOption() {
        lfn('dsynrSelect_getDsynrSelectOption');
    }
    hide() {
        lfn('dsynrSelect_exitDsynrSelect');
    }
}
function autoEnhanceSelects(selectClass = 'dsynrSelect') {
    lfn('autoEnhanceSelects');
    makeArray(getElementsByClass(selectClass)).forEach(function (select, index) {
        new DsynrSelect(select);
    });
}
//# sourceMappingURL=DsynrSelect.js.map