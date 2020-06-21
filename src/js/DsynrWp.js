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
        if (d.requestDataset[formName] != undefined) {
            d.l(formName + ' Previously loaded / Reinstantiating from memory...');
            d.addFetchedData(d.requestDataset[formName], parent, enableDsynrSelect);
        }
        else {
            d.ajax(d.conf.domain + this.conf.formURL + formName + '?min', formName, false, true, parent, true);
        }
    }
    ajax(params = {}, parent = d.conf.defaultParent) {
        d.lfn('ajax / ' + name);
        let formData = d.mergeObjs({ action: 'dw_ajax' }, params);
        d.l(formData);
        // @ts-ignore
        d.ajax(ajxRequest.ajaxurl, false, formData, true, parent, 'POST');
    }
}
let dw = new DsynrWp();
//# sourceMappingURL=DsynrWp.js.map