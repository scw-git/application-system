function validatePhone(rule, value, callback) {
    if (value === "") {
        callback("账号不能为空！");
    } else if (!/^1\d{10}$/.test(value)) {
        callback('请输入正确的手机号！')
    } else {
        //成功的情况一定要写，否则校验成功不执行代码
        callback()
    }
}
function validateFourNumber(rule, value, callback) {
    if (value === "") {
        callback("编号不能为空！");
    } else if (!/^\d{4}$/.test(value)) {
        callback('请输入4位的编号！')
    } else {
        //成功的情况一定要写，否则校验成功不执行代码
        callback()
    }
}
function validateId(rule, value, callback) {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (value === '') {
        callback('证件号不能为空！')
    } else if (!reg.test(value)) {
        callback('请输入正确的证件号！')
    } else {
        //成功的情况一定要写，否则校验成功不执行代码
        callback()
    }
}
function validatePw1(rule, value, callback) {
    const reg = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,20}/;
    if (value === '') {
        callback('密码不能为空！')
    } else if (!reg.test(value)) {
        callback('密码由8位以上数字，大小写字母，特殊字符组成！')
    } else {
        //成功的情况一定要写，否则校验成功不执行代码
        callback()
    }
}

export { validateFourNumber, validatePhone, validateId, validatePw1 }
