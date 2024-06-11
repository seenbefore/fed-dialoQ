<template>
    <div class="sg-page AdminPageBaseListPage">
        <el-tabs v-model="activeName">
            <el-tab-pane label="页面示例" name="list" lazy>
                <demo-block>
                    <component :is="examples.List" slot="source"></component>
                    <div slot="highlight" v-highlight>
                        <pre><code class="javascript" v-text="examplesRaw.List"></code></pre>
                    </div>
                </demo-block>
            </el-tab-pane>
            <el-tab-pane label="弹窗代码" name="dialog" lazy>
                <demo-block>
                    <!-- <component :is="examples.AddRoleDialog" slot="source"></component> -->
                    <div slot="highlight" v-highlight>
                        <pre><code class="javascript" v-text="examplesRaw.AddRoleDialog"></code></pre>
                    </div>
                </demo-block>
            </el-tab-pane>
            <el-tab-pane label="表单子组件代码" name="dialogComp" lazy>
                <demo-block>
                    <div slot="highlight" v-highlight>
                        <pre><code class="javascript" v-text="examplesRaw.ApplyAreaTypeComp"></code></pre>
                    </div>
                </demo-block>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
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
    name: 'AdminPageBaseListPage',
    components: {},
})
export default class AdminPageBaseListPage extends Vue {
    examples = examples
    examplesRaw = examplesRaw
    activeName = 'list'
    mounted() {}
}
</script>

<style lang="less" scoped></style>
