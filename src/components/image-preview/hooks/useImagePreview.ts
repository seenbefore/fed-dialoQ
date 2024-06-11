import Vue from 'vue'
import { CombinedVueInstance } from 'vue/types/vue'
import ImagePreview from '../index.vue'

export interface IOptions {
    /* 是否能循环切换 */
    loop?: boolean
    /** 默认显示索引 */
    start?: number
}

/* 打开预览的弹框 */
export const useImagePreview = (url: string | Array<string>, options: IOptions = {} as IOptions): Promise<void> => {
    return new Promise(resolve => {
        if (!url || !url?.length) {
            resolve()
            return
        }
        const imagePreviewVue = Vue.extend(ImagePreview)
        const previewImageInstance = new imagePreviewVue({
            propsData: {
                ...options,
                /* 不需要组件内部挂载到body上了，外部已经挂载到body上了 */
                appendToBody: false,
                url,
            },
        }).$mount() as CombinedVueInstance<Record<never, any> & Vue, object, object, object, Record<never, any>> & { open: () => void }
        const imgElement = previewImageInstance.$el
        document.body.appendChild(imgElement)
        previewImageInstance?.open()
        previewImageInstance.$on('hide', () => {
            previewImageInstance.$destroy()
            document.body.contains(imgElement) && document.body.removeChild(imgElement)
            resolve()
        })
    })
}
