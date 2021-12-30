import request from '@/utils/request'

// 获取待审核
export function getDsh(data) {
    return request({
        url: '/apply-info/list',
        method: 'post',
        data
    })
}
// 在待审核中点击审核查看获取数据
export function getDshDetail(id) {
    return request({
        url: '/apply-info/detail/' + id,
        method: 'get',

    })
}
// 审核通过
export function checkPass(id) {
    return request({
        url: '/apply-info/approved/' + id,
        method: 'get',

    })
}
// 审核不通过
export function checkNoPass(data) {
    return request({
        url: '/apply-info/not-approved',
        method: 'post',
        data
    })
}

