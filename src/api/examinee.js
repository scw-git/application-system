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
// 批量导出获得文件名称
export function exportTemplate(data) {
    return request({
        url: '/apply-info/written-score-template',
        method: 'post',
        data
    })
}
// 通过文件名称下载文件
export function downloadFile(params) {
    return request({
        url: '/common/download',
        method: 'get',
        responseType: 'blob',
        params
    })
}

