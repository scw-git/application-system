import request from '@/utils/request'

export function profile(data) {
    return request({
        url: '/exam-set/forgot-verify',
        method: 'post',
        data
    })
}
export function basic(data) {
    return request({
        url: '/examinee/examine-base-upload',
        method: 'post',
        data
    })
}
export function getBasic() {
    return request({
        url: '/examinee/get-examine-base',
        method: 'post',

    })
}
export function getImage() {
    return request({
        url: '/examinee/get-personal-picture',
        method: 'post',

    })
}
export function getStudyWork() {
    return request({
        url: '/examinee/get-lnw',
        method: 'post',

    })
}
export function saveStudyWork(data) {
    return request({
        url: '/examinee/save-lnw',
        method: 'post',
        data
    })
}
// 添加学习经历
export function saveStudy(data) {
    return request({
        url: '/examinee/save-learning-experience',
        method: 'post',
        data
    })
}
// 获取学习经历
export function getStudy() {
    return request({
        url: '/examinee/get-all-learning-experience',
        method: 'post',

    })
}
// 更新学习经历
export function updateStudy(data) {
    return request({
        url: '/examinee/upd-learning-experience',
        method: 'post',
        data
    })
}
export function delStudy(params) {
    return request({
        url: '/examinee/del-learning-experience/' + params,
        method: 'get',

    })
}


