import axios from "axios";
import { 
    AxiosError,
    TimeOutError
} from '../Model/ErrorModel'

//axios请求配置
const env = process.env.NODE_ENV
let url = undefined
switch (env) {
    case 'development':
        url = 'https://elm.cangdu.org';
        break;
}
const instance = axios.create({
    baseURL: url,
    timeout: 5000
});


//设置响应拦截器
instance.interceptors.response.use((response) => {
    if (response.status === 200) {
        if (response.data.status === 0) {
            throw new AxiosError()
        } else {
            return response.data
        }
    } else {
        throw new AxiosError()
    }
}, (error) => {
    if (error.message.includes('timeout')) {
        throw new TimeOutError()
    }
    throw new Error()
})


export default instance
