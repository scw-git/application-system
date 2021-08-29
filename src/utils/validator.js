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
// function validatePw1(rule, value, callback) {
//     const reg = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_]+$)(?![a-z0-9]+$)(?![a-z\\W_]+$)(?![0-9\\W_]+$)[a-zA-Z0-9\\W_]{8,20}$/;
//     // const reg = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\\W_!@#$%^&*`~()-+=]+$)(?![0-9\\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\\W_!@#$%^&*`~()-+=]{8,30}$/
//     if (value === '') {
//         callback('密码不能为空！')
//     } else if (!reg.test(value)) {
//         callback('密码规则不正确！')
//     } else {
//         if (this.$refs.phoneRegister.validateField('confirPassword') != '') { }
//     }
// }

export { validatePhone, validateId }
