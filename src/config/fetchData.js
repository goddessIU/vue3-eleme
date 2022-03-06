import axios from "axios";

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
    timeout: 1000
});


//设置响应拦截器
instance.interceptors.response.use((response) => {
    if (response.status === 200) {
        return response.data
    } else {
        console.error('请求失败')
    }
})


export default instance
