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
