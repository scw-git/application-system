import request from '@/utils/request'

// 考卷设置
export function getTest() {
    return request({
        url: '/paper-info/list',
        method: 'get',
    })
}
export function saveTest(data) {
    return request({
        url: '/paper-info/save',
        method: 'post',
        data
    })
}
export function updateTest(data) {
    return request({
        url: '/paper-info/upd',
        method: 'post',
        data
    })
}
export function delTest(id) {
    return request({
        url: '/paper-info/del/' + id,
        method: 'get',

    })
}
// 考试设置
export function addExam(data) {
    return request({
        url: '/exam-info/add',
        method: 'post',
        data
    })
}
export function updateExam(data) {
    return request({
        url: '/exam-info/edit',
        method: 'post',
        data
    })
}
export function getExam() {
    return request({
        url: '/exam-info/list',
        method: 'get',

    })
}
export function delExam(id) {
    return request({
        url: '/exam-info/del/' + id,
        method: 'get',

    })
}
export function releaseExam(id) {
    return request({
        url: '/exam-info/post-exam/' + id,
        method: 'get',

    })
}
export function saveExamTime(data) {
    return request({
        url: '/exam-info/time-set',
        method: 'post',
        data
    })
}
export function getExamTimeList() {
    return request({
        url: '/exam-info/get-time',
        method: 'get',

    })
}
