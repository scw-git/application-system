import CryptoJS from 'crypto-js'
const key = CryptoJS.enc.Utf8.parse('1234567890abcdef') //密钥
// 初始向量 initial vector 16 位，key 和 iv 可以一致
const iv = CryptoJS.enc.Utf8.parse("1234567890abcdef")
// AES加密
function encrypt(data) {
    // 传入的 data key iv必须是字符串，使用CryptoJS.enc.Utf8.parse()
    let _data = CryptoJS.enc.Utf8.parse(data)
    let encrypted = CryptoJS.AES.encrypt(_data, key, {
        iv: iv,
        model: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    // 加密后要转换成字符串才能查看
    return encrypted.toString()
}
// 解密
function decrypt(encrypted) {
    let decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    return CryptoJS.enc.Utf8.stringify(decrypted)
}

export { encrypt, decrypt }
