<template>
    <div class="sg-page AdminFeatTableForm">
        <demo-block v-for="(item, key) in examples" :key="key" style="margin-bottom: 20px;">
            <component :is="item" slot="source"></component>
            <div slot="highlight" v-highlight>
                <pre><code class="javascript" v-text="examplesRaw[key]"></code></pre>
            </div>
        </demo-block>
        <table-form-readme />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import TableFormReadme from '@/components/table-form/readme.md'

const requireCtx = require.context(
    './examples/',
    false, // 不解析子文件夹
    /[/\\][A-Z][a-zA-Z0-9]+\.vue$/, // 文件名使用 PascalCase 命名法
)
const requireCtxRaw = require.context(
    '!raw-loader!./examples/',
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
    name: 'AdminFeatTableForm',
    components: { TableFormReadme },
})
export default class AdminFeatTableForm extends Vue {
    examples = examples
    examplesRaw = examplesRaw
    mounted() {}
}
</script>

<style lang="less" scoped></style>
