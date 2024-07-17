<!-- 
大屏 
在当前页面同级的containers文件夹下新增模块组件，包含index.vue即可自动加载,style.js为模块布局样式
-->
<template>
    <my-big-screen v-bind="getAttrs" class="page-demo-bigscreen1 home_page" bg-class="demo-bigscreen1-bg">
        <my-layout v-for="(key, index) in components" :key="key + index" :style="styles[key]">
            <component :is="key"></component>
        </my-layout>
    </my-big-screen>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import './containers/index.less'

const requireCtx = require.context(
    './containers/',
    true, // 解析子文件夹
    /[/\\]index+\.vue$/, // 文件名使用 PascalCase 命名法
)

const requireConfig = require.context(
    './containers/',
    true, // 解析子文件夹
    /[/\\]style\.js$/, // 文件名使用 PascalCase 命名法
)

const getModules = (ctx: any) => {
    const modules: any = {}
    ctx.keys().forEach((fileName: any) => {
        const names = fileName.split(/[/\\]+/)
        const name = names[1]
        const m = ctx(fileName)
        if (names.length === 3) {
            modules[name] = m && m.__esModule ? m.default : m
        }
    })
    return modules
}
const components = getModules(requireCtx) || {}
const styles = getModules(requireConfig) || {}
const isDev = process.env.NODE_ENV === 'development'
@Component({
    name: 'Index',
    components: {
        ...components,
    },
})
export default class Index extends Vue {
    getAttrs = {
        // 本地开发的时候先设false，后续再改为true
        isScale: true,
    }
    components = Object.keys(components)
    styles = {
        ...styles,
    }
    mounted() {}
}
</script>
<style lang="less">
.page-demo-bigscreen1 {
    background: #020b23;
}
</style>
<style lang="less" scoped></style>
