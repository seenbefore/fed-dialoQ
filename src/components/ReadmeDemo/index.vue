<!--  -->
<template>
    <div class="Readme">
        <template v-if="code">
            <demo-block v-if="demoName">
                <component :is="demoName" slot="source"></component>
                <div slot="highlight" v-highlight>
                    <pre><code class="javascript" v-text="demoRaw"></code></pre>
                </div>
            </demo-block>
        </template>
        <template v-else>
            <component :is="demoName" v-if="demoName"></component>
        </template>

        <div style="padding:15px;">
            <div class="element-doc" v-highlight v-html="doc" v-if="doc"></div>
        </div>
    </div>
</template>

<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator'
import '@/components/directives/highlight'

const md = require('markdown-it')()
const requireCtx = require.context(
    '@/docs/demo/',
    true, // 解析子文件夹
    /[/\\][A-Z][a-zA-Z0-9]+\.vue$/, // 文件名使用 PascalCase 命名法
)
const requireCtxRaw = require.context(
    '!raw-loader!@/docs/demo/',
    true, // 同上
    /[/\\][A-Z][a-zA-Z0-9]+\.vue$/, // 同上
)

const requireDocCtxRaw = require.context(
    '!raw-loader!@/docs/readme/',
    false, // 同上
    /[/\\][A-Z][a-zA-Z0-9]+\.md$/, // 同上
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
const examplesDocRaw = getModules(requireDocCtxRaw)

@Component({
    name: 'Readme',
    components: {},
})
export default class Readme extends Vue {
    @Prop() name!: string
    @Prop() code!: string
    mounted() {}
    get demoName() {
        return examples[this.name]
    }
    get demoRaw() {
        return examplesRaw[this.name]
    }
    get doc() {
        const val = examplesDocRaw[this.name] || ''
        return md.render(val)
    }
}
</script>

<style lang="less" scoped>
.Readme {
}
</style>
