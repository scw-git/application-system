import request from '@/utils/request'

export function getWritten(data) {
    return request({
        url: '/place-info/list',
        method: 'post',
        data
    })
}
export function addWritten(data) {
    return request({
        url: '/place-info/add-written-place',
        method: 'post',
        data
    })
}
// export function updateWritten(data) {
//     return request({
//         url: '/place-info/edit',
//         method: 'post',
//         data
//     })
// }

export function getImage() {
    return request({
        url: '/examinee/get-personal-picture',
        method: 'post',

    })
}

// 获取安排考场
export function getArrangeSite() {
    return request({
        url: '/exam-info/get-recruitment-job-info',
        method: 'get',

    })
}

// 确认安排考场

export function confirArrangeSite(data) {
    return request({
        url: '/exam-info/arrange-place',
        method: 'post',
        data
    })
}
// 编辑笔试考场
export function updateWrittenSite(data) {
    return request({
        url: '/place-info/upd-written-place',
        method: 'post',
        data
    })
}


// 新建面试地点
export function addInterviewSite(data) {
    return request({
        url: '/place-info/add-face-place',
        method: 'post',
        data
    })
}
// 获取面试地点列表
export function getInterviewSiteList(data) {
    return request({
        url: '/place-info/getFaceList',
        method: 'post',
        data
    })
}
// 编辑面试地点
export function editSite(data) {
    return request({
        url: '/place-info/edit-face-place',
        method: 'post',
        data
    })
}
// 删除面试地点
export function delSite(id) {
    return request({
        url: '/place-info/del-face-place/' + id,
        method: 'get',

    })
}

// 批量设置考场
export function setAllSite(data) {
    return request({
        url: '/place-info/add-written-place-batch',
        method: 'post',
        data

    })
}
// 删除笔试考场
export function delWrittenSite(data) {
    return request({
        url: '/place-info/del-written-place',
        method: 'post',
        data

    })
}
// 批量安排笔试考场
export function setAllWrittenSite(data) {
    return request({
        url: '/exam-info/arrange-batch-place',
        method: 'post',
        data

    })
}





