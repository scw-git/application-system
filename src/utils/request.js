import axios from 'axios'
import { message } from 'ant-design-vue'

const service = axios.create({
    baseURL: 'api',
    timeout: 5000
})
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code === 200) {
            return res
        } else {
            message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(res)
        }
    },
    error => {
        console.log('错误', error);
        message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
    }
)
export default service