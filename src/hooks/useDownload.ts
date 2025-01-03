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

/**
 * @description 接收数据流生成 blob，创建链接，下载文件
 * @param {Function} api 导出表格的api方法 (必传)
 * @param {string} tempName 导出的文件名 (必传)
 * @param {object} params 导出的参数 (默认{})
 * @param {string} fileType 导出的文件格式 (默认为.xlsx)
 */

export const useDownload = async (api: () => Promise<any>, tempName = '', fileType = '.xlsx') => {
    try {
        const res = await api()
        if (res.headers['content-disposition']) {
            tempName = decodeURI(res.headers['content-disposition'].split(';')[1].split('=')[1])
        } else {
            tempName = tempName || new Date().getTime() + fileType
        }

        if (res.status !== 200 || res.data == null || !(res.data instanceof Blob)) {
            throw new Error('导出失败，请稍后再试！')
        }
        const blob = new Blob([res.data])
        // 兼容 edge 不支持 createObjectURL 方法
        if ('msSaveOrOpenBlob' in ((navigator as unknown) as any)) {
            ;((window.navigator as unknown) as any).msSaveOrOpenBlob(blob, tempName + fileType)
        }
        const blobUrl = window.URL.createObjectURL(blob)
        const exportFile = document.createElement('a')
        exportFile.style.display = 'none'
        exportFile.download = tempName
        exportFile.href = blobUrl
        document.body.appendChild(exportFile)
        exportFile.click()
        // 去除下载对 url 的影响
        document.body.removeChild(exportFile)
        window.URL.revokeObjectURL(blobUrl)
    } catch (error) {
        // console.log(error)
        throw error
    }
}
