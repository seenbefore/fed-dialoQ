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
import docConfig from './doc.config'
import MobileNav from './MobileNav.vue'
import { routes } from '@/entry/h5/router'
const indexRoute = routes.filter(item => item.name === 'Index')[0]
const secondRoutes = indexRoute.children || []
const businessGroup = {
    name: '业务',
    showInMobile: true,
    groups: [
        {
            groupName: '业务',
            icon: 'https://img.yzcdn.cn/vant/basic-0401.svg',
            list: secondRoutes
                .filter(item => item.path.indexOf('/demo') === -1)
                .filter(item => item.path.indexOf('/readme') === -1)
                .map(item => ({
                    path: item.path,
                    title: item.path + ' ' + item.meta?.title,
                })),
        },
    ],
}

console.log(11, businessGroup)
@Component({
    name: 'ReadmeHome',
    components: {
        MobileNav,
    },
})
export default class ReadmeHome extends Vue {
    docConfig = docConfig
    activeKeys = ['业务', '基础组件']

    get navList() {
        const result = this.docConfig.nav.filter(item => item.showInMobile)
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
