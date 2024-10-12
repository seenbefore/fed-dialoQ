import { FileTypeEnum } from '@/scripts/utils/enum/FileTypeEnum'

export const base64ToUnit8Array = (base64: string): Uint8Array => {
    const binaryString = window.atob(base64)
    const len = binaryString.length
    const bytes = new Uint8Array(len)
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i)
    }
    return bytes
}

export const baseDownloadByUrl = (url: string, fileName: string): Promise<void> => {
    return new Promise(resolve => {
        const link = document.createElement('a')
        link.setAttribute('download', fileName)
        link.setAttribute('href', url)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        resolve()
    })
}

export const baseDownloadFile = (byte: string, fileName: string, fileType: FileTypeEnum): Promise<void> => {
    return new Promise(resolve => {
        const blob = new Blob([base64ToUnit8Array(byte)], { type: fileType })
        const url = window.URL.createObjectURL(blob)
        baseDownloadByUrl(url, fileName).then(() => {
            window.URL.revokeObjectURL(url)
            resolve()
        })
    })
}

export const downloadPdf = (byte: string, fileName: string): Promise<void> => {
    return baseDownloadFile(byte, fileName, FileTypeEnum.PDF)
}

export const downloadXlsx = (byte: string, fileName: string): Promise<void> => {
    return baseDownloadFile(byte, fileName, FileTypeEnum.XLSX)
}

export const downloadXlsxByBlob = (blob: any, fileName: string): Promise<void> => {
    return new Promise(resolve => {
        const url = URL.createObjectURL(blob)
        baseDownloadByUrl(url, fileName).then(() => {
            URL.revokeObjectURL(url)
            resolve()
        })
    })
}
