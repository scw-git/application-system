import request from '@/utils/request'

export function register(data) {
    return request({
        url: '/exam-set/register',
        method: 'post',
        data
    })
}
// 获取验证码
export function getCode(data) {
    return request({
        url: '/sms/get-code',
        method: 'post',
        data
    })
}
// 验证验证码
export function verifyCode(data) {
    return request({
        url: '/exam-set/forgot-verify',
        method: 'post',
        data
    })
}
// 重置密码
export function resetPassword(data) {
    return request({
        url: '/exam-set/forget-password',
        method: 'post',
        data
    })
}

