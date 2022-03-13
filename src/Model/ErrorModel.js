//服务器问题报错
class AxiosError extends Error {
    constructor() {
        super()
        this.name = 'AxiosError'
        this.message = '服务端请求失败'
    }
}

//网络问题报错
class TimeOutError extends Error {
    constructor() {
        super()
        this.name = 'TimeOutError'
        this.message = '网络问题'
    }
}

export {
    AxiosError,
    TimeOutError
}