import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router/index.js'


const service = axios.create({
    baseURL: 'api',
    timeout: 15000
})
service.interceptors.request.use(config => {
    if (sessionStorage.getItem('loginInfo')) {
        config.headers.Authorization = JSON.parse(sessionStorage.getItem('loginInfo')).token
    }
    return config
})
service.interceptors.response.use(
    response => {
        // console.log(1212, response);
        // 二进制数据则直接返回
        if (response.request.responseType === 'blob' || response.request.responseType === 'arraybuffer') {
            return response.data
        }
        const res = response.data
        if (res.code === 200 || res.code === undefined) {
            return res
        } else if (res.code == 401) {

            Message({
                message: res.msg,
                type: 'error',
                duration: 3 * 1000
            })
            // 登录过去重新登录
            let type = JSON.parse(sessionStorage.getItem("loginInfo")).type;
            console.log(33, type);
            if (type == 'student') {
                router.push("login");
            } else {
                router.push("ksbm");
            }
            sessionStorage.removeItem("loginInfo");
            sessionStorage.removeItem("router");
            sessionStorage.removeItem("info");


        } else {
            // console.log('错误拦截信息', response.data);
            Message({
                message: response.data.msg,
                type: 'error',
                duration: 5 * 1000
            })
            return res
            // return Promise.reject(res) //会一直挂起
        }
    },
    error => {
        Message({
            message: error,
            type: 'error',
            duration: 5 * 1000
        })
    }
)


export default service