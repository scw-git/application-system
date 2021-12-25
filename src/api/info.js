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
// 工作经历保存
export function saveWork(data) {
    return request({
        url: '/examinee/save-work-experience',
        method: 'post',
        data
    })
}
// 获取工作经历
export function getWork() {
    return request({
        url: '/examinee/get-work-experience',
        method: 'post',

    })
}
// 更新工作经历
export function updateWork(data) {
    return request({
        url: '/examinee/upd-work-experience',
        method: 'post',
        data
    })
}
// 删除工作经历
export function delWork(params) {
    return request({
        url: '/examinee/del-work-experience/' + params,
        method: 'get',

    })
}
// 获取家庭情况
export function getHome(data) {
    return request({
        url: '/examinee/get-family-situation',
        method: 'post',
        data
    })
}
export function saveHome(data) {
    return request({
        url: '/examinee/save-family-situation',
        method: 'post',
        data
    })
}
export function updateHome(data) {
    return request({
        url: '/examinee/upd-family-situation',
        method: 'post',
        data
    })
}
export function delHome(params) {
    return request({
        url: '/examinee/del-family-situation/' + params,
        method: 'get',

    })
}

// 奖惩情况

export function addOther(data) {
    return request({
        url: '/examinee/add_rewards_punishments',
        method: 'post',
        data
    })
}

export function getOther() {
    return request({
        url: '/examinee/get_rewards_punishments',
        method: 'get',

    })
}

