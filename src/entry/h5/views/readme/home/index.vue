<template>
    <div class="side-nav">
        <!-- <h2 class="vant-title">
            <span>Vant</span>
        </h2>
        <h2 class="vant-desc">{{ description }}</h2> -->
        <template v-for="item in navList">
            <mobile-nav v-for="(group, index) in item.groups" :group="group" :key="index" :active-keys="activeKeys" />
        </template>
    </div>
</template>
<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import MobileNav from './MobileNav.vue'
import { LocalMenu } from '../../../menus'

// 添加一个获取叶子节点的辅助函数
function getLeafNodes(menu: any[]): any[] {
    const result: any[] = []

    const traverse = (items: any[]) => {
        items.forEach(item => {
            if (!item.children || item.children.length === 0) {
                // 叶子节点
                result.push({
                    path: item.uri,
                    title: item.label + ' ' + item.uri,
                })
            } else {
                // 继续遍历子节点
                traverse(item.children)
            }
        })
    }

    traverse(menu)
    return result
}

const businessGroup = {
    name: '业务',
    showInMobile: true,
    groups: [
        {
            groupName: '业务',
            icon: 'https://img.yzcdn.cn/vant/basic-0401.svg',
            // 使用getLeafNodes获取所有叶子节点
            list: getLeafNodes(LocalMenu),
        },
    ],
}

@Component({
    name: 'ReadmeHome',
    components: {
        MobileNav,
    },
})
export default class ReadmeHome extends Vue {
    activeKeys = ['业务', '基础组件']

    get navList() {
        const result = [
            {
                name: '案例',
                showInMobile: true,
                groups: [
                    {
                        groupName: '基础组件',
                        icon: 'https://img.yzcdn.cn/vant/basic-0401.svg',
                        list: [
                            {
                                path: '/demo/sign',
                                title: '电子签名',
                            },
                            {
                                path: '/demo/fill-in-form',
                                title: 'app-form 表单',
                            },
                            {
                                path: '/demo/online-view',
                                title: 'pdf-preview pdf预览',
                            },
                            {
                                path: '/demo/scroll-list',
                                title: 'my-list 滚动列表',
                            },
                        ],
                    },
                ],
            },
        ]
        result.unshift(businessGroup)
        return result
    }

    get description() {
        return '轻量、可靠的移动端 Vue 组件库'
    }
}
</script>

<style lang="less">
.side-nav {
    width: 100%;
    box-sizing: border-box;
    padding: 24px 20px 20px;

    .vant-title,
    .vant-desc {
        font-weight: normal;
        user-select: none;
        padding-left: 15px;
    }

    .vant-title {
        margin: 0 0 15px;

        img,
        span {
            display: inline-block;
            vertical-align: middle;
        }

        img {
            width: 36px;
        }

        span {
            font-size: 36px;
            font-weight: 500;
            margin-left: 15px;
        }
    }

    .vant-desc {
        font-size: 14px;
        color: #7d7e80;
        margin: 0 0 40px;
    }
}
</style>
