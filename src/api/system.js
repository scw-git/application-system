import request from '@/utils/request'

// 获取准考证注意事项
export function saveOther(data) {
    return request({
        url: '/note-info/save-note',
        method: 'post',
        data
    })
}
export function getOther() {
    return request({
        url: '/note-info/get-note',
        method: 'get',

    })
}
// 获取笔试准考证信息
export function getWrittenInfo(id) {
    return request({
        url: '/examinee/get-amission-ticket/' + id,
        method: 'get',

    })
}
// 获取列表
export function getList() {
    return request({
        url: '/examinee/get-ticket-list',
        method: 'get',

    })
}
// 添加公告
export function addNotice(data) {
    return request({
        url: '/system/notice',
        method: 'post',
        data
    })
}

export function updateNotice(data) {
    return request({
        url: '/system/notice',
        method: 'put',
        data
    })
}
export function delNotice(id) {
    return request({
        url: '/system/notice/' + id,
        method: 'delete',

    })
}
// 获取公告列表
export function getNoticeList(params) {
    return request({
        url: '/system/notice/list',
        method: 'get',
        params
    })
}



// 获取操作日志列表
export function getLoglist(query) {
    return request({
        url: '/monitor/operlog/list',
        method: 'get',
        params: query
    })
}
// 面试准考证信息
export function getFaceInfo(id) {
    return request({
        url: '/examinee/get-interview-ticket/' + id,
        method: 'get',

    })
}






