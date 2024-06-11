<template>
    <section class="app-main">
        <!-- <transition name="fade-transform" mode="out-in">
            <keep-alive :include="cachedViews">
            <router-view :key="key" />
        </keep-alive>
        </transition> -->
        <!-- key 导致热重载失效可能会导致页面空白 重新刷新浏览器 -->
        <div class="app-main-box">
            <keep-alive :include="cachedViews">
                <router-view :key="key" />
            </keep-alive>
            <template v-if="tagsView">
                <template v-for="item in visitedViews">
                    <SubApp v-if="item.fullPath.indexOf('/sub-app/') > -1" :key="item.fullPath" v-show="$route.fullPath === item.fullPath" :full-path="item.fullPath"></SubApp>
                </template>
            </template>
            <template v-else>
                <SubApp v-if="$route.fullPath.indexOf('/sub-app/') > -1" :key="$route.fullPath" :full-path="$route.fullPath"></SubApp>
            </template>
        </div>
    </section>
</template>

<script>
import { tagsViewStore, settingsStore } from '../../../store/useStore'
import SubApp from './SubApp'
export default {
    name: 'AppMain',
    components: {
        SubApp,
    },
    computed: {
        tagsView() {
            return settingsStore.tagsView
        },
        visitedViews() {
            return tagsViewStore.visitedViews
        },
        cachedViews() {
            return tagsViewStore.cachedViews
        },
        key() {
            const keys1 = Object.keys(this.$route.query)
            const keys2 = Object.keys(this.$route.params)

            if (keys1.length || keys2.length) {
                return this.$route.fullPath
            }
            return undefined
        },
    },
}
</script>

<style lang="less">
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
    transition: all 0.5s;
}

.fade-transform-enter {
    opacity: 0;
    // transform: translateX(-30px);
}

.fade-transform-leave-to {
    opacity: 0;
    // transform: translateX(30px);
}
.fixed-header + .app-main {
    padding-top: 50px;
}

.hasTagsView {
    .fixed-header + .app-main {
        padding-top: 84px;
    }
}
</style>

<style lang="less">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
    .fixed-header {
        padding-right: 15px;
    }
}
</style>
