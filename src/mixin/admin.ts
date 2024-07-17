import Vue from 'vue'
import { tagsViewStore } from '@/store/useStore'
/* 全局混入 Vue.mixin */
Vue.mixin({
    methods: {
        // 返回上一页  reload 是否重载上一页
        $goBack(reload = false) {
            const { fullPath, name } = this.$route
            const { from } = this.$route.meta || {}
            if (reload) {
                // 重载上一页
                tagsViewStore.delCachedView({
                    name: from,
                })
            }
            window.history.go(-1)
        },
    },
})
