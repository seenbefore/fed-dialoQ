import { useImagePreview } from '@/components/image-preview/hooks/useImagePreview'
import { isImage, isPdf } from '@/scripts/utils'

export const usePreviews = (srcs: string[]): Promise<void[]> => {
    if (!srcs || srcs.length === 0) {
        return Promise.reject()
    }
    return Promise.all(srcs.map(usePreview))
}

export const usePreview = (src: string): Promise<void> => {
    if (!src) {
        return Promise.reject()
    }
    if (isImage(src)) {
        return useImagePreview(src, { loop: true, start: 0 }) as Promise<void>
    }
    if (isPdf(src)) {
        window.open(src)
        return Promise.resolve()
    }
    // 不支持的统一通过widow.open打开
    window.open(src)
    return Promise.reject('不支持预览该类型文件')
}
