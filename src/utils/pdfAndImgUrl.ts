import http from '@/scripts/http'
import { visit } from '@/services/custom/external'
export const typeMap = {
    pdf: 'data:application/pdf;base64,',
    png: 'data:image/png;base64,',
    jpg: 'data:image/jpg;base64,',
    jpeg: 'data:image/jpeg;base64,',
    gif: 'data:image/gif;base64,',
    svg: 'data:image/svg+xml;base64,',
    mp4: 'data:video/mp4;base64,',
    xml: 'data:text/xml;base64,',
    doc: 'data:application/msword;base64,',
    docx: 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,',
}
export const blobTypeMap = {
    pdf: 'application/pdf',
    png: 'image/png',
    jpg: 'image/jpg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    mp4: 'video/mp4',
}
const isProd = process.env.VUE_APP_ENV === 'prod'
/**
 *
 * @param str 加密字符串
 * @param showFileType 返回是否需要带上文件类型
 * @returns 解密后的数据
 */
export async function getNewUrl(str: string, showFileType = false): Promise<any> {
    if (!str) return ''
    // pdf链接且不是生产环境直接使用地址
    // if (isIframeUrl(str) && !isProd) {
    //     console.log(12345)
    //     return str
    // }

    // if (str.startsWith('https:') || str.startsWith('data:') || str.startsWith('blob:') || handleSuffix(str)) {
    //     if (showFileType) {
    //         return {
    //             url: str,
    //             type: '',
    //         }
    //     }
    //     return str
    // }

    let data = { fileType: '', fileByte: '' }
    // http地址先转化流
    if (str.startsWith('http:') || str.startsWith('https:')) {
        const { data: dataByGetFileVisit } = await http.get(`/common/volume/getFileVisitByFileUrl?fileUrl=${encodeURIComponent(str)}`)
        data = dataByGetFileVisit
    } else {
        const { data: dataByVisit } = await visit({ fileUrlEncrypt: str })
        data = dataByVisit
    }
    data.fileType = data.fileType.split('?')[0]
    if (!data?.fileType) return ''
    data.fileType = data.fileType.toLowerCase()
    //避免base64的pdf很长 转成Blob地址显示
    if (['pdf'].includes(data.fileType)) {
        const fileBlob = base64ToBlob(data.fileByte, blobTypeMap[data.fileType])
        const pdfUrl = window.URL.createObjectURL(fileBlob)
        if (showFileType) {
            return {
                url: pdfUrl,
                type: data.fileType,
            }
        }
        return pdfUrl
    }
    const fileUrl = window.URL.createObjectURL(base64ToBlob(data.fileByte, blobTypeMap[data.fileType]))
    if (showFileType) {
        return {
            url: fileUrl,
            type: data.fileType,
        }
    }
    return typeMap[data.fileType] + data.fileByte
}

export function base64ToBlob(fileBase64, fileType) {
    let raw = window.atob(fileBase64)
    let rawLength = raw.length
    let uint8Array = new Uint8Array(rawLength)
    while (rawLength--) {
        uint8Array[rawLength] = raw.charCodeAt(rawLength)
    }
    return new Blob([uint8Array], { type: fileType })
}
/**判断结尾 */
export function handleSuffix(str: string): boolean {
    return Object.keys(typeMap).some(item => {
        return str.endsWith(`.${item}`) && !str.startsWith('http:')
    })
}
/**获取新的url文件类型 */
export function getUrlType(newUrl) {
    let type = ''
    Object.entries(typeMap).some(([key, val]) => {
        if (newUrl.indexOf(val) > -1) {
            type = key
            return true
        }
    })
    return type
}

/**点击的时候 如果是签字轨迹或视频 就中短流程   throw new Error是为了中断流程 */
export async function handleByteByClick(newUrl, data) {
    if (newUrl.includes('data:text/xml')) {
        const a = document.createElement('a')
        a.href = newUrl
        a.download = data?.label ?? ''
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a) // 下载完移除元素
        throw new Error('打开类型为xml')
    }
    if (newUrl.includes('data:video')) {
        // 拿到base64前缀的第一个,
        const index = newUrl.indexOf(',')
        const fileBlob = await base64ToBlob(newUrl.slice(index + 1), 'video/mp4')
        const blobUrl = window.URL.createObjectURL(fileBlob)
        window.open(blobUrl)
        throw new Error('打开类型为video')
    }
}
/**
 *
 * @param url url为调用getNewUrl后返回的blob地址或者base64
 */
export function isPdf(url: string) {
    return url.includes('blob:')
}

/**
 *
 * @param url url为调用getNewUrl后返回的blob地址或者base64
 */
export function isImg(url: string) {
    return url.includes('data:image/')
}
/**
 *
 * @param url url为调用getNewUrl后返回的blob地址或者base64
 */
export function isMp4(url: string) {
    return url.startsWith('data:video') || url.endsWith('.mp4')
}
/**判断链接是否为正常的文件后缀 */
export function isFileSuffix(str: string) {
    return Object.keys(typeMap).some(item => str.endsWith(`.${item}`))
}
/**是否为一个项目的iframe地址 */
export function isIframeUrl(str: string) {
    return (str.startsWith('http:') || str.startsWith('https:')) && !isFileSuffix(str)
}

/**根据url拿到文件的Blob */
export async function getBlobByUrl(url: string) {
    const { data } = await http.get(`/punish/common/file/operation/getFileVisitByFileUrl?fileUrl=${url}`)
    return {
        url: window.URL.createObjectURL(base64ToBlob(data.fileByte, blobTypeMap[data.fileType])),
        type: data.fileType,
    }
}

/**
 * @description: 根据base64拿到文件的Blob
 * @param {string} base64  不带前缀的base64
 * @param {keyof} type
 * @return {*}
 */
export async function getBlobByBase64(base64: string, type: keyof typeof typeMap = 'pdf') {
    return {
        url: window.URL.createObjectURL(base64ToBlob(base64, blobTypeMap[type])),
        type: type,
    }
}

// 根据文件路径获取文件后缀（类型）
function fileType(url) {
    const newUrl = url ? url.split('?')[0] : ''
    const typeList =
        String(newUrl)
            .toLowerCase()
            .split('.') || []
    return typeList[typeList.length - 1]
}

// 是否为视频文件
export function isVideo(url: string) {
    const videoList = ['mp4', 'webm', 'ogg']
    const type = fileType(url)
    return videoList.includes(type)
}
