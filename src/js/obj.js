function makeArray(collection) {
    return Array.from(collection);
}
function get_rand_array_item(mixed_arr) {
    return mixed_arr[Math.floor(Math.random() * mixed_arr.length)];
}
function get_rand_obj_item(obj) {
    let keys = Object.keys(obj);
    return obj[keys[keys.length * Math.random() << 0]];
}
function addProp(obj, propName, propVal = undefined, overwrite = false) {
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
function updateProps(obj, propSet) {
    lfn('updateProps...');
    for (let prop in propSet) {
        if (propSet.hasOwnProperty(prop)) {
            obj[prop] = propSet[prop];
        }
        l(prop + ':' + obj[prop]);
    }
}
function hasInstance(objList, obj) {
    lfn('hasInstance');
    l(objList);
    let hasIt = false;
    objList.forEach(function (o, i) {
        if (o === obj) {
            hasIt = true;
            return;
        }
    });
    l(hasIt);
    return hasIt;
}
//# sourceMappingURL=obj.js.map