import request from '@/utils/request'

export function getExamList() {
    return request({
        url: '/examinee/exam-list',
        method: 'get',

    })
}
// 获取报名信息表
export function getConfirmForm(id) {
    return request({
        url: '/examinee/confirm-information/' + id,
        method: 'get',

    })
}
// 获取附件文件
export function getFj(id) {
    return request({
        url: '/examinee/get-annex/' + id,
        method: 'get',

    })
}
export function delFj(id) {
    return request({
        url: '/examinee/del-annex/' + id,
        method: 'get',

    })
}
// 最后确认报名
export function signUp(id) {
    return request({
        url: '/examinee/confirm_registration/' + id,
        method: 'get',

    })
}
// 考试缴费
export function payment() {
    return request({
        url: '/examinee/pay-list',
        method: 'get',

    })
}
// 查询报名状态
export function queryStatus() {
    return request({
        url: '/examinee/get-exam-status',
        method: 'get',

    })
}
// 获取成绩列表
export function getScoreList() {
    return request({
        url: '/examinee/get-score-list',
        method: 'get',

    })
}


