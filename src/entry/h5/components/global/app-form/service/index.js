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
