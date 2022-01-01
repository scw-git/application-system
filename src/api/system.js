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
