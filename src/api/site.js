import request from '@/utils/request'

export function getWritten() {
    return request({
        url: '/place-info/list',
        method: 'get',

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


