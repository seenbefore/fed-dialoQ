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
        $back: any
    }
}
