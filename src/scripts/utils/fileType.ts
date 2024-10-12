/**
 * 判断字符串是否为base64，注意：必须要data开头的。
 * @param str
 */
export const isBase64 = (str: string): boolean => {
    if (str === '' || str.trim() === '') {
        return false
    }
    return /^data:([a-zA-Z]+\/[a-zA-Z0-9-.+]+)?(;charset=[a-zA-Z0-9-]+)?(;base64)?,[A-Za-z0-9+/]+={0,2}$/.test(str)
}
/**
 * 判断是否为http链接，这里简单的通过是否为http开头处理
 * @param url
 */
export const isHttpFileUrl = (url: string): boolean => url.startsWith('http')

export const getFileTypeByBase64 = (src: string) => {
    const match = src.match(/^data:([a-zA-Z]+\/[a-zA-Z0-9-.+]+);base64,/)
    return match?.[1] ?? void 0
}

export const getFileTypeByPath = (src: string) =>
    src
        .split('.')
        .pop()
        ?.toLowerCase() ?? ''

export const getFileType = (src: string) => {
    /* 如果是http链接，获取文件的后缀名称 */
    if (isHttpFileUrl(src)) return getFileTypeByPath(src)
    if (isBase64(src)) return getFileTypeByBase64(src)
    console.error('文件类型获取失败', src)
    return ''
}

export const isImage = (value: string): boolean => {
    if (!value) {
        return false
    }
    if (isBase64(value)) {
        return /^data:image\/(png|jpg|jpeg|gif|bmp|webp);base64,/.test(value)
    }
    if (isHttpFileUrl(value)) {
        return ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'svg'].includes(getFileTypeByPath(value))
    }
    return false
}

export const isPdf = (value: string): boolean => {
    if (isBase64(value)) {
        return /^data:application\/pdf;base64,/.test(value)
    }
    if (isHttpFileUrl(value)) {
        return ['pdf'].includes(getFileTypeByPath(value))
    }
    return false
}
