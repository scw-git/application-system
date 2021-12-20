import request from '@/utils/request'

export function profile(data) {
    return request({
        url: '/exam-set/forgot-verify',
        method: 'post',
        data
    })
}