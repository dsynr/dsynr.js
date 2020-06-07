function makeArray(collection: any): Array<any> {
    return Array.from(collection);
}

function get_rand_array_item(mixed_arr: any): any {
    return mixed_arr[Math.floor(Math.random() * mixed_arr.length)];
}

function get_rand_obj_item(obj: object) {
    let keys: Array<any> = Object.keys(obj);
    return obj[keys[keys.length * Math.random() << 0]];
}

function addProp(obj: object, propName: string, propVal: any = undefined, overwrite: boolean = false): any {
    if (overwrite || !obj.hasOwnProperty(propName)) {
        Object.defineProperty(obj, propName, {
            configurable: true,
            enumerable: true,
            writable: true,
            value: propVal
        });
    }
    return obj[propName];
}

function updateProps(obj: object, propSet: object): void {
    lfn('updateProps...');
    for (let prop in propSet) {
        if (propSet.hasOwnProperty(prop)) {
            obj[prop] = propSet[prop];
        }
        l(prop + ':' + obj[prop]);
    }
}

function mergeObjs(main: object, sub: object): object {
    for (let prop in sub) {
        main[prop] = sub[prop];
    }
    return main;
}

function hasInstance(objList: Array<object>, obj: object): boolean {
    lfn('hasInstance');
    l(objList);
    let hasIt: boolean = false;
    objList.forEach(function (o, i) {
        if (o === obj) {
            hasIt = true;
            return;
        }
    });
    l(hasIt);
    return hasIt;
}