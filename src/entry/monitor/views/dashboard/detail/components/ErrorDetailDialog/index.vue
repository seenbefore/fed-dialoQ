<template>
    <el-dialog ref="dialog" class="ErrorDetailDialog" :close-on-click-modal="false" :title="'错误详情'" width="800px" :fullscreen="false" v-bind="$attrs" :visible="true" @close="cancel">
        <div class="body">
            {{ row }}
        </div>
    </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
    components: {},
})
export default class ErrorDetailDialog extends Vue {
    @Prop({ type: Object }) row: any

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
.ErrorDetailDialog ::v-deep {
    .el-dialog__header {
        font-size: 20px;
        font-weight: 800;
    }
}
</style>
