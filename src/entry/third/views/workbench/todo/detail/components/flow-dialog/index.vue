<!--  -->
<template>
    <el-dialog
        ref="dialog"
        :title="'流程图'"
        visible
        class="FlowDialog sg-dialog"
        :fullscreen="false"
        :append-to-body="false"
        :close-on-click-modal="false"
        width="1000px"
        v-bind="$attrs"
        @close="cancel"
    >
        <div class="FlowDialog__content"></div>
        <div slot="footer" class="dialog-footer">
            <el-button type="" @click="cancel">关闭</el-button>
        </div>
    </el-dialog>
</template>
<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { FormRef, FormRow } from '@/sharegood-ui'

interface FormModel {
    name?: string
}
@Component({
    name: 'FlowDialog',
    components: {},
})
export default class FlowDialog extends Vue {
    formModel = {}

    async created() {}

    @Prop({ type: String }) title!: string
    @Prop({ type: Object }) row: any
    @Prop({ default: false }) isEdit!: boolean

    get myTitle() {
        if (this.isEdit) {
            return '修改'
        }
        return '创建'
    }

    cancel() {
        const $options: any = this.$options
        $options.cancel('取消/关闭')
    }
    confirm() {
        const $options: any = this.$options
        $options.confirm('确定')
    }
}
</script>

<style lang="less" scoped>
.FlowDialog ::v-deep {
    .el-dialog__body {
        padding: 10px 20px;
    }
}
</style>
