/**
 * 判断是否为ie浏览器
 */
export const isIEBrowser = () => {
    const { userAgent } = navigator // 取得浏览器的userAgent字符串
    const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 // 判断是否IE<11浏览器
    const isEdge = userAgent.indexOf('Edge') > -1 && !isIE // 判断是否IE的Edge浏览器
    const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
    if (isIE) {
        const reIE = new RegExp('MSIE (\\d+\\.\\d+);')
        reIE.test(userAgent)
        const fIEVersion = parseFloat(RegExp.$1)
        if (fIEVersion === 7) {
            return 7
        }
        if (fIEVersion === 8) {
            return 8
        }
        if (fIEVersion === 9) {
            return 9
        }
        if (fIEVersion === 10) {
            return 10
        }
        return 6 // IE版本<=7
    }
    if (isEdge) {
        return 15 // edge
    }
    if (isIE11) {
        return 11 // IE11
    }
    return -1
}
/**
 * blob转file
 */
export function blobToFile(blob) {
    if (isIEBrowser() > -1) {
        blob.lastModifiedDate = new Date()
        return blob
    }
    return new File([blob], blob.name, { type: 'image/jpeg' })
}
// 将一个图片 URL 转换为 Base64 编码
export async function urlToBase64(url) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url)
            const blob = await response.blob()
            const reader = new FileReader()
            reader.readAsDataURL(blob)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        } catch (error) {
            console.error(`失败：将一个图片 URL 转换为 Base64 编码`, error)

            reject(error)
        }
    })
}
// 将以base64的图片url数据转换为Blob
export async function base64ToBlob(base64Data) {
    return new Promise((resolve, reject) => {
        try {
            if (base64Data.length <= 256) {
                throw new Error('base64图片数据格式错误')
            }
            var splitData = base64Data.split(',')
            var contentType = splitData[0].split(':')[1]
            var raw = window.atob(splitData[1])
            var rawLength = raw.length
            var uInt8Array = new Uint8Array(rawLength)

            for (var i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i)
            }

            resolve(new Blob([uInt8Array], { type: contentType }))
        } catch (error) {
            console.error(`失败：将以base64的图片url数据转换为Blob`, error)
            reject(error)
        }
    })
}
// 将一个图片文件转换为 Base64 编码
export async function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        } catch (error) {
            console.error(`失败：图片文件转换为 Base64 编码`, error)
            reject(error)
        }
    })
}
// 压缩图片
export function compressBase64Image(oldBase64, options = {}) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = oldBase64
        img.onload = function() {
            try {
                // 默认按比例压缩
                let w = this.width
                let h = this.height
                const scale = w / h
                w = options.width || w
                h = options.height || w / scale
                let quality = 0.7 // 默认图片质量为0.7
                // 生成canvas
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                // 创建属性节点
                const anw = document.createAttribute('width')
                anw.nodeValue = w
                const anh = document.createAttribute('height')
                anh.nodeValue = h
                canvas.setAttributeNode(anw)
                canvas.setAttributeNode(anh)
                ctx.drawImage(this, 0, 0, w, h)
                // 图像质量
                if (options.quality && options.quality <= 1 && options.quality > 0) {
                    quality = options.quality
                }
                // quality值越小，所绘制出的图像越模糊
                const base64 = canvas.toDataURL('image/jpeg', quality)
                resolve(base64)
            } catch (error) {
                console.error(`失败：压缩图片`, error)
                reject(error)
            }
        }
        img.onerror = function() {
            reject(new Error('Image load failed'))
        }
    })
}
/**
 * 压缩图片
 * @param {*} file 图片文件或者url
 * @param {*} options
 * @param {boolean} options.file 是否返回文件 默认 true。 false返回base64
 * @param {boolean} options.blob 是否返回文件blob 默认 false
 * @param {number} options.quality 压缩比例 默认 0.7 quality值越小，所绘制出的图像越模糊
 * @param {number} options.size 文件大小超过多少则压缩 默认2M。 2 * 1024 * 1024
 * @returns
 */

export function compress(
    file,
    options = {
        quality: 0.7,
        blob: false,
        file: true,
        size: 2 * 1024 * 1024,
    },
) {
    return new Promise(async (resolve, reject) => {
        try {
            let result,
                base64,
                name = '无'
            fileSize = 0
            // 如果是图片地址 http://example.com/images/xxx.jpg
            if (typeof file === 'string') {
                // 切割字符串并获取最后一个元素 xxx.jpg
                name = file.split('/').pop()
                base64 = await urlToBase64(file)
                fileSize = base64.length
            } else {
                name = file.name
                // 如果是图片文件 读取图片的base64格式
                base64 = await fileToBase64(file)
                fileSize = file.size
            }
            // 判断文件大小是否超过限制
            if (fileSize > options.size) {
                console.log('文件大小超过限制，压缩图片...')
                // 获取压缩后的base64
                result = await compressBase64Image(base64, options)
            } else {
                console.log('文件大小小于限制，无需压缩')
            }

            if (options.blob) {
                result = await base64ToBlob(result)
            } else if (options.file) {
                result = await base64ToBlob(result)
                result.name = name
                result = blobToFile(result)
            }
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}
