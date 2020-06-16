class DsynrWp {
    ready() {
        d.lfn('DsynrUtilWp');
        d.getPageScripts(d);
    }
    getForm(formName) {
        d.lfn('getForm');
        if (d.requestDataset[formName] != undefined) {
            d.l(formName + ' Previously loaded / Reinstantiating from memory...');
            d.addFetchedData(d.requestDataset[formName]);
        }
        else {
            d.ajax(d.domain + 'form/' + formName + '?min', formName);
        }
    }
    ajax(params = {}) {
        d.lfn('ajax / ' + name);
        let formData = d.mergeObjs({ action: 'dw_ajax' }, params);
        d.l(formData);
        // @ts-ignore
        d.ajax(ajxRequest.ajaxurl, false, formData, true, 'POST');
    }
}
let dw = new DsynrWp();
//# sourceMappingURL=DsynrWp.js.map