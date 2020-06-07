class DsynrUtilWp {
    ready() {
        d.getPageScripts(d);
    }
    getWpForm(formName) {
        d.lfn('getWpForm');
        if (d.requestDataset[formName] != undefined) {
            d.l(formName + ' Previously loaded / Reinstantiating from memory...');
            d.addFetchedData(d.requestDataset[formName]);
        }
        else {
            d.ajax(d.domain + 'form/' + formName + '?min', formName);
        }
    }
    postForm(form) {
        d.lfn('postForm');
        let formData = new FormData(form);
        d.ajax('', false, formData, false);
    }
}
let dw = new DsynrUtilWp();
dw.ready();
//# sourceMappingURL=DsynrUtilWp.js.map