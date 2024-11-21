<template>
    <el-drawer append-to-body visible class="sg-dialog CaseDrawer" title="电子卷宗" :close-on-click-modal="false" :wrapper-closable="false" @close="cancel">
        <!-- <my-progress :progress-tip="'请不要关闭此页面，正在生成卷宗中...'" v-if="loading"></my-progress> -->
        <CaseStepForm></CaseStepForm>
    </el-drawer>
</template>

<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import CaseStepForm from '@/views/file-review/my-case/save/index.vue'
@Component({
    name: 'CaseDrawer',
    components: {
        CaseStepForm,
    },
})
export default class CaseDrawer extends Vue {
    confirm(params: any = true) {
        this.$options.confirm && this.$options.confirm(params)
    }
    /** 关闭弹窗 */
    cancel() {
        this.$options.cancel && this.$options.cancel()
    }
}
</script>

<style lang="less" scoped>
.CaseDrawer::v-deep {
    .el-drawer {
        min-width: 800px;
        width: 70% !important;
        .el-drawer__header {
            margin: 0;
            padding: 0 20px;
            height: 49px;
            border: none;
            border-bottom: 1px solid #ddd !important;
            background: #fff;
            color: #333;
            font-weight: 600;
            font-size: 16px;
            line-height: 49px;
        }
    }
}
</style>
