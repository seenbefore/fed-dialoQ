<template>
    <div class="sg-page page-comp-fgp">
        <demo-block>
            <PreDemo slot="source" />
            <div slot="highlight" v-highlight>
                <pre><code class="javascript" v-text="examRas"></code></pre>
            </div>
        </demo-block>
        <component :is="readme" v-highlight></component>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import '@/components/directives/highlight'
import readme from './readme.md'

const requireCtx = require.context(
    './examples',
    false, // 不解析子文件夹
    /[/\\][A-Z][a-zA-Z0-9]+\.vue$/, // 文件名使用 PascalCase 命名法
)
const requireCtxRaw = require.context(
    '!raw-loader!./examples',
    false, // 同上
    /[/\\][A-Z][a-zA-Z0-9]+\.vue$/, // 同上
)
const getModules = (ctx: any) => {
    const modules: any = {}
    ctx.keys().forEach((fileName: any) => {
        const name = fileName
            .split(/[/\\]+/)
            .pop()
            .replace(/\.\w+$/, '')
        const m = ctx(fileName)
        modules[name] = m && m.__esModule ? m.default : m
    })
    return modules
}
const examples = getModules(requireCtx)
const examplesRaw = getModules(requireCtxRaw)

@Component({
    name: 'AdminCompFileGroupPreivew',
    components: {
        readme,
        ...examples,
    },
})
export default class AdminCompFileGroupPreivew extends Vue {
    activeName = ''
    created() {}
    mounted() {}

    examRas = examplesRaw['PreDemo']

    readme = readme
}
</script>

<style lang="less" scoped>
.page-comp-fgp {
}
</style>
