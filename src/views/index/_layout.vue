<template>
    <admin class="my-admin">
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
                <router-link class="home-btn" to="/">
                    <svg-icon icon="admin-home"></svg-icon>
                    <div>回到首页</div>
                </router-link>
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
                <div style="width:300px;">
                    <sg-base-form v-bind="formAttrs" v-model="formModel"></sg-base-form>
                </div>
                <!-- 用户信息 -->
                <div class="user-info">
                    <div class="">汇信</div>
                    <div class="divider"></div>
                    <span style="cursor:pointer">
                        <span v-text="userInfo.name" class="user-name"></span>
                        <div v-if="userInfo.sex" class="user-avatar" :class="[userInfo.sex == '1' ? 'man' : '']"></div>
                    </span>
                    <span style="cursor:pointer;margin-left:7px" @click="FedLogOut">退出</span>
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
import Admin from '@/layout/admin/index.vue'
import { userStore, settingsStore } from '../../store/useStore'
import { LocalMenu } from '../../menus'
import { findParents } from '@/scripts/utils'
import { FormColumn, FormRef, TableColumn, TableLoad, TableRef, FormRow } from '@/sharegood-ui'

/**
 * 匹配菜单名称或者uri
 */
function findNodes(data: any[], val: any) {
    const result: any = []
    const visited: Set<any> = new Set()

    function searchNodes(nodes: any, parentNodes: any = []) {
        for (const node of nodes) {
            const currentNodes = [...parentNodes, node]

            if (node.label.indexOf(val) > -1 || node.uri.indexOf(val) > -1) {
                if (!node.children) {
                    const nodeKey = JSON.stringify(node)
                    if (!visited.has(nodeKey)) {
                        visited.add(nodeKey)
                        result.push({
                            node: node,
                            parents: currentNodes.slice(0, -1),
                        })
                    }
                } else {
                    // 找到非叶子节点，遍历其子节点找到所有叶子节点
                    findLeafNodes(node.children, currentNodes)
                }
            }

            if (node.children) {
                searchNodes(node.children, currentNodes)
            }
        }
    }

    function findLeafNodes(nodes: any, parentNodes: any) {
        for (const node of nodes) {
            if (!node.children) {
                const nodeKey = JSON.stringify(node)
                if (!visited.has(nodeKey)) {
                    visited.add(nodeKey)
                    result.push({
                        node: node,
                        parents: parentNodes,
                    })
                }
            } else {
                findLeafNodes(node.children, [...parentNodes, node])
            }
        }
    }

    searchNodes(data)

    return result
}
@Component({
    name: 'Index',
    components: { Admin },
})
export default class Index extends Vue {
    formModel = {}
    /**表单配置 */
    get formAttrs() {
        return {
            span: 24,
            fields: [
                {
                    span: 24,
                    tag: 'autocomplete',
                    name: 'key',
                    itemAttrs: {
                        label: '',
                        style: 'margin-bottom:0;',
                        class: 'global-search',
                    },
                    attrs: {
                        debounce: 0,
                        'highlight-first-item': true,
                        'trigger-on-focus': true,
                        placeholder: '全局菜单模糊查询',
                        'popper-class': 'my-autocomplete',
                        'value-key': 'label',
                        'suffix-icon': 'el-icon-search',
                        listeners: {
                            select: (val: any) => {
                                const { value } = val
                                console.log(value, val)
                                if (value.indexOf('http') === 0) {
                                    window.open(value)
                                } else {
                                    this.$router.push({
                                        path: value,
                                    })
                                }

                                this.$set(this.formModel, 'key', '')
                            },
                        },
                        load: async (queryString: any) => {
                            const value = queryString
                            if (!value) {
                                return Promise.resolve([])
                            }
                            let result = findNodes(LocalMenu, queryString)
                            result = result.map((item: any) => {
                                const { node, parents = [] } = item

                                let label = parents.map((node: any) => {
                                    return node.label
                                })
                                label.push(node.label)
                                return {
                                    label: label.join(' -> '),
                                    value: node.uri,
                                }
                            })
                            return result
                        },
                        // defaultSlotRender: (h, { row }) => {
                        //     const title = ''
                        //     return [
                        //         h(
                        //             'div',
                        //             {
                        //                 class: 'row',
                        //             },
                        //             [
                        //                 h(
                        //                     'div',
                        //                     {
                        //                         class: 'name',
                        //                         domProps: {
                        //                             innerHTML: title,
                        //                         },
                        //                     },
                        //                     [],
                        //                 ),
                        //             ],
                        //         ),
                        //     ]
                        // },
                    },
                },
            ] as FormColumn[],
        }
    }
    /**
     * 当前顶部激活菜单
     */
    get activeMenu() {
        const route = this.$route
        const { meta, path } = route
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
        const defaultPath = await userStore.GetDefaultPath(uri)
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
        return [...userStore.topMenus.slice(0, this.maxVisibleMenuCount)]
    }
    topMenuOptions = {
        'background-color': 'var(--color-primary)',
        'text-color': '#fff',
        'active-text-color': '#fff',
    }
    get title() {
        return settingsStore.title
    }
    get userInfo() {
        return Object.assign({ name: '未登录' }, userStore.info)
    }
    FedLogOut() {
        userStore.FedLogOut()
    }
    created() {}
    mounted() {}
}
</script>

<style lang="less" scoped>
.my-admin ::v-deep {
    .app-container {
        padding-left: 0;
    }
    .home-btn {
        display: flex;
        align-items: center;
        justify-content: center;

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

.left-box {
    min-width: 200px;
    padding-left: 20px;
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
        margin-left: 20px;
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
::v-deep {
    .global-search {
        .el-autocomplete {
            input {
                height: 32px;
                line-height: 32px;
            }
        }
    }
}
</style>
