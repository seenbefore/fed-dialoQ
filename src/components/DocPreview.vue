<template>
    <div class="doc-preview">
        <div class="doc-preview__demo" v-if="code && demos.length > 0">
            <el-tabs v-model="activeDemo">
                <el-tab-pane v-for="demo in demos" :key="demo.name" :label="demo.title" :name="demo.name">
                    <demo-block :key="demo.name">
                        <component :is="getDemoComponent(demo)" slot="source"></component>
                        <div slot="highlight" v-highlight>
                            <pre><code class="javascript" v-text="getDemoRaw(demo)"></code></pre>
                        </div>
                    </demo-block>
                </el-tab-pane>
            </el-tabs>
        </div>

        <div class="doc-preview__content element-doc" v-html="renderedContent" v-highlight v-if="renderedContent"></div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import DemoBlock from '@/components/global/demo-block/index.vue'
import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
import container from 'markdown-it-container'

@Component({
    name: 'DocPreview',
    components: {
        DemoBlock,
    },
})
export default class DocPreview extends Vue {
    @Prop({ type: String, required: true }) readonly name!: string
    @Prop({ type: Boolean, default: false }) readonly code!: boolean
    @Prop({ type: Array, default: () => [] }) readonly demos!: any[]
    @Prop({ type: String, default: '' }) readonly docPath!: string
    @Prop({ type: Function, default: null }) readonly doc!: () => Promise<string>
    @Prop({ type: String, default: '' }) readonly docRaw!: any

    private activeDemo = ''
    private md: any = null

    created() {
        // 设置默认激活的 demo
        if (this.demos.length > 0) {
            this.activeDemo = this.demos[0].name
        }

        // 初始化markdown-it实例
        this.md = new MarkdownIt({
            html: true,
            linkify: true,
            typographer: true,
        })
            .use(anchor, {
                permalink: true,
                permalinkBefore: true,
                permalinkSymbol: '#',
            })
            .use(container, 'tip')
            .use(container, 'warning')
    }

    getDemoComponent(demo: any) {
        try {
            return demo.component
        } catch (e) {
            console.error('Failed to load demo component:', e)
            return null
        }
    }

    getDemoRaw(demo: any) {
        try {
            const rawContent = demo.raw
            return typeof rawContent === 'string' ? rawContent : rawContent.default
        } catch (e) {
            console.error('Failed to load demo raw:', e)
            return ''
        }
    }

    get renderedContent() {
        if (this.docRaw) {
            const content = typeof this.docRaw === 'string' ? this.docRaw : this.docRaw.default

            return this.md.render(content)
        }
        return ''
    }
}
</script>

<style lang="less">
.doc-preview {
    &__demo {
        margin-bottom: 24px;

        .el-tabs__header {
            margin-bottom: 20px;
        }
    }

    &__content {
        padding: 24px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

        .tip,
        .warning {
            padding: 12px 24px;
            margin-bottom: 16px;
            border-radius: 4px;

            &::before {
                font-weight: 600;
                display: block;
                margin-bottom: 8px;
            }
        }

        .tip {
            background-color: #f3f5f7;
            border-left: 4px solid #42b983;

            &::before {
                content: 'TIP';
                color: #42b983;
            }
        }

        .warning {
            background-color: rgba(255, 229, 100, 0.3);
            border-left: 4px solid #e7c000;

            &::before {
                content: 'WARNING';
                color: #e7c000;
            }
        }
    }
}

.text-slide-enter,
.text-slide-leave-active {
    opacity: 0;
    transform: translateX(10px);
}

.arrow-slide-enter-active,
.arrow-slide-leave-active {
    transition: all 0.3s;
}
</style>
