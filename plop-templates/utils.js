const glob = require('glob')
const path = require('path')

// eg: /user/list => UserList
exports.pathToPascalName = function(routePath) {
    // 处理数字开头的路径
    if (/^\d/.test(routePath.replace('/', ''))) {
        routePath = `/app${routePath}`
    }
    routePath = routePath.replace(/\//gi, '-')
    const arr = routePath.split('-')
    return arr
        .map(key => {
            if (key) {
                const result = key.split('')
                return result[0].toUpperCase() + result.slice(1).join('')
            } else {
                return ''
            }
        })
        .join('')
}
// TODO 不合适
exports.getParentRouteView = () => {
    const result = []
    const map = {}
    glob.sync('./src/**/_layout.vue').forEach(dir => {
        const filepath = dir.replace('/_layout.vue', '').split('/views')[1]
        const nameArr = filepath.split('/')
        const name = nameArr[nameArr.length - 1]
        if (!map[filepath] && filepath) {
            result.push({
                name: filepath,
                value: name,
            })
        } else {
            map[filepath] = 1
        }
    })
    return [...result]
}
exports.notEmpty = name => {
    return v => {
        if (!v || v.trim === '') {
            return `${name} is required`
        }
        return true
    }
}
exports.renderApiName = (url, typeKey = '') => {
    const r = /\/\{.*?\}/g
    let suffix = ''

    if (r.test(url)) {
        suffix = url.match(/\{(.*?)\}/)[1]
        suffix = suffix.replace(/^(\w)/, ($, $1) => $1.toUpperCase())
    }

    let apiName = url.replace(/\/\{.*?\}/g, '') // 把{}去掉
    apiName = apiName.replace(/-(\w)/g, ($, $1) => $1) // 把一部分有- 先忽略
    if (apiName.match(/\/(\w*)$/) && apiName.match(/\/(\w*)$/)[1] && apiName.match(/\/(\w*)$/)[1].length > 15) {
        // 如果最后的单词大于七位就直接取最后一位 不然就是全部
        apiName = apiName.match(/\w*?$/) ? apiName.match(/\w*?$/)[0] : apiName
    }
    apiName = apiName.replace(/\/(\w)/g, ($, $1) => $1.toUpperCase()) // 转化驼峰
    apiName = apiName.replace(/^(\w)/, ($, $1) => $1.toUpperCase()) // 首字母大写
    apiName = apiName.replace(RegExp(`(${typeKey})`, 'gi'), '') // 都把方法名都去掉
    apiName = typeKey + apiName // 方法名加上
    apiName = apiName.replace(/^(\w)/, ($, $1) => $1.toLowerCase())

    apiName = apiName + (suffix || '')

    return apiName
}
