<!--
    内容发布
-->
<template>
    <div class="pop-generatepdf">
        <el-dialog title="pdf文件" :visible="true" @close="handleClose" class="my-common-dialog" width="100vw" top="0">
            <div class="pp-body">
                <embed type="application/pdf" :src="data" style="width: 100%;height: 100%;" />
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
    components: {},
})
export default class PopPdf extends Vue {
    $options!: any

    @Prop({
        type: [String, Object],
        default: '',
    })
    data!: any

    async mounted() {}

    /**关闭 */
    handleClose() {
        this.$options.cancel()
    }
}
</script>

<style lang="less">
.pop-generatepdf {
    .el-dialog__wrapper {
        overflow: hidden;
    }
    .el-dialog {
        width: 100%;
        height: 100%;
        .el-dialog__body {
            height: calc(100% - 45px);
            padding: 0;
            max-height: unset !important;
            max-width: unset !important;
        }
    }
    .pp-body {
        width: 100%;
        height: 100%;
    }
}
</style>
