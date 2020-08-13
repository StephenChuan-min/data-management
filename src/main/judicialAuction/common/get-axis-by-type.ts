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

export default getAxisByType