import Vue from 'vue'
import { ElMessage, ElMessageBox } from 'element-ui'

declare module 'vue/types/vue' {
    interface Vue {
        $message: ElMessage
        $confirm: ElMessageBox.confirm
        $modalDialog: (component: () => Promise<any>, props?: any) => Promise<any>
    }
}

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        confirm?: (result?: any) => void
        cancel?: () => void
    }
}
