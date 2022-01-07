import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}
export function loginAdmin(data) {
    return request({
        url: '/admin-login',
        method: 'post',
        data
    })
}
// 获取用户详细信息报考权限
export function getInfo() {
    return request({
        url: '/getInfo',
        method: 'get'
    })
}
// 获取路由
export function getRouters() {
    return request({
        url: '/getRouters',
        method: 'get'
    })
}
