import { ExAxiosInstance } from 'icinfo-request'
import { EventBus } from '@/scripts/utils/EventBus'
export {} /// 这句不能删
declare module 'vue/types/vue' {
    class C {}
    interface Vue {
        $http: ExAxiosInstance
        $notify: import('vant/types/notify').Notify
        $functionInConstruction: () => void
        openNewPage: (path: string, query: any) => void
        $bus: EventBus
        /**
         * h5页面回退
         */
        $back: (reload: boolean) => void
        /**
         * 发送消息
         */
        $postMessage: (data: { type: string; name?: string; title?: string; data?: any }) => void
        /**
         * PC关闭当前标签页 并打开新页面
         */
        $closeCurrentAndOpenView: (params: any) => void
    }
}
