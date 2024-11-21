<template>
    <el-dialog class="PreviewDialog" :visible="true" :title="title" width="80%" @close="handleClose" append-to-body fullscreen>
        <div class="preview-content" v-loading="loading">
            <DocInput ref="docInputRef" :doc-params="docParams" class="docInputRef"></DocInput>
            <my-iframe-pdf class="pdf-iframe" :pdf-src="pdfSrc" v-if="pdfSrc"></my-iframe-pdf>
        </div>
        <template #footer>
            <el-button @click="handleClose">关闭</el-button>
        </template>
    </el-dialog>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import DocInput from '@/components/doc-input/index.vue'
@Component({
    name: 'PreviewDialog',
    components: {
        DocInput,
    },
})
export default class PreviewDialog extends Vue {
    @Prop({ type: Object, default: () => ({}) })
    docParams!: any

    @Prop({ type: String, default: '预览' })
    title!: string

    handleClose() {
        this.$options.cancel?.()
    }
    @Ref('docInputRef')
    docInputRef!: DocInput

    pdfSrc = ''
    loading = false
    async mounted() {
        try {
            this.loading = true
            // 等待组件渲染完成
            await this.$nextTick()
            setTimeout(async () => {
                // 确保docInputRef已经挂载
                if (this.docInputRef) {
                    const res: any = await this.docInputRef.docPreview()
                    console.log('%c Line:55 🍊 res', 'background:#376ff3', res)
                    this.pdfSrc = res?.data.pdfUrl
                    this.loading = false
                }
            }, 1000)
        } catch (error) {
            console.error(error)
            this.loading = false
        }
    }
}
</script>

<style lang="less" scoped>
.PreviewDialog {
    ::v-deep {
        .el-dialog__body {
            padding: 0;
            height: calc(100vh - 200px);
        }
        .docInputRef {
            position: absolute;
            top: -9999px;
            left: -9999px;
            width: 0;
        }
    }

    .preview-content {
        height: 100%;
        position: relative;

        .pdf-iframe {
            height: 100%;
            width: 100%;
        }
    }
}
</style>
