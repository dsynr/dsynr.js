class DsynrWp {
    conf = {
        formURL: 'form/',
    }

    ready(): void {
        d.lfn('DsynrUtilWp');
        d.getPageScripts(d);
    }

    getForm(formName: string, parent: HTMLElement = d.conf.defaultParent, enableDsynrSelect: boolean = false): void {
        d.lfn('getForm');

        d.lfn('form parent::' + parent);

        if (d.requestDataset[formName] != undefined) {
            console.log(formName + ' Previously loaded / Reinstantiating from memory...');
            d.addFetchedData(d.requestDataset[formName], parent, enableDsynrSelect);
        } else {
            d.ajax(d.conf.domain + this.conf.formURL + formName + '?min', formName, false, true, parent, enableDsynrSelect);
        }
    }

    ajax(params = {}, parent: HTMLElement = d.conf.defaultParent): void {
        d.lfn('ajax / ' + name);
        let formData: object = d.mergeObjs({action: 'dw_ajax'}, params);
        console.log(formData);
        // @ts-ignore
        d.ajax(ajxRequest.ajaxurl, false, formData, true, parent, 'POST');
    }
}

let dw = new DsynrWp();