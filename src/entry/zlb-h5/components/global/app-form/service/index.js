import { photoCompress } from 'icinfo-util'

/**
 * 判断是否为ie浏览器
 */
export const isIEBrowser = () => {
    let userAgent = navigator.userAgent //取得浏览器的userAgent字符串
    let isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 //判断是否IE<11浏览器
    let isEdge = userAgent.indexOf('Edge') > -1 && !isIE //判断是否IE的Edge浏览器
    let isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
    if (isIE) {
        let reIE = new RegExp('MSIE (\\d+\\.\\d+);')
        reIE.test(userAgent)
        let fIEVersion = parseFloat(RegExp['$1'])
        if (fIEVersion == 7) {
            return 7
        } else if (fIEVersion == 8) {
            return 8
        } else if (fIEVersion == 9) {
            return 9
        } else if (fIEVersion == 10) {
            return 10
        } else {
            return 6 //IE版本<=7
        }
    } else if (isEdge) {
        return 'edge' //edge
    } else if (isIE11) {
        return 11 //IE11
    } else {
        return -1
    }
}

/**
 * blob转file
 */
export const blobToFile = blob => {
    if (isIEBrowser() > -1) {
        blob.lastModifiedDate = new Date()
        return blob
    } else {
        return new File([blob], blob.name, { type: 'image/jpeg' })
    }
}

/**
 * 深度遍历树some方法
 * @param {*} tree
 * @param {*} callback
 * @returns
 */
export const dfsTreeSome = (tree, callback, children = 'children') => {
    if (!Array.isArray(tree)) return
    tree.some(node => {
        const flag = callback(node)
        if (flag) return true
        dfsTreeSome(node[children], callback)
    })
}

/**
 * 深度遍历树some方法（先遍历后回调）
 * @param {*} tree
 * @param {*} callback
 * @returns
 */
export const dfsTreeSomeFirst = (tree, callback, children = 'children') => {
    if (!Array.isArray(tree)) return
    return tree.some(node => {
        const subFlag = dfsTreeSomeFirst(node[children], callback)
        const flag = callback(node, subFlag)
        if (flag) return true
    })
}

/**
 * @description: 深拷贝对象
 * @param {*} obj 需要拷贝的对象
 * @param {*} cache 用于解决循环引用问题的缓存对象
 * @return {*}
 */
export function customDeepClone(obj, cache = new WeakMap()) {
    // 判断传入值，是否是对象
    if (obj === null || obj instanceof HTMLElement || obj instanceof Date || obj instanceof RegExp || typeof obj !== 'object') return obj
    // 从缓存中校对是否已复制
    if (cache.has(obj)) return cache.get(obj)
    // 通过new obj.constructor()巧妙的避免了对当前数据是数组还是真对象的判断
    const result = new obj.constructor()
    // 缓存复制的对象
    cache.set(obj, result)
    // 开始复制
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const _obj = obj[key]
            result[key] = customDeepClone(_obj, cache) //递归复制
        }
    }
    return result
}

/**
 * 压缩base64图片
 */
export const isOrNotCompressPic = (file, base64, cb) => {
    const isImage = new RegExp('image/*').test(file.type)
    const singleMaxSize = 2 * 1024 * 1024 //2M
    // 原图超过2M的都要压缩
    if (isImage && file && file.size > singleMaxSize) {
        const image = new Image() // 创建 img 元素
        image.src = base64
        image.onload = () => {
            const compressParams = {
                width: image.width,
                height: image.height,
                quality: 0.5, //压缩质量
                blob: true,
            }
            photoCompress(file, compressParams, blobData => {
                blobData.name = file.name
                let compressFile = blobToFile(blobData)
                cb && cb(compressFile)
            })
        }
        return
    }
    cb && cb(file)
}
