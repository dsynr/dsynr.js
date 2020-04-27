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

function updateProps(obj: Object, propSet: object): void {
    for (let prop in propSet) {
        if (propSet.hasOwnProperty(prop)) {
            obj[prop] = propSet[prop];
        }
    }
}

function addProp(obj: object, propName: string, propVal: any = undefined, overwrite: boolean = false) {
    lfn('addProp');
    l(propName+":"+propVal)
    if (overwrite || !obj.hasOwnProperty(propName)) {
        Object.defineProperty(obj, propName, {
            configurable: true,
            enumerable: true,
            writable: true,
            value: propVal
        });
    }
    // l(obj);
    return obj[propName];
}