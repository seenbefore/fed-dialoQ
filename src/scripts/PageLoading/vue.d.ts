import Vue from 'vue'
import { TLoadingOptins } from './index'
declare module 'vue/types/vue' {
    interface Vue {
        $pageLoading: {
            show: (options?: TLoadingOptins) => void
            hide: () => void
        }
    }
}
