import { http } from '@/entry/third/scripts/http'
const JSEncrypt = require('@/libs/jsencrypt.min.js')
//import JSEncrypt from '@/libs/jsencrypt.min.js'
console.log(2345, JSEncrypt)

/**
 * @description: 获取公钥
 * @return {*}
 */
export const getRsaPublickey = () => {
    return http.post('/rsa/getPublickey')
}

/**
 * @description: 添加用户
 * @param {Object} params_ 参数
 * @param {String} params.realname 姓名
 * @param {String} params.deptId 所属部门
 * @param {String} params.username 用户账号
 * @param {String} params.password 登陆密码
 * @param {String} params.idCard 身份证号
 * @param {String} params.mobile 手机号
 * @param {String} params.roleIds 所属角色
 * @param {0|1} params.mark 是否有效
 * @param {0|1} params.bindQrcode 是否绑定二维码（1：是    0：否）
 * @return {*}
 */
export const addUser = (params_: any = {}) => {
    return getRsaPublickey().then(({ data }) => {
        const encrypt = new JSEncrypt()
        encrypt.setPublicKey(data)
        const params = {
            ...params_,
            password: encrypt.encrypt(params_.$password),
        }
        return http.post('/user/add', params)
    })
}
