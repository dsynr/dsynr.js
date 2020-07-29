class DsynrWp {
    constructor() {
        this.conf = {
            formURL: 'form/',
        };
    }
    ready() {
        d.lfn('DsynrUtilWp');
        d.getPageScripts(d);
    }
    getForm(formName, parent = d.conf.defaultParent, enableDsynrSelect = false) {
        d.lfn('getForm');
        d.lfn('form parent::' + parent);
        if (d.requestDataset[formName] != undefined) {
            console.log(formName + ' Previously loaded / Reinstantiating from memory...');
            d.addFetchedData(d.requestDataset[formName], parent, enableDsynrSelect);
        }
        else {
            d.ajax(d.conf.domain + this.conf.loadURL + formName + '?min', formName, false, true, parent, enableDsynrSelect);
        }
    }
    ajax(params = {}, parent = d.conf.defaultParent) {
        d.lfn('ajax / ' + name);
        let formData = d.mergeObjs({ action: 'dw_ajax' }, params);
        console.log(formData);
        // @ts-ignore
        d.ajax(ajxRequest.ajaxurl, false, formData, true, parent, 'POST');
    }
}
let dw = new DsynrWp();
//# sourceMappingURL=DsynrWp.js.map