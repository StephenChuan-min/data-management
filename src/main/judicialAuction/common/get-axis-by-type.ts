import { getDateArray, format, add0 } from '../../../utils/some-time-utils';

enum Type {
    day= '1',
    week = '2',
    month = '3',
}


function getAxisByType(type: string): string[] {
    const now = new Date();
    let r: string[] = []
    // 日
    if (type === Type.day) {
        r = getDateArray(31)
    }
    // 周
    if (type === Type.week) {
        let s = now.getTime()
        const day = now.getDay();
        r = [format(s -  86400000)]
        // 昨日时间戳
        s = s - day * 86400000;
        let startDate = format(s)
        for(let i = 11; i > 0; i--) {
            r.unshift(startDate)
            s = s - 7 * 86400000
            startDate = format(s)
        }
    }
    if (type === Type.month) {
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        if (now.getDate() === 1) {
            month = month - 1
        }
        for( let i = 12; i > 0; i--) {
            if (month === 0) {
                year = year - 1;
                month = 12;
            }
            r.unshift(`${year}-${add0(month)}`)
            month = month - 1
        }
    }
    return r;
}

export function dataToSeries(this: any, name: string, data: { countDate: string, [propName: string]: any }[], field: string, date: string[]){
    let index = 0;
    let that = [...this];
    const item = that.filter((v: { name: string, data: any[] }, i: number,) => {
        if (v.name === name) {
            index = i;
            return true
        }
        return false
    })[0];

    console.log(index)

    item.data = [];
    date.forEach(e => {
        if (data.map(v => v.countDate).find(i => e === i)) {
            data.map(v => {
                if (v.countDate === e) {
                    // field = 'different' 特殊处理 name 为 差值 和 -差值
                    if (field === 'different') {
                        if (name === '差值' && v[field] >= 0) {
                            item.data.push(v[field])
                        } else if (name === '-差值' && v[field] < 0) {
                            item.data.push(v[field])
                        } else {
                            item.data.push(null)
                        }
                    } else if (field === 'accumulativeDValue') {
                        if (name === '多于源网站增量' && v[field] >= 0) {
                            item.data.push(v[field])
                        } else if (name === '少于源网站增量' && v[field] < 0) {
                            item.data.push(v[field])
                        } else {
                            item.data.push(null)
                        }
                    } else {
                        item.data.push(v[field])
                    }
                }
            })
        } else {
            item.data.push(null)
        }
    });

    console.log(item)

    if (item) {
        that[index] = item;
    }
    return that;
}

export default getAxisByType