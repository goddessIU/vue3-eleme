/**
 * 返回一个定时器
 * 
 * @param {number} minute 倒计时的分钟
 * @param {number} second 倒计时的秒数
 * @returns {string}  返回要输出的倒计时时间
 */

export function makeCountDonw(minute, second, clockTime) {
    return function () {
        let timer = setInterval(countDown, 1000)
        function countDown() {
            if (second === 0 && minute === 0) {
                clearInterval(timer)
                return;
            } else if (second === 0 && minute !== 0) {
                minute--
                second = 59
            } else if (second !== 0) {
                second--
            }
            let str = ''
            if (minute < 10) {
                str = str + '0' + minute
            } else {
                str += minute
            }
            str += ':'
            if (second < 10) {
                str = str + '0' + second
            } else {
                str += second
            }
            if (clockTime) {
                clockTime.value = str
            }
            
        }
        return timer
    }
}