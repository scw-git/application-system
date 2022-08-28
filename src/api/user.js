import request from '@/utils/request'

// 获取菜单权限
export function getRoleList(params) {
    return request({
        url: '/system/role/list',
        method: 'get',
        params
    })
}
// 获取菜单列表
export function getMenuList() {
    return request({
        url: '/system/menu/list',
        method: 'get',

    })
}
// 添加角色
export function addRole(data) {
    return request({
        url: '/system/role',
        method: 'post',
        data
    })
}
// 启用或者停用角色
export function updateRoleStatus(data) {
    return request({
        url: '/system/role/changeStatus',
        method: 'post',
        data
    })
}

// 编辑角色
export function editRole(data) {
    return request({
        url: '/system/role/edit',
        method: 'post',
        data
    })
}
// 删除角色
export function delRole(id) {
    return request({
        url: '/system/role/' + id,
        method: 'post',

    })
}
// 获取已经选择了的菜单权限
export function getSelected(id) {
    return request({
        url: '/system/menu/roleMenuTreeselect/' + id,
        method: 'get',

    })
}
// 获取新增的菜单权限
export function getUnSelected() {
    return request({
        url: '/system/menu/treeselect',
        method: 'get',

    })
}

// 新增组名
export function saveGroup(data) {
    return request({
        url: '/system/dept',
        method: 'post',
        data
    })
}
// 更新组名
export function updateGroup(data) {
    return request({
        url: '/system/dept/edit',
        method: 'post',
        data
    })
}
// 删除组名
export function delGroup(id) {
    return request({
        url: '/system/dept/' + id,
        method: 'post',

    })
}
// 获取组名列表
export function getGroup() {
    return request({
        url: '/system/dept/list',
        method: 'get',

    })
}
// 添加用户
export function addUser(data) {
    return request({
        url: '/system/user',
        method: 'post',
        data
    })
}
// 更新用户
export function updateUser(data) {
    return request({
        url: '/system/user/edit',
        method: 'post',
        data
    })
}
// 删除用户
export function delUser(id) {
    return request({
        url: '/system/user/' + id,
        method: 'post',
    })
}
// 获取用户信息
export function getUserInfo(id) {
    return request({
        url: '/system/user/' + id,
        method: 'get',

    })
}

// 获取用户列表
export function getUserList(params) {
    return request({
        url: '/system/user/list',
        method: 'get',
        params
    })
}
// 开启或者停用用户账号
export function changeUserStatus(data) {
    return request({
        url: '/system/user/changeStatus',
        method: 'post',
        data
    })
}
//修改用户密码
export function updatePassword(data) {
    return request({
        url: '/system/user/resetPwd',
        method: 'post',
        data
    })
}















