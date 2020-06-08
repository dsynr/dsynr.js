class DsynrUtilWp {

    ready(): void {
        d.getPageScripts(d);
    }

    getForm(formName: string): void {
        d.lfn('getForm');
        if (d.requestDataset[formName] != undefined) {
            d.l(formName + ' Previously loaded / Reinstantiating from memory...');
            d.addFetchedData(d.requestDataset[formName]);
        } else {
            d.ajax(d.domain + 'form/' + formName + '?min', formName);
        }
    }

    getTemplate(name: string, params = {}): void {
        d.lfn('getTemplate / ' + name);
        let formData: object = {
            action: 'getTemplate',
            name: name
        };
        formData = d.mergeObjs(formData, params);
        d.l(formData);
        // @ts-ignore
        d.ajax(dwpRequest.ajaxurl, false, formData, true, 'POST');
    }
}

let dw = new DsynrUtilWp();
dw.ready();