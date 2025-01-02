import { http } from '@/scripts/http'

/**
 * 从URL下载文件
 * @param url 文件URL
 * @param filename 下载后的文件名
 * @returns Promise<void>
 */
export const useUrlDownload = async (url: string, filename?: string): Promise<void> => {
    if (!url) {
        return Promise.reject('下载地址不能为空')
    }

    try {
        const response = await http.request({
            url,
            method: 'GET',
            responseType: 'blob',
        })

        const blob = new Blob([response.data])
        return useBlobDownload(blob, filename || getFilenameFromUrl(url))
    } catch (error) {
        return Promise.reject('下载失败')
    }
}

/**
 * 从Blob下载文件
 * @param blob Blob数据
 * @param filename 下载后的文件名
 * @returns Promise<void>
 */
export const useBlobDownload = (blob: Blob, filename: string): Promise<void> => {
    if (!blob) {
        return Promise.reject('文件内容不能为空')
    }

    try {
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
        return Promise.resolve()
    } catch (error) {
        return Promise.reject('下载失败')
    }
}

/**
 * 从URL中获取文件名
 * @param url 文件URL
 * @returns string
 */
const getFilenameFromUrl = (url: string): string => {
    const parts = url.split('/')
    const filenameWithQuery = parts[parts.length - 1]
    const filename = filenameWithQuery.split('?')[0]
    return decodeURIComponent(filename)
}
