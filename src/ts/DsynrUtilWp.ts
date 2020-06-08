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

    getTemplatePart(registeredActionName: string): void {
        d.lfn('getTemplatePart / ' + registeredActionName);
        let formData = new FormData();
        formData.append('action', registeredActionName);
        formData.append('extra', 'XXXXXXXXX');
        d.l(formData, true);
        // @ts-ignore
        d.ajax(dwpRequest.ajaxurl, false, formData);
    }
}

let dw = new DsynrUtilWp();
dw.ready();