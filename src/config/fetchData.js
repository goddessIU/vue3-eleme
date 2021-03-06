import axios from "axios";
import { 
    AxiosError,
    TimeOutError
} from '../Model/ErrorModel'

//axios请求配置
// const env = process.env.NODE_ENV
let url =  'https://elm.cangdu.org'
// let url = undefined
// console.log(process.env.NODE_ENV)
// switch (env) {
//     case 'development':
//         url = 'https://elm.cangdu.org';
//         break;
    
// }

const instance = axios.create({
    baseURL: url,
    timeout: 5000,
    withCredentials: true
});


//设置响应拦截器
instance.interceptors.response.use((response) => {
    if (response.status === 200) {
        return response.data
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
