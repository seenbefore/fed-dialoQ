<template>
    <div class="sg-page AdminFeatRegionOrgTree">
        <demo-block>
            <component :is="examples.Base" slot="source"></component>
            <div slot="highlight" v-highlight>
                <pre><code class="javascript" v-text="examplesRaw.Base"></code></pre>
            </div>
        </demo-block>
        <readme />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Readme from '@/components/region-org-tree/README.md'
// import '@/components/directives/highlight'

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
    name: 'AdminFeatRegionOrgTree',
    components: { Readme },
})
export default class AdminFeatRegionOrgTree extends Vue {
    examples = examples
    examplesRaw = examplesRaw
    mounted() {}
}
</script>

<style lang="less" scoped></style>
