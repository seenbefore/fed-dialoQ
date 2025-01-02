import { Vue } from 'vue-property-decorator'
import { http } from '@/scripts/http'
import { Result } from '@/@types'

interface UploadOptions {
    /** 文件类型限制 */
    accept?: string
    /** 文件大小限制(MB) */
    maxSize?: number
    /** 上传前的钩子函数 */
    beforeUpload?: (file: File) => boolean | Promise<File>
    /** 上传进度回调 */
    onProgress?: (percent: number, file: File) => void
    /** 上传成功回调 */
    onSuccess?: (response: any, file: File) => void
    /** 上传失败回调 */
    onError?: (error: Error, file: File) => void
}

/**
 * 文件上传hook
 * @param options 上传配置项
 * @returns 上传相关方法
 */
export function useUpload(options: UploadOptions = {}) {
    const { accept = '', maxSize = 10, beforeUpload, onProgress, onSuccess, onError } = options

    /**
     * 校验文件类型
     * @param file 文件对象
     */
    const validateFileType = (file: File): boolean => {
        if (!accept) return true
        const acceptTypes = accept.split(',')
        const fileType = file.type || ''
        const fileName = file.name || ''
        return acceptTypes.some(type => {
            const acceptType = type.trim()
            if (acceptType.startsWith('.')) {
                return fileName.toLowerCase().endsWith(acceptType.toLowerCase())
            }
            if (acceptType.includes('/*')) {
                const baseType = acceptType.split('/')[0]
                return fileType.startsWith(baseType)
            }
            return acceptType === fileType
        })
    }

    /**
     * 校验文件大小
     * @param file 文件对象
     */
    const validateFileSize = (file: File): boolean => {
        const isLtMaxSize = file.size / 1024 / 1024 < maxSize
        if (!isLtMaxSize) {
            Vue.prototype.$message.error(`文件大小不能超过 ${maxSize}MB!`)
        }
        return isLtMaxSize
    }

    /**
     * 上传文件
     * @param file 文件对象
     * @param url 上传地址
     */
    const uploadFile = async (file: File, url: string): Promise<void> => {
        try {
            // 校验文件类型
            if (!validateFileType(file)) {
                throw new Error('文件类型不正确!')
            }

            // 校验文件大小
            if (!validateFileSize(file)) {
                throw new Error(`文件大小不能超过 ${maxSize}MB!`)
            }

            // 上传前的钩子
            if (beforeUpload) {
                const result = await beforeUpload(file)
                if (result === false) {
                    return
                }
            }

            const formData = new FormData()
            formData.append('file', file)

            const { data } = await http.request<Result<any>>({
                url,
                method: 'POST',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent: any) => {
                    if (progressEvent.lengthComputable && onProgress) {
                        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        onProgress(percent, file)
                    }
                },
            })

            onSuccess?.(data, file)
        } catch (error) {
            const errorMsg = error.message || '上传失败'
            Vue.prototype.$message.error(errorMsg)
            onError?.(new Error(errorMsg), file)
            throw error
        }
    }

    /**
     * 上传多个文件
     * @param files 文件列表
     * @param url 上传地址
     * @returns Promise 所有文件上传完成后resolve
     */
    const uploadFiles = async (files: FileList | File[], url: string): Promise<void> => {
        try {
            const uploadPromises = Array.from(files).map(file => uploadFile(file, url))
            await Promise.all(uploadPromises)
        } catch (error) {
            // 错误已在uploadFile中处理，这里不需要重复处理
            throw error
        }
    }

    return {
        uploadFile,
        uploadFiles,
    }
}
