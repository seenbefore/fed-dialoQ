<template>
    <section class="app-navbar">
        <div class="app-container">
            <div class="menu-icon" @click="toggleSideBar">
                <i class="el-icon-s-fold"></i>
            </div>
            <slot :scope="this">
                <div class="left-box">
                    <div class="logo"></div>
                    <div class="title" v-text="title"></div>
                </div>
                <div class="center-box"></div>
                <div class="right-box">
                    <!-- 用户信息 -->
                    <div class="user-info">
                        <el-dropdown>
                            <span class="el-dropdown-link">
                                <span v-text="userInfo.name || '管理员'"></span>
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="showPasswordLayer">修改密码</el-dropdown-item>
                                    <el-dropdown-item @click.native="logOut">退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </div>
            </slot>
        </div>
        <el-drawer
            custom-class="my-admin-setting"
            :title="setting.name"
            :visible.sync="drawer"
            size="300px"
            :show-close="true"
            :modal="true"
            :append-to-body="true"
            :modal-append-to-body="false"
            direction="rtl"
        >
            <h3>整体风格设置</h3>
            <div class="theme-box">
                <theme-icon
                    v-model="state.style"
                    :active.sync="state.style"
                    v-for="(row, index) in style"
                    :key="index"
                    :name="index"
                    :tip="row.name"
                    :logo="row.logo.background"
                    :menu="row.menu.background"
                    :header="row.header.background"
                    :main="row.container.background"
                    :active-color="row.page.color"
                ></theme-icon>
            </div>
            <h3>主题色</h3>
            <div class="theme-box">
                <!-- <theme-color
          v-for="(item, key) in themeColorArr"
          v-model:active="state.primaryColor"
          v-model:activeTextColor="state.primaryTextColor"
          :key="key"
          :color="item.color"
          :textColor="item.textColor"
          :tip="item.tip"
        ></theme-color> -->
            </div>
            <h3>其他设置</h3>
            <div class="list">
                <div class="list-item" v-for="option in []" :key="option.name">
                    <span>{{ option.name }}</span>
                    <el-switch v-model="option.value" active-color="#13ce66" inactive-color="#ff4949" @change="change(option)"></el-switch>
                </div>
            </div>
        </el-drawer>
    </section>
</template>

<script>
import { style } from '../theme/index'
import ThemeIcon from './theme-icon'
import { userStore, appStore, settingsStore } from '@admin/store/useStore'
export default {
    components: {
        ThemeIcon,
    },
    data() {
        return {
            state: {
                style: 'default',
            },
            currentStyle: 'default',
            style,
            theme: {
                state: {
                    style: 'default',
                    primaryColor: '#409eff',
                    menuType: 'side',
                },
            },
            drawer: false,
            setting: {
                name: '系统设置',

                style: {
                    name: '整体风格设置',
                    default: '默认菜单风格',
                    light: '亮色菜单风格',
                    dark: '暗色菜单风格',
                },
                primaryColor: {
                    name: '主题色',
                    blue: '默认蓝',
                    red: '玫瑰红',
                    violet: '优雅紫',
                    green: '故事绿',
                    cyan: '明青',
                    black: '极客黑',
                },
                other: {
                    name: '其他设置',
                    showLogo: '显示logo',
                    showBreadcrumb: '显示面包屑导航',
                    keepOnlyOneMenu: '保持一个菜单展开',
                },
            },
        }
    },

    computed: {
        userInfo() {
            return userStore.info
        },
        title() {
            return settingsStore.title
        },

        sidebar() {
            return appStore.sidebar
        },
    },
    isCollapse() {
        return !this.sidebar.opened
    },
    mounted() {},
    methods: {
        change() {},
        showSetting() {
            this.drawer = true
        },
        showPasswordLayer() {},
        logOut() {
            userStore.fedLogOut()
        },
        toggleSideBar() {
            appStore.toggleSideBar()
        },
    },
}
</script>

<style lang="less">
.my-admin-setting {
    i {
        cursor: pointer;
        &:focus {
            outline: none;
        }
    }

    .list {
        padding: 0 20px;
        &-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 15px;
            span {
                font-size: 16px;
            }
        }
    }
    h3 {
        margin-top: 40px;
        margin-bottom: 20px;
        padding: 0 20px;
        color: rgba(0, 0, 0, 0.85);
        text-align: left;
        font-size: 14px;
        line-height: 22px;
        &:first-child {
            margin-top: 0;
        }
    }
    .theme-box {
        padding-left: 20px;
        text-align: left;
    }
}
</style>
