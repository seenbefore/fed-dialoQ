<!--  -->
<template>
    <div class="report-box ic-h-100 ic-row column">
        <div class="ic-row center" style="width:60%;margin:0 auto;padding-top:10px;">
            <page-tab :options="options" v-model="current" style="margin-bottom: 0px;" />
        </div>

        <div class="report-body ic-col-flex-1">
            <iframe src="http://192.168.1.171:3000/project/673/interface/api" frameborder="0" style="width:100%;height:95%;"></iframe>
        </div>
    </div>
</template>
<script lang="tsx">
import PageTab from '@/entry/third/components/page-tab/index.vue'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { FormRef, FormRow } from '@/sharegood-ui'
import { getApprovalLogList, ApprovalLogVo } from '@/entry/third/services/auto/workExamine'
import { Dict } from '@/entry/third/dict'
import SidePanel from '@/entry/third/components/side-panel/index.vue'

@Component({
    name: 'ReportBox',
    components: {
        PageTab,
        SidePanel,
    },
})
export default class ReportBox extends Vue {
    @Prop({ type: String }) instanceId!: string
    options = [
        { value: '调查报告', label: '调查报告' },
        { value: '审查审批报告', label: '审查审批报告' },
    ]
    current = '调查报告'
}
</script>

<style lang="less" scoped></style>
