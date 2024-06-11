import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { tagsViewStore } from '../store/useStore'
import { Route } from 'vue-router'
@Component({
    components: {},
})
export class BasePage extends Vue {
    /**
     * 后退
     */
    async $goBack(reload = false) {
        const visitedViews = tagsViewStore.visitedViews
        // 上一页内容
        const lastView = visitedViews[visitedViews.length - 2]

        if (lastView) {
            if (reload) {
                await tagsViewStore.delCachedView({
                    name: lastView.name,
                })
                // TODO 不准确
                setTimeout(() => {
                    document.documentElement.scrollTop = 0
                }, 10)
            }
        }

        this.$router.go(-1)
    }
    $getHistory() {
        const visitedViews = tagsViewStore.visitedViews
        const { fullPath } = this.$route
        let index = -1
        visitedViews.forEach((item: Route, i) => {
            if (item.fullPath === fullPath) {
                index = i
            }
        })
        if (index > -1) {
            return visitedViews.slice(index + 1)
        } else {
            return null
        }
    }
    /**
     * 前进
     */
    async $push(options: any) {
        const visitedViews = tagsViewStore.visitedViews
        const path = typeof options === 'string' ? options : options.path
        const result = visitedViews.find(item => item.fullPath === path)

        if (result) {
            await tagsViewStore.delCachedView({
                name: result.name,
            })
            // TODO 不准确
            setTimeout(() => {
                document.documentElement.scrollTop = 0
            }, 10)
        }

        this.$router.push(options)
    }
}
