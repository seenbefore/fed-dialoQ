/**
 * 生成DataV大屏分享链接
 * 依赖包：crypto、querystring
 * 文档地址：https://help.aliyun.com/zh/datav/datav-7-0/user-guide/use-signature-authentication-to-verify-token-parameters-of-a-published-datav-project
 * @param {Object} options 配置项
 * @param {string} options.token DataV项目的token
 * @param {string} [options.screenID] DataV项目的screenID  /page/${screenID}
 * @param {string} [options.url] DataV项目的完整URL，与screenID二选一
 * @param {Object} [options.params={}] 自定义参数,以datav_sign_开头的参数将参与签名
 * @returns {string} 生成的分享链接
 * @throws {Error} 当必填参数缺失时抛出错误
 * @example
 * const generateDataVShareUrl = require('./datav')
 * // 使用screenID
 * const url1 = generateDataVShareUrl({
 *   token: '93TWnmeBtxxxxxxxxxx3thGyAgzennsS',
 *   screenID: 'b92xxxxxxxxxxxxxxxxxx27b4c538cd4',
 *   params: {
 *     datav_sign_no: 123998
 *   }
 * })
 *
 * // 使用完整URL
 * const url2 = generateDataVShareUrl({
 *   token: '93TWnmeBtxxxxxxxxxx3thGyAgzennsS',
 *   url: 'https://datav.aliyuncs.com/share/page/b92xxxxxxxxxxxxxxxxxx27b4c538cd4',
 *   params: {
 *     datav_sign_no: 123998
 *   }
 * })
 */
function generateDataVShareUrl({ token, screenID, url, params = {} }) {
    // 参数校验
    if (!token) throw new Error('token is required')

    // 从URL中提取screenID
    if (url && !screenID) {
        const match = url.match(/\/share\/page\/([^/?]+)/)
        if (!match) throw new Error('Invalid DataV URL format')
        screenID = match[1]
    }

    if (!screenID) throw new Error('screenID or valid url is required')

    const signedQueryParamReg = /^datav_sign_.*/
    const time = Date.now()

    let signParamsStr = Object.keys(params)
        .filter(paramName => params[paramName] && signedQueryParamReg.test(paramName))
        .sort()
        .map(param => `${param}=${params[param]}`)
        .join('&')

    let stringToSign = [screenID, time]
    if (signParamsStr) stringToSign.push(signParamsStr)
    stringToSign = stringToSign.join('|')

    const signature = require('crypto')
        .createHmac('sha256', token)
        .update(stringToSign)
        .digest()
        .toString('base64')

    const queryParams = {
        _datav_time: time,
        _datav_signature: signature,
        ...params,
    }

    return `https://datav.aliyuncs.com/share/page/${screenID}?${require('querystring').stringify(queryParams)}`
}

module.exports = generateDataVShareUrl
// node src/scripts/utils/datav
// const url = generateDataVShareUrl({
//     token: '93TWnmeBtxxxxxxxxxx3thGyAgzennsS',
//     url: 'https://datav.aliyuncs.com/share/page/b92xxxxxxxxxxxxxxxxxx27b4c538cd4',
//     params: {
//         datav_sign_no222: '11',
//     },
// })
// console.log(url)
