/**
 * 创建唯一的字符串
 * @return {String} ojgdvbvaua40
 */
export function createUniqueString() {
    const timestamp = +new Date() + ''
    const randomNum = parseInt((1 + Math.random()) * 65536) + ''
    return (+(randomNum + timestamp)).toString(32)
}

/**
 * 获取数据类型
 * @param {any} data 数据
 * @return {String} 'array'
 */
export function getDataType(data) {
    const str = Object.prototype.toString.call(data)
    return str.match(/\s(\w*)\]/)[1].toLowerCase()
}

/**
 * 文件下载
 * @param {String} url 文件下载链接url，带上接口参数
 * @param {String} name 前端自定义的下载文件名，带上文件后缀名，选填
 * chrome会优先使用接口返回的命名，edge会优先使用此name
 */
export function downloadFile(url, name) {
    const ele = document.createElement('a')
    ele.target = '_blank'
    ele.href = url || ''
    ele.download = name || ''
    document.body.appendChild(ele)
    ele.click()
    document.body.removeChild(ele)
}

/**
 * 获取必填项列表
 * @param {String} data 数据源
 * @param {String} columns 需要校验的属性集合
 */
export function getValidList(data = [], columns = []) {
    const handList = data.filter(v => v.dataFromType === 1)
    const validList = []
    let valid = false
    handList.forEach(item => {
        valid = columns.every(opt => item[opt.prop] !== undefined && item[opt.prop] !== '')
        validList.push(valid)
    })
    return validList
}
/* 值不为空校验 */
export function isNotEmpty(v) {
    return v !== undefined && v !== null && v !== ''
}
