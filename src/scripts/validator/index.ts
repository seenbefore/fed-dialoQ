/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: any) {
    return /^(https?:|mailto:|tel:)/.test(path)
}
/**
 * 邮箱
 * @param {*} s
 */
export function isEmail(s: any) {
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile(s: any) {
    return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone(s: any) {
    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL(s: any) {
    return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 描述
 * @date 2021-02-08
 * @param {String | Number} id
 * @returns {Boolean}
 */

export function isCodeID(id: any) {
    return /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(id)
}
