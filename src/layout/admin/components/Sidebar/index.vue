<template>
    <div :class="{ 'has-logo': showLogo }">
        <!-- 展开收缩菜单 -->
        <div class="sidebar-fold-wrapper" @click="toggleSideBar" :class="{ collapsed: isCollapse }">
            <i class="el-icon-s-fold sidebar-fold-icon" v-if="!isCollapse"></i>
            <i class="el-icon-s-unfold sidebar-fold-icon" v-else></i>
        </div>
        <slot></slot>
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                background-color="var(--system-menu-background)"
                text-color="var(--system-menu-text-color)"
                active-text-color="var(--system-menu-active-text-color)"
                :collapse-transition="false"
                v-bind="$attrs"
                mode="vertical"
            >
                <sidebar-item v-for="route in menus" :key="route.path" :item="route" :base-path="route.path" />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import SidebarItem from './SidebarItem.vue'
import { userStore, appStore, settingsStore } from '../../../../store/useStore'
@Component({
    name: 'Sidebar',
    components: { SidebarItem },
})
export default class Sidebar extends Vue {
    @Prop() store!: any
    get sidebar() {
        return appStore.sidebar
    }
    get menus() {
        const permission_menus = userStore.menus || []

        return permission_menus
    }
    get activeMenu() {
        const route = this.$route
        const { meta = {}, path, query, fullPath } = route
        const alias = query.___
        const key = alias ? path + '?___=' + alias : path
        const menus = userStore.menus
        // 在菜单树中查找匹配的路径 兼容router.js中配置了错误的activeMenu
        // menus结构: [{path: string, children?: Menu[]}]
        const findMenuPath = (path: string, menuList: any[]): string | undefined => {
            for (const menu of menuList) {
                if (menu.path === path) {
                    return menu.path
                }
                if (menu.children?.length) {
                    const childPath = findMenuPath(path, menu.children)
                    if (childPath) return childPath
                }
            }
            return undefined
        }

        const matchedPath = findMenuPath(path, menus)
        if (matchedPath) {
            return matchedPath
        }

        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
            return meta.activeMenu
        }
        if (query.activeMenu) {
            return query.activeMenu
        }

        return key
    }
    get showLogo() {
        return settingsStore.sidebarLogo
    }
    get isCollapse() {
        return !this.sidebar.opened
    }
    toggleSideBar() {
        appStore.toggleSideBar()
    }
    created() {}
    mounted() {}
}
</script>
