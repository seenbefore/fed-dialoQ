import Vue from 'vue'
import { Location } from 'vue-router'
import { Component } from 'vue-property-decorator'
import PageWrapper from '@/components/PageWrapper/index.vue'
import { tagsViewStore, userStore } from '../store/useStore'
import { flatRoutes } from '../router/routes'

@Component({
    components: {
        PageWrapper,
    },
})
export class MyMixins extends Vue {
    get user$() {
        return userStore.info
    }
    /**
     * 跳转新的页面
     */
    $open(location: Location) {
        const { path, query } = location

        let routeUrl = this.$router.resolve({
            path,
            query,
        })
        window.open(routeUrl.href, '_blank')
    }
    /**
     * 跳转新的页面
     */
    $push(location: Location) {
        const { path, query } = location
        const { name = '', fullPath } = this.$route
        this.$router.push({
            path,
            query: {
                ...query,
                name,
                from: fullPath,
            },
        })
    }
    async $go(location: Location) {
        const { path } = location
        await this.$closeTab(path)
        this.$router.push(location)
    }
    /**
     * 关闭当前页面
     */
    async $close(reload = false, redirect = false) {
        const { query = {} } = this.$route
        const { name = '', from = '' } = query
        await tagsViewStore.delView(this.$route)
        // 如果上一页有缓存 保存或修改动作需要更新下上一页的缓存 也可以在上一页路由.meta.noCache=true 这样就不需要这个代码
        if (name && reload === true) {
            await tagsViewStore.delCachedView({
                name, // 上一页的路由名称
            })
        }
        if (redirect) {
            this.$router.push(from as any)
        } else if (query.redirect) {
            this.$router.push(decodeURIComponent(query.redirect as any))
        } else {
            this.$router.go(-1)
        }
    }
    /**
     * 关闭当前页面
     */
    async $closeTab(path?: string) {
        const target: any = flatRoutes.find(item => {
            return item.path === path || item.fullPath === path
        })
        if (target && path) {
            await tagsViewStore.delCachedView({
                name: target.name,
            })
        }
    }
}
