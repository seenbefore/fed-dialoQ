<template>
    <el-dialog class="PreviewDialog" :visible="true" :title="title" width="80%" @close="handleClose" append-to-body fullscreen>
        <div class="preview-content">
            <my-iframe-pdf class="pdf-iframe" :pdf-src="pdfSrc"></my-iframe-pdf>
        </div>
        <template #footer>
            <el-button @click="handleClose">关闭</el-button>
        </template>
    </el-dialog>
</template>

<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'PreviewDialog',
})
export default class PreviewDialog extends Vue {
    @Prop({ type: String, default: '' })
    pdfSrc!: string

    @Prop({ type: String, default: '预览' })
    title!: string

    handleClose() {
        this.$options.cancel?.()
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
    }

    .preview-content {
        height: 100%;

        .pdf-iframe {
            height: 100%;
            width: 100%;
        }
    }
}
</style>
