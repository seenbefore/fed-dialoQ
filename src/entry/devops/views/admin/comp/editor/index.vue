<template>
    <div class="sg-page AdminCompQuill">
        <el-tabs v-model="activeName">
            <el-tab-pane :label="item.label" :name="item.name" v-for="(item, index) in examples" :key="index">
                <demo-block>
                    <component :is="item.name" slot="source"></component>

                    <div slot="highlight" v-highlight>
                        <pre><code class="javascript" v-text="examplesRaw[item.name]"></code></pre>
                    </div>
                </demo-block>
                <component :is="item.readme" v-highlight></component>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import QuillReadMe from '@/components/quill-editor/readme.md'
import '@/components/directives/highlight'

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
    name: 'AdminCompEditor',
    components: {
        QuillReadMe,
        ...examples,
    },
})
export default class AdminCompEditor extends Vue {
    activeName = ''
    examplesRaw = examplesRaw
    examples = [
        {
            label: '文本编辑器',
            name: 'QuillEditor',
            readme: QuillReadMe,
        },
        {
            label: 'markdown编辑器',
            name: 'MdEditor',
        },
    ]
    created() {
        this.activeName = this.examples[0]['name']
    }
    mounted() {}
}
</script>

<style lang="less" scoped></style>
