<template>
    <div class="Index">
        <keep-alive :include="cachedViews" v-if="$route.meta.keepAlive">
            <router-view :key="key"></router-view>
        </keep-alive>
        <router-view v-else></router-view>
        <BackToHome />
    </div>
</template>

<script lang="ts">
import { IBaseVisitedView } from '@@core/common/store/BaseTagsViewStore'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { tagsViewStore } from '@h5/store/useStore'
import BackToHome from '@/components/h5/BackToHome/index.vue'

@Component({
    name: 'Index',
    components: {
        BackToHome,
    },
})
export default class Index extends Vue {
    getHistory() {
        const visitedViews = tagsViewStore.visitedViews
        const { fullPath } = this.$route
        let index = -1
        visitedViews.forEach((item, i) => {
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
    get cachedViews() {
        return tagsViewStore.cachedViews
    }
    get key() {
        const keys1 = Object.keys(this.$route.query)
        const keys2 = Object.keys(this.$route.params)

        if (keys1.length || keys2.length) {
            return this.$route.fullPath
        }
        return undefined
    }
    @Watch('$route')
    onRouteChange(newVal: Route) {
        const views = this.getHistory()
        // 返回
        if (views) {
            // console.log('回退', views)
            // 销毁历史页面，比如当前页面
            for (let item of views) {
                //console.log('item', item)
                tagsViewStore.DEL_CACHED_VIEW(item)
                tagsViewStore.DEL_VISITED_VIEW(item)

                this.$nextTick(() => {
                    this.addTags()
                })
            }
        } else {
            // console.log('前进')
            this.addTags()
        }
    }

    addTags() {
        const { name, meta = {}, query, params, path, fullPath, hash } = this.$route
        const keepAlive = meta.keepAlive || false
        const noCache = meta.noCache || false

        const view: IBaseVisitedView = {
            title: meta.title || name,
            _: (query._ as string) || '',
            query: {
                ...query,
            },
            params: {
                ...params,
            },
            path,
            fullPath,
            hash,
            name: name || '',

            meta: {
                ...meta,
            },
        }
        if (name) {
            tagsViewStore.addView(view)
        }
    }
    mounted() {
        this.addTags()
    }
}
</script>

<style lang="less" scoped>
.Index {
    font-size: 16px;
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>
