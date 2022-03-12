// 获取数据
import instance from '../config/fetchData'
//获取二维码
const useCodeEffect = () => {
    const getCode = () => {
        return instance.post('/v1/captchas')
    }
    return {
        getCode
    }
}


// 重置密码
const resetPassword = async (account, oldPass, newPass, reNewPass, code) => {
    let data = await instance.post('/v2/changepassword', {
        data: {
            username: account,
            oldpassWord: oldPass,
            newpassword: newPass,
            confirmpassword: reNewPass,
            captcha_code: code
        }
    })
    return data
}


// 登录
const goLogin = async ({username, password, captcha_code}) => {
    let data = await instance.post('/v2/login', {
        data: {
            username,
            password,
            captcha_code
        }
    })
    return data
}








export { useCodeEffect, resetPassword, goLogin }

