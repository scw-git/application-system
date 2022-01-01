import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
    baseURL: 'api',
    timeout: 5000
})
service.interceptors.request.use(config => {
    if (sessionStorage.getItem('loginInfo')) {
        config.headers.Authorization = JSON.parse(sessionStorage.getItem('loginInfo')).token
    }
    console.log(config);
    return config
})
service.interceptors.response.use(
    response => {

        const res = response.data
        if (res.code === 200 || res.code === undefined) {
            return res
        } else {
            console.log('错误拦截信息', response.data);
            Message({
                message: response.data.msg,
                type: 'error',
                duration: 5 * 1000
            })
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