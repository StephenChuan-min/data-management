// 枚举与map互相转换方法
export function mapEnumeration(item: any, valueField = 'value', label = 'label'): object {
    let r = {};
    if (Array.isArray(item) && item.length > 0) {
        // @ts-ignore
        item.forEach(i => r[i[valueField]] = i[label]);
    }
    if (item.constructor === Object) {
        r = Object.keys(item).map(key => ({ [label]: item[key], [valueField]: key }));
    }
    return r;
}

// 获取对象数组内对应的值的item
export function getItemInArray(array: any[], key: string, value: string | number, field: string) {
    const item = array.filter(v => v[key] === value)
    if (item.length > 0) {
        return item[0][field]
    } else {
        return null
    }
}

// 向上取整
export function mathCeil(num: number) {
    let r = 0;
    const l = String(Number.parseInt(String(num), 10)).length;
    const str = new Array(l).fill(0).join('');
    const a = String(num)[0];
    if (a === '9') {
        r = Number(`1${str}`);
    } else {
        r = Number(`${Number(a) + 1}${str.substring(1)}`);
    }
    return r;
}
