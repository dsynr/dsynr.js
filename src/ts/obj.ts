function makeArray(collection: any): Array<any> {
    return Array.from(collection);
}

function get_rand_array_item(mixed_arr: any): any {
    return mixed_arr[Math.floor(Math.random() * mixed_arr.length)];
}

function get_rand_obj_item(obj: Object) {
    let keys: Array<any> = Object.keys(obj);
    return obj[keys[keys.length * Math.random() << 0]];
}
