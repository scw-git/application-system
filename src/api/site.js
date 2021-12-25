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