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
function updateProps(obj, propSet) {
    for (let prop in propSet) {
        if (propSet.hasOwnProperty(prop)) {
            obj[prop] = propSet[prop];
        }
    }
}
function addProp(obj, propName, propVal = undefined) {
    Object.defineProperty(obj, propName, {
        configurable: true,
        enumerable: true,
        writable: true,
        value: propVal
    });
    return obj[propName];
}
//# sourceMappingURL=obj.js.map