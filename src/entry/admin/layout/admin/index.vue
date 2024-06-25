<template>
    <div class="Index app-wrapper" :class="classObj">
        <!-- 内容区作为第三方页面嵌入到其他主应用中 -->
        <template v-if="isThirdParty">
            <section class="main-container">
                <app-main id="appMain"></app-main>
            </section>
        </template>
        <template v-else>
            <navbar :store="store">
                <template slot="default" slot-scope="{ scope }">
                    <slot :scope="scope" name="navbar"></slot>
                </template>
            </navbar>
            <sidebar :store="store" class="sidebar-container app-sidebar" v-bind="sidebarProps">
                <template slot="default" slot-scope="{ scope }">
                    <slot :scope="scope" name="sidebar"></slot>
                </template>
            </sidebar>
            <!-- 右侧区域 -->
            <section class="main-container" :class="{ hasTagsView: needTagsView }">
                <tags-view v-if="needTagsView" :store="store" />
                <app-breadcrumb v-if="needBreadcrumb" :store="store"></app-breadcrumb>
                <app-main id="appMain"></app-main>
                <!-- <app-copyright></app-copyright> -->
                <slot name="main"></slot>
            </section>
        </template>
    </div>
</template>

<script>
import { Sidebar, Navbar, AppMain, AppBreadcrumb, TagsView } from './components'
import { appStore, settingsStore } from '../../store/useStore'
export default {
    name: 'Index',
    props: {
        sidebarProps: {
            type: Object,
            default() {
                return {}
            },
        },
        store: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    components: {
        Sidebar,
        Navbar,
        AppMain,
        AppBreadcrumb,
        TagsView,
    },
    data() {
        return {}
    },
    computed: {
        needTagsView() {
            return settingsStore.tagsView
        },
        needBreadcrumb() {
            return settingsStore.breadcrumb
        },
        sidebar() {
            return appStore.sidebar
        },
        isThirdParty() {
            return settingsStore.isThirdParty
        },
        classObj() {
            return [
                settingsStore.isThirdParty ? 'third-party' : '',
                settingsStore.layout,
                settingsStore.theme,
                !appStore.sidebar.opened ? 'hideSidebar' : 'openSidebar',
                appStore.sidebar.withoutAnimation ? 'withoutAnimation' : '',
            ]
        },
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {},
}
</script>

<style lang="less">
//@import url('./theme/index.less');
</style>
