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
// 批量审核
export function checkAllPass(data) {
    return request({
        url: '/apply-info/approved-batch',
        method: 'post',
        data
    })
}
// 批量审核不通过
export function checkAllNoPass(data) {
    return request({
        url: '/apply-info/not-approved-batch',
        method: 'post',
        data
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
// 获取面试统计列表
export function getWrittenList(data) {
    return request({
        url: '/apply-info/written-score-list',
        method: 'post',
        data
    })
}
// 填写笔试成绩
export function writtenScore(data) {
    return request({
        url: '/apply-info/written-score-import',
        method: 'post',
        data
    })
}
// 批量导出
export function exportTemplate(data) {
    return request({
        url: '/apply-info/written-score-template',
        method: 'post',
        responseType: 'blob',
        data
    })
}
// 批量导入
export function importData(data) {
    return request({
        url: '/apply-info/written-batch-import',
        method: 'post',
        responseType: 'blob',
        data
    })
}
// 通知单人面试
export function confirmSendIntervie(data) {
    return request({
        url: '/place-info/interview',
        method: 'post',
        data
    })
}
// 批量通知面试
export function allSendIntervie(data) {
    return request({
        url: '/place-info/interview-batch',
        method: 'post',
        data
    })
}
// 获取面试统计列表
export function getInterviewList(data) {
    return request({
        url: '/place-info/arrange-face-list',
        method: 'post',
        data
    })
}
// 填写面试成绩
export function interviewScore(data) {
    return request({
        url: '/place-info/update-interview-score',
        method: 'post',
        data
    })
}

// 导出面试模板
export function exportInterviewTemplate(data) {
    return request({
        url: '/place-info/interview-score-template',
        method: 'post',
        responseType: 'blob',
        data
    })
}
// 获取岗位列表
export function getJobList() {
    return request({
        url: '/exam-info/get-job-unit',
        method: 'get',

    })
}
// 批量发送短线
export function batchSend(data) {
    return request({
        url: '/apply-info/batch-send',
        method: 'post',
        data
    })
}












