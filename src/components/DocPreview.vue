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

        <div class="doc-preview__content">
            <component :is="docComponent" v-highlight></component>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import DemoBlock from '@/components/global/demo-block/index.vue'

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

    private activeDemo = ''

    created() {
        // 设置默认激活的 demo
        if (this.demos.length > 0) {
            this.activeDemo = this.demos[0].name
        }
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

    get docComponent() {
        return this.doc
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
