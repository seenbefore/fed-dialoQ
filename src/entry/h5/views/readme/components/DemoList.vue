<template>
    <div class="side-nav">
        <h1 class="vant-title">
            <span>Vant</span>
        </h1>
        <h2 class="vant-desc">{{ description }}</h2>
        <template v-for="item in navList">
            <mobile-nav v-for="(group, index) in item.groups" :group="group" :base="$vantLang" :key="index" />
        </template>
    </div>
</template>

<script>
import docConfig from '../doc.config'
import MobileNav from './MobileNav'

export default {
    components: {
        MobileNav,
    },

    data() {
        return {
            docConfig,
        }
    },

    computed: {
        navList() {
            return (this.docConfig.nav || []).filter(item => item.showInMobile)
        },

        description() {
            return '轻量、可靠的移动端 Vue 组件库'
        },
    },

    methods: {},
}
</script>

<style lang="less">
.side-nav {
    width: 100%;
    box-sizing: border-box;
    padding: 64px 20px 20px;

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
