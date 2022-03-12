// 判断用户是什么操作系统
//返回true为ios，否则不是
function judgeClient() {
    let userAgent = navigator.userAgent
    console.log(userAgent)
    if (userAgent.includes('iPhone')) {
        return true
    } else {
        return false
    }
}

export default judgeClient