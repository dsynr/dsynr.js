class DsynrWp {
    conf = {
        loadURL: 'load/',
    }

    ready(): void {
        d.lfn('DsynrUtilWp');
        d.getPageScripts(d);
    }

    load(loaderName: string, parent: HTMLElement = d.conf.defaultParent, enableDsynrSelect: boolean = false): void {
        d.lfn('getForm');

        d.lfn('form parent::' + parent);

        if (d.requestDataset[loaderName] != undefined) {
            console.log(loaderName + ' Previously loaded / Reinstantiating from memory...');
            d.addFetchedData(d.requestDataset[loaderName], parent, enableDsynrSelect);
        } else {
            d.ajax(d.conf.domain + this.conf.loadURL + loaderName + '?min', loaderName, false, true, parent, enableDsynrSelect);
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