
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

export {
    getDateArray,
    format,
    add0,
}