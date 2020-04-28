class DsynrSelect extends DsynrUIIElement {

    constructor(select: HTMLElement, preferences: object = {}) {
        super(select, preferences);
        lfn('DsynrSelect');
        this.setDefaults();
        this.setup();
    }

    setDefaults(reset: boolean = false): void {
    }

    setup(): void {
    }

    update(selectElement: HTMLSelectElement, selectOption: HTMLElement): void {
        lfn('dsynrSelect_updateSelectElement');
        // @ts-ignore
        selectElement.selectedIndex = parseInt(getData(selectOption, 'index'));
    }

    show(s: HTMLSelectElement, esBtn: HTMLElement): void {
        lfn('dsynrSelect_showDsynrSelect');

        addDiv(DsynrSelectRoot, DsynrSelectRootClass, document.body);
        let es: HTMLElement = getElementById(DsynrSelectRoot);

        makeArray(s.options).forEach(function (o: HTMLOptionElement, index: number) {
            this.addESOption(es, o, index);
        });
        new DsynrModal(es);
    }


    private addESOptionListener(oe: HTMLElement): void {
        addListener(oe.id, 'click', function () {
            lclk(oe.id);
            this.update(s, oe);
        });
    }

    private addESOption(esRoot: HTMLElement, o: HTMLOptionElement, i: number): void {
        let oid: string = s.id + DsynrESoptionSuffix + i;
        addDiv(oid, DsynrSelectElementClass + DsynrESoptionSuffix + ' hand p-2', esRoot);

        let oe: HTMLElement = getElementById(oid);
        oe.textContent = o.text;
        // setData(oe, 'val', o.value);
        setData(oe, 'index', o.index.toString());

        this.addESOptionListener(oe);
    }

    private enhanceBtn(select: HTMLSelectElement): HTMLElement {
        lfn('dsynrSelect_enhanceSelectElementBtn');
        let esBtn: HTMLElement = addDiv(DsynrSelectElementBtnIdPrefix + '-' + select.id, DsynrSelectElementBtnClass);
        addText(select.options[0].text, esBtn);
        return esBtn;
    }

    private addListeners(select: HTMLSelectElement, esBtn: HTMLElement): void {
        lfn('dsynrSelect_addEventListeners');
        addListener(esBtn.id, 'click', function (e) {
            lclk(esBtn.id);
            this.show(select, esBtn);
        });
    }

    enhance(select: HTMLSelectElement) {
        lfn('dsynrSelect_enhanceSelectElement');

        hide(select);

        // @ts-ignore
        let selectParent: HTMLElement = select.parentElement;
        let esBtn: HTMLElement = this.enhanceBtn(select);
        selectParent.appendChild(esBtn);

        this.addListeners(select, esBtn);
    }

    getOption() {
        lfn('dsynrSelect_getDsynrSelectOption');

    }

    exitDsynrSelect() {
        lfn('dsynrSelect_exitDsynrSelect');

    }
}

function autoEnhanceSelects(selectClass: string = 'dsynrSelect'): void {
    lfn('autoEnhanceSelects');
    makeArray(getElementsByClass(selectClass)).forEach(function (select, index) {
        new DsynrSelect(select);
    });
}