
// 获取时间年月日
function add0(m: number){return m<10?'0'+m:m }
function format(shijianchuo: number) {
//shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y+'-'+add0(m)+'-'+add0(d);
}

// 获取从今天开始往前推n天的日期数组，is是否包含今天
function getDateArray(n: number, is: boolean = false): string[] {
    let startDate = new Date().toLocaleString()
    let current: number = new Date().getTime()
    if (!is) {
        current = current - 86400000
        startDate = format(current)
    }
    let r = [startDate];
    for (let i = n - 1; i > 0; i--) {
        current= current - 86400000
        r.unshift(format(current))
    }
    return r
}

// 获得某月的最后一天
function getLastDay(year: number, month: number) {
    let newYear = year; // 取当前的年份
    let newMonth = month;// 取下一个月的第一天，方便计算（最后一天不固定）
    if (month > 12) {
        newMonth = 12; // 月份减
        newYear += 1; // 年份增
    }
    const newDay = new Date(newYear, newMonth, 1); // 取当年当月中的第一天
    return (newDay.getTime() - 1000 * 60 * 60 * 24);// 获取当月最后一天日期
}

const formatType = 'YYYY-MM-DD'


export {
    getDateArray,
    format,
    add0,
    formatType,
    getLastDay,
}