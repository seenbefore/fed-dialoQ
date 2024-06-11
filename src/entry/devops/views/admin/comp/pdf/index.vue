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
import RmList2Pdf from './readme/List2Pdf.md'
import RmHtml2Pdf from './readme/Html2Pdf.md'
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
    name: 'AdminCompPDF',
    components: {
        RmList2Pdf,
        RmHtml2Pdf,
        ...examples,
    },
})
export default class AdminCompPDF extends Vue {
    activeName = ''
    examplesRaw = examplesRaw
    examples = [
        {
            label: '配置项生成',
            name: 'List2Pdf',
            readme: RmList2Pdf,
        },
        {
            label: 'html生成',
            name: 'Html2Pdf',
            readme: RmHtml2Pdf,
        },
    ]
    created() {
        this.activeName = this.examples[0]['name']
    }
    mounted() {}
}
</script>

<style lang="less" scoped>
::v-deep {
    .pdf-generater-module {
        p {
            margin: 0;
            padding: 0;
            color: #333;
        }
        img {
            max-width: unset !important;
        }
        .pdf-generater-section {
            padding: 10px 0;
            border: 1px solid #ddd;
            border-left: none;
            border-right: none;
            background: #f5f5f5;
            .pdf-generater-content {
                background: #fff;
                margin: 0 auto;
                width: 600px;
                height: 60vh;
                overflow: auto;
            }
        }
        .pdf-generater-operate {
            padding: 10px 0;
        }
    }
}
</style>
