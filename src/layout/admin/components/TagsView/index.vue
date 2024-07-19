<template>
    <div id="tags-view-container">
        <div class="tags-view-container">
            <scroll-pane ref="scrollPane" class="tags-view-wrapper" @scroll="handleScroll">
                <router-link
                    v-for="tag in visitedViews"
                    ref="tag"
                    :key="tag.fullPath"
                    :class="[isActive(tag) ? 'active' : '']"
                    :to="{
                        path: tag.path,
                        query: tag.query,
                        fullPath: tag.fullPath,
                    }"
                    tag="span"
                    class="tags-view-item"
                    @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : ''"
                    @contextmenu.prevent.native="openMenu(tag, $event)"
                >
                    <template v-if="tag._">{{ tag._.slice(0, 8) }}</template>
                    <template v-else>
                        {{ tag.meta.title }}
                    </template>
                    <span v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
                </router-link>
            </scroll-pane>
            <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
                <!-- <li @click="refreshSelectedTag(selectedTag)">刷新</li> -->
                <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
                    关闭
                </li>
                <li @click="closeOthersTags">关闭其他</li>
                <li @click="closeAllTags(selectedTag)">关闭所有</li>
            </ul>
        </div>
    </div>
</template>

<script>
import ScrollPane from './ScrollPane'
import path from 'path'
import { findChildrenByPath } from '@/scripts/utils'
import { userStore, tagsViewStore } from '@/store/useStore'
import { routes } from '@/router'

export default {
    components: { ScrollPane },
    props: {
        store: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    data() {
        return {
            visible: false,
            top: 0,
            left: 0,
            selectedTag: {},
            affixTags: [],
            views: {},
        }
    },
    computed: {
        permission_menus() {
            return userStore.menus
        },

        visitedViews() {
            return tagsViewStore.visitedViews
        },
        routes() {
            return routes.map(item => {
                const { component, ...rest } = item
                return rest
            })
        },
    },
    watch: {
        $route(newVal, oldVal) {
            const { path, fullPath, name, query } = newVal
            const reload = query.reload

            // if (name) {
            //     // 针对统一组件不同参数query 不在缓存组件
            //     if (
            //         this.views[name] &&
            //         this.views[name].fullPath !== fullPath
            //     ) {
            //         tagsViewStore.DEL_CACHED_VIEW(this.views[name])
            //         tagsViewStore.DEL_VISITED_VIEW(this.views[name])

            //         this.$nextTick(() => {
            //             this.views[name] = newVal
            //             this.addTags()
            //             this.moveToCurrentTag()
            //         })
            //     } else {
            //         this.views[name] = newVal
            //         this.addTags()
            //         this.moveToCurrentTag()
            //     }
            // }
            if (name) {
                this.addTags(oldVal.fullPath)
                this.moveToCurrentTag()
            }
        },
        visible(value) {
            if (value) {
                document.body.addEventListener('click', this.closeMenu)
            } else {
                document.body.removeEventListener('click', this.closeMenu)
            }
        },
    },
    mounted() {
        this.initTags()
        this.addTags()
    },
    methods: {
        isActive(route) {
            //return route.path === this.$route.path
            return route.fullPath === this.$route.fullPath
        },
        isAffix(tag) {
            if (tag.fullPath) {
                const affix = tag.fullPath.indexOf('affix=0') === -1

                return tag.meta && tag.meta.affix && affix
            } else {
                return tag.meta && tag.meta.affix
            }
        },
        filterAffixTags(routes, basePath = '/') {
            let tags = []
            routes.forEach(route => {
                if (route.meta && route.meta.affix) {
                    const tagPath = path.resolve(basePath, route.path)
                    tags.push({
                        query: {},
                        fullPath: tagPath,
                        path: tagPath,
                        name: route.name,
                        meta: { ...route.meta },
                    })
                }
                if (route.children) {
                    const tempTags = this.filterAffixTags(route.children, route.path)
                    if (tempTags.length >= 1) {
                        tags = [...tags, ...tempTags]
                    }
                }
            })
            tags = tags.sort((a, b) => b.meta.affix - a.meta.affix)
            return tags
        },
        initTags() {
            const affixTags = (this.affixTags = this.filterAffixTags(this.routes))
            for (const tag of affixTags) {
                // Must have tag name
                if (tag.name) {
                    tagsViewStore.addVisitedView(tag)
                }
            }
        },
        addTags(fromPath = '') {
            const { name, meta = {}, query, params, path, fullPath, hash } = this.$route
            const view = {
                title: meta.title || name,
                _: query._ || '',
                query: {
                    ...query,
                },
                params: {
                    ...params,
                },
                path,
                fullPath,
                hash,
                name,
                fromPath: fromPath,
                meta: {
                    ...meta,
                },
            }
            if (name) {
                const permission_menus = this.permission_menus || []
                const result = findChildrenByPath(permission_menus, item => {
                    return item.path === path
                })
                const target = result.slice(-1)[0]
                if (target && target.meta && target.meta.title) {
                    view.meta.title = target.meta.title
                }
                tagsViewStore.addView(view)
            }
            return false
        },
        moveToCurrentTag() {
            const tags = this.$refs.tag
            this.$nextTick(() => {
                for (const tag of tags) {
                    if (tag.to.fullPath === this.$route.fullPath) {
                        this.$refs.scrollPane.moveToTarget(tag)
                        // when query is different then update
                        if (tag.to.fullPath !== this.$route.fullPath) {
                            tagsViewStore.updateVisitedView(this.$route)
                        }
                        break
                    }
                }
            })
        },
        refreshSelectedTag(view) {
            tagsViewStore.delCachedView(view).then(() => {
                const { fullPath } = view
                this.$nextTick(() => {
                    this.$router.replace({
                        path: '/redirect' + fullPath,
                    })
                })
            })
        },
        closeSelectedTag(view) {
            tagsViewStore.delView(view).then(({ visitedViews }) => {
                if (this.isActive(view)) {
                    this.toLastView(visitedViews, view)
                }
            })
        },
        closeOthersTags() {
            this.$router.push(this.selectedTag)
            tagsViewStore.delOthersViews(this.selectedTag).then(() => {
                this.moveToCurrentTag()
            })
        },
        closeAllTags(view) {
            tagsViewStore.delAllViews().then(({ visitedViews }) => {
                if (this.affixTags.some(tag => tag.fullPath === view.fullPath)) {
                    return
                }
                this.toLastView(visitedViews, view)
            })
        },
        toLastView(visitedViews, view) {
            const latestView = visitedViews.slice(-1)[0]
            if (latestView) {
                this.$router.push(latestView.fullPath)
            }
            // else if (view.name === 'Dashboard') {
            //     // now the default is to redirect to the home page if there is no tags-view,
            //     // you can adjust it according to your needs.
            //     // to reload home page
            //     this.$router.replace({ path: '/redirect' + view.fullPath })
            // }
            else {
                this.$router.push('/')
            }
        },
        openMenu(tag, e) {
            const menuMinWidth = 105
            const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
            const offsetTop = this.$el.getBoundingClientRect().top
            const offsetWidth = this.$el.offsetWidth // container width
            const maxLeft = offsetWidth - menuMinWidth // left boundary
            const left = e.clientX - offsetLeft + 15 // 15: margin right

            if (left > maxLeft) {
                this.left = maxLeft
            } else {
                this.left = left
            }

            this.top = e.clientY - offsetTop
            this.top = 45
            this.visible = true
            this.selectedTag = tag
        },
        closeMenu() {
            this.visible = false
        },
        handleScroll() {
            this.closeMenu()
        },
    },
}
</script>

<style lang="less" scoped>
.tags-view-container {
    width: 100%;
    height: 32px;
    background: #fff;
    //   border-bottom: 1px solid var(--color-primary);
    // box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);
    .tags-view-wrapper {
        .tags-view-item {
            position: relative;
            display: inline-block;
            padding: 0 15px;
            height: 32px;
            background: #fff;
            color: #495060;
            vertical-align: top;
            font-size: 14px;
            line-height: 32px;
            cursor: pointer;

            &:last-of-type {
                &::before {
                    display: none;
                }
            }

            // &:last-of-type {
            //     margin-right: 15px;
            // }
            &::before {
                position: absolute;
                top: 50%;
                right: 0;
                display: inline-block;
                width: 2px;
                height: 15px;
                border-radius: 50%;
                background: #ddd;
                content: ' ';
                transform: translateY(-50%);
            }
            &.active {
                border-color: var(--color-primary);
                background-color: var(--color-primary);
                color: #fff;
                &::before {
                    display: none;
                }
                &::after {
                    position: absolute;
                    top: 0;
                    left: -3px;
                    z-index: 10;
                    width: 3px;
                    height: 100%;
                    background-color: var(--color-primary);
                    content: ' ';
                }
            }
        }
    }
    .contextmenu {
        position: absolute;
        z-index: 3000;
        margin: 0;
        padding: 5px 0;
        border-radius: 4px;
        background: #fff;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
        color: #333;
        list-style-type: none;
        font-weight: 400;
        font-size: 12px;
        li {
            margin: 0;
            padding: 7px 16px;
            cursor: pointer;
            &:hover {
                background: #eee;
            }
        }
    }
}
</style>

<style lang="less">
//reset element css of el-icon-close
.tags-view-wrapper {
    .tags-view-item {
        .el-icon-close {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            vertical-align: 1px;
            text-align: center;
            // transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            transform-origin: 100% 50%;

            &:before {
                display: inline-block;
                vertical-align: -1px;
                transform: scale(1);
            }
            &:hover {
                background-color: #b4bccc;
                color: #fff;
            }
        }
        &.active {
            .el-icon-close {
                &:hover {
                    background-color: rgba(255, 255, 255, 0.3);
                    color: #fff;
                }
            }
        }
    }
}
</style>
