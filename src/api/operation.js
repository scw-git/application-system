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