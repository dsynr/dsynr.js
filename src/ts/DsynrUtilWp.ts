class DsynrUtilWp {

    ready(): void {
        d.getPageScripts(d);
    }

    getWpForm(formName: string): void {
        d.lfn('getWpForm');
        if (d.requestDataset[formName] != undefined) {
            d.l(formName + ' Previously loaded / Reinstantiating from memory...')
            d.addFetchedData(d.requestDataset[formName]);
        } else {
            d.ajax(d.domain + 'form/' + formName + '?min', formName);
        }
    }

    postForm(form: HTMLFormElement): void {
        d.lfn('postForm');
        let formData = new FormData(form);
        d.ajax('', false, formData, false);
    }
}

let dw = new DsynrUtilWp();
dw.ready();