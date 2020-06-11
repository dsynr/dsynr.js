class DsynrUtilWp {
    ready() {
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
    getSnippet(name, params = {}) {
        d.lfn('getSnippet / ' + name);
        let formData = {
            action: 'getSnippet',
            name: name
        };
        formData = d.mergeObjs(formData, params);
        d.l(formData);
        // @ts-ignore
        d.ajax(dwpRequest.ajaxurl, false, formData, true, 'POST');
    }
}
let dw = new DsynrUtilWp();
// dw.ready();
//# sourceMappingURL=DsynrUtilWp.js.map