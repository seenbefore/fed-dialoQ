<template>
    <admin :store="store">
        <template slot="navbar">
            <div class="left-box">
                <div class="logo">
                    <img src="@/assets/logo.svg" alt="" />
                </div>
                <div class="title">
                    <span v-text="title"></span>
                </div>
            </div>
            <div class="center-box" ref="topMenuBox">
                <el-menu :default-active="activeMenu" class="el-menu-demo top-menu" mode="horizontal" @select="changeTopMenu" v-bind="topMenuOptions">
                    <template v-for="(item, index) in menus">
                        <el-submenu v-if="item.moreMenu && item.moreMenu.length" :index="index + 'submenu'" :key="index + 'submenu'">
                            <template slot="title">{{ item.meta.title }}</template>
                            <el-menu-item v-for="(subItem, innerIndex) in item.moreMenu" :index="subItem.path" :key="index + 'menu-item' + innerIndex">
                                {{ subItem.meta.title }}
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item v-else :index="item.path" :key="index + 'menu-item'">{{ item.meta.title }}</el-menu-item>
                    </template>
                </el-menu>
            </div>
            <div class="right-box">
                <!-- 用户信息 -->
                <div class="user-info">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <span v-text="userInfo.name" class="user-name"></span>
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click.native="handlePasswordEdit">修改密码</el-dropdown-item>
                                <el-dropdown-item @click.native="handleUpdate">编辑信息</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <div class="divider"></div>
                    <span @click="logOut">退出登录</span>
                </div>
            </div>
        </template>
        <template slot="sidebar">
            <div class="sidebar-logo">
                <div class="sidebar-icon">
                    <img src="@/assets/logo.svg" alt="" />
                </div>
                <div class="sidebar-title" v-text="title"></div>
            </div>
        </template>
    </admin>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Admin from '@admin/layout/admin/index.vue'
import { userStore, settingsStore, appStore, tagsViewStore } from '../../store/useStore'
import { findParents } from '@/scripts/utils'
@Component({
    name: 'Index',
    components: { Admin },
})
export default class Index extends Vue {
    public get store() {
        return {
            userStore,
            settingsStore,
            appStore,
            tagsViewStore,
        }
    }
    logOut() {
        userStore.toggleRemember(1)
        userStore.fedLogOut()
    }
    get title() {
        return settingsStore.title
    }
    get userInfo() {
        return Object.assign({ name: '未登录' }, userStore.info)
    }
    handlePasswordEdit() {
        this.$modalDialog(() => import(/* webpackChunkName: "UserPasswordDialog" */ '@admin/components/UserPasswordDialog/index.vue')).then(() => {
            setTimeout(() => {
                this.logOut()
            }, 1000)
        })
    }
    handleUpdate() {
        this.$modalDialog(() => import(/* webpackChunkName: "UserEditDialog" */ '@admin/components/UserEditDialog/index.vue'), {
            isEdit: true,
        }).then(() => {})
    }
    /**
     * 当前顶部激活菜单
     */
    get activeMenu() {
        const route = this.$route
        let { meta, path, fullPath } = route
        const uri = meta.activeMenu || path

        // 找到所有父级菜单
        const result = findParents(userStore.topMenus, (item: any) => {
            return item.path === uri
        })

        // 获取当前菜单和所有的顶级菜单 result[0] 顶级菜单
        if (result[0]) {
            userStore.resetMenus(result[0].children ?? [])

            return result[0].path
        }
        return ''
    }
    /**
     * 切换顶部菜单
     */
    async changeTopMenu(uri: any) {
        const defaultPath = await userStore.getDefaultPath(uri)
        this.$router.push(defaultPath).catch(err => {})
    }
    maxVisibleMenuCount = 8
    /**
     * 顶部菜单列表
     *
     * */
    get menus() {
        const topMenus = userStore.topMenus
        const length = topMenus.length

        if (length < this.maxVisibleMenuCount) {
            return topMenus
        }
        const result = [...userStore.topMenus.slice(0, this.maxVisibleMenuCount)]

        return result
    }
    topMenuOptions = {
        'background-color': 'var(--color-primary)',
        'text-color': '#fff',
        'active-text-color': '#fff',
    }
}
</script>

<style lang="less" scoped>
.left-box {
    .logo {
        margin-right: 12px;
        img {
            width: 27px;
            vertical-align: top;
        }
    }
    .title {
        font-weight: 600;
        font-size: 20px;
        line-height: 1;
    }
    .home-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 60px;
        padding: 0 10px;
        height: 28px;
        border-radius: 14px;
        background: hsla(0, 0%, 100%, 0.1);
        color: #fff;
        text-decoration: none;
        font-weight: bold;
        font-size: 12px;
        line-height: 1;
        cursor: pointer;
        > i {
            margin-right: 7px;
        }
    }
}
.right-box {
    .user-name {
        display: inline-block;
        vertical-align: middle;
    }
    .user-avatar {
        display: inline-block;
        overflow: hidden;
        margin-left: 10px;
        width: 30px;
        height: 30px;
        border-radius: 100%;
        background-image: url('~@/assets/images/admin/gender-female.svg');
        background-size: cover;
        background-repeat: no-repeat;
        vertical-align: middle;
        cursor: pointer;
        &.man {
            background-image: url('~@/assets/images/admin//gender-man.svg');
        }
    }
}
.sidebar-head {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    &::after {
        position: absolute;
        right: 0px;
        bottom: 0px;
        left: 0px;
        display: block;
        margin-right: 0px;
        margin-left: 0px;
        height: 1px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        content: '';
    }
    .logo {
        margin-right: 7px;
        img {
            width: 27px;
            vertical-align: top;
        }
    }
    .title {
        font-size: 20px;
        font-weight: bold;
        line-height: 1;
    }
}
.center-box ::v-deep {
    .top-menu {
        margin-left: 90px;
        background-color: transparent;
        border-bottom: none;
        .el-menu-item,
        .el-submenu .el-submenu__title {
            height: 50px;
            line-height: 50px;
            background-color: var(--color-primary) !important;
        }
    }
}
</style>
