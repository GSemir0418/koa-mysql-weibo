// 用于密码加密处理
const crypto = require('crypto')
// SHA256加密
exports.sha256 = function (data) {
    // 先用sha256算法创建一个hash实例
    // 接着使用update接收一个明文data数据
    // 最后调用digest获取加密后的字符串
    return crypto.createHash('sha256').update(data).digest('hex')
}