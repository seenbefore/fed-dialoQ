<template>
    <el-dialog ref="dialog" :title="`版本记录`" visible class="ChangeLogDialog" :fullscreen="false" :append-to-body="false" :close-on-click-modal="false" width="900px" @close="cancel">
        <PipelineChangelog :id="id"></PipelineChangelog>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">关闭</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import PipelineChangelog from '../components/PipelineChangelog/index.vue'

@Component({
    name: 'ChangeLogDialog',
    components: {
        PipelineChangelog,
    },
})
export default class ChangeLogDialog extends Vue {
    /**
     * 流水线id
     */
    @Prop() id!: string
    cancel() {
        const $options: any = this.$options
        $options.cancel('取消/关闭')
    }
    confirm() {
        const $options: any = this.$options
        $options.confirm('确定')
    }

    mounted() {}
}
</script>

<style lang="less" scoped>
.ChangeLogDialog ::v-deep {
    .el-dialog__body {
        padding: 10px 20px;
        max-height: 440px;
        overflow: auto;
    }
}
</style>
