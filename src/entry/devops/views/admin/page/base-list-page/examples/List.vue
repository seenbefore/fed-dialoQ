<template>
    <div class="xx">
        <sg-base-form ref="formRef" :span="8" :fields="formFields" v-model="formModel" @submit="refreshList" @reset="refreshList"></sg-base-form>
        <sg-data-view :columns="tableColumns" :load="tableLoad" ref="tableRef" :border="false" v-bind="tableAttrs"></sg-data-view>
    </div>
</template>

<script lang="tsx">
import { FormColumn, FormRef, TableColumn, TableLoad, TableRef } from '@/sharegood-ui'
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { PARTY_TYPE, CASE_TYPE, CASE_STATUS } from './Service'

@Component({
    name: 'ListDemo',
    components: {},
})
export default class ListDemo extends Vue {
    mounted() {}

    @Ref('form')
    formRef!: FormRef
    /**表单值 */
    formModel: Record<string, any> = {}
    /**表单配置 */
    formFields: FormColumn[] = [
        {
            tag: 'input',
            name: 'caseNumber',
            itemAttrs: {
                label: '案件编号:',
            },
            attrs: {
                placeholder: '请输入案件编号',
            },
        },
        {
            tag: 'input',
            name: 'casePartyName',
            itemAttrs: {
                label: '当事人:',
            },
            attrs: {
                placeholder: '请输入',
            },
        },
        {
            tag: 'select',
            name: 'casePartyTypeList',
            itemAttrs: {
                label: '当事人类型:',
            },
            attrs: {
                value: [],
                multiple: true,
                placeholder: '请选择',
                options: async () => {
                    return []
                },
            },
        },
        {
            tag: 'select',
            name: 'caseSource',
            itemAttrs: {
                label: '案件来源:',
            },
            attrs: {
                placeholder: '请选择',
                options: async () => {
                    return []
                },
            },
        },
        {
            tag: 'select',
            name: 'caseCurrentStageCode',
            itemAttrs: {
                label: '办案阶段:',
            },
            attrs: {
                placeholder: '请选择',
                options: async () => {
                    return []
                },
            },
        },
        {
            tag: 'daterange',
            name: 'registerTime',
            itemAttrs: {
                label: '立案日期:',
            },
            attrs: {},
        },
        {
            tag: 'select',
            name: 'caseType',
            visible: false,
            itemAttrs: {
                label: '案件类型:',
            },
            attrs: {
                placeholder: '请选择',
                options: async () => {
                    return []
                },
            },
        },
        {
            tag: 'select',
            name: 'procedureType',
            visible: false,
            itemAttrs: {
                label: '程序类型:',
            },
            attrs: {
                placeholder: '请选择',
                options: [
                    { label: '正常流程', value: '2' },
                    { label: '快办流程', value: '3' },
                ],
            },
        },
        {
            tag: 'select',
            name: 'caseStatus',
            visible: false,
            itemAttrs: {
                label: '案件状态:',
            },
            attrs: {
                placeholder: '请选择',
                options: async () => {
                    return []
                },
            },
        },
        {
            tag: 'input',
            name: 'handleName',
            visible: false,
            itemAttrs: {
                label: '承办人:',
            },
            attrs: {
                placeholder: '请输入',
            },
        },
        {
            tag: 'input',
            name: 'caseDeptName',
            visible: false,
            itemAttrs: {
                label: '办案部门:',
            },
            attrs: {
                placeholder: '请输入',
            },
        },
        {
            tag: 'select',
            name: 'adjustStatus',
            visible: false,
            itemAttrs: {
                label: '调整状态:',
            },
            attrs: {
                placeholder: '请选择',
                options: async () => {
                    const options = [
                        { label: '调整过', value: '1' },
                        { label: '未调整过', value: '0' },
                    ]
                    return options
                },
            },
        },
        {
            span: 24,
            tag: 'action',
            buttons: [
                {
                    isSubmit: true,
                    type: 'primary',
                    text: '查询',
                },
                {
                    isReset: true,
                    type: 'default',
                    text: '重置',
                },
                {
                    isMore: true,
                    type: 'default',
                    text: '更多条件',
                    hiddenText: '收起条件',
                },
            ],
        },
    ]

    @Ref('table')
    tableRef!: TableRef
    tableAttrs = {
        pagination: { pageSize: 20 },
        tableHeaderSticky: {
            scrollDom: () => document.querySelector('.AdminPageBaseListPage'),
        },
        pageActionLayout: [
            {
                key: 'exportAll',
                label: '导出全部',
            },
        ],
        exportAllConfig: {
            splitReqNum: 100,
        },
    }
    /**表格配置 */
    get tableColumns(): TableColumn[] {
        return [
            {
                label: '案件状态',
                prop: 'caseStatusName',
                width: '100',
                fixed: 'left',
                align: 'center',
                render: (h, { row }) => {
                    const classNameMap: Record<string, any> = {
                        [CASE_STATUS.PROCEEDING]: 'green',
                        [CASE_STATUS.SUSPEND]: 'red',
                    }
                    return <span class={`sg-dot ${classNameMap[row.caseStatus]}`}>{row.caseStatusName}</span>
                },
            },
            {
                label: '承办人',
                prop: 'caseHandleName',
                width: '180',
                fixed: 'left',
                align: 'left',
                render: (h, { row }) => {
                    const caseHandleNameArr = row.caseHandleName.split(',')
                    return (
                        <div class="undertaker-box">
                            <div class={{ 'click-style': +row.adjustStatus === 1 }} onClick={() => this.handleShowAdjustDialog(row)}>
                                <span>{caseHandleNameArr?.[0]}</span>
                                <svg-icon style="margin: 0 5px;" icon="mt-host-person"></svg-icon>、<span>{caseHandleNameArr?.[1]}</span>
                            </div>
                        </div>
                    )
                },
            },
            {
                label: '办案部门',
                prop: 'caseDeptName',
                width: '180',
                'show-overflow-tooltip': true,
                fixed: 'left',
                align: 'left',
            },
            {
                label: '当事人',
                prop: 'partyName',
                width: '200',
                'show-overflow-tooltip': true,
                align: 'left',
                render: (h, { row }) => {
                    return (
                        <div
                            onClick={() => {
                                // TODO: xxxx
                            }}
                            class={{ 'click-style': row.partyType === PARTY_TYPE.COMPANY, 'text-overflow': row.partyType === PARTY_TYPE.COMPANY }}
                        >
                            {row.partyName || '-'}
                        </div>
                    )
                },
            },
            {
                label: '案件编号',
                prop: 'caseNumber',
                'show-overflow-tooltip': true,
                width: '280',
                align: 'left',
                render: (h, { row }) => {
                    return row.caseNumber ? (
                        <div onClick={() => this.handleCaseDetail(row)} class="click-style">
                            {row.caseNumber}
                        </div>
                    ) : null
                },
            },
            {
                label: '案发地点',
                prop: 'caseHappenAddressDetail',
                width: '250',
                align: 'left',
            },
            {
                label: '办案单位',
                prop: 'caseOrgName',
                width: '135',
                align: 'left',
            },
            {
                label: '案件来源',
                prop: 'caseSource',
                width: '150',
                align: 'left',
            },
            {
                label: '案件类型',
                prop: 'caseType',
                width: '120',
                align: 'left',
                render: (h, { row }) => {
                    const map: Record<string, any> = {
                        [CASE_TYPE.QUICK]: '普通程序',
                        [CASE_TYPE.NORMAL]: '普通程序',
                        [CASE_TYPE.SIMPLE]: '简易程序',
                    }
                    return map[row.caseType]
                },
            },
            {
                label: '程序类型',
                prop: 'procedureType',
                width: '80',
                align: 'left',
                render: (h, { row }) => {
                    const map: Record<string, any> = {
                        [CASE_TYPE.QUICK]: '快办流程',
                        [CASE_TYPE.NORMAL]: '正常流程',
                        [CASE_TYPE.SIMPLE]: '/',
                    }
                    return map[row.caseType]
                },
            },
            {
                label: '办案阶段',
                prop: 'caseCurrentStageName',
                width: '135',
                align: 'left',
            },
            {
                label: '当前环节',
                prop: 'caseCurrentLinkName',
                width: '135',
                align: 'left',
                render: (h, { row }) => {
                    return row.caseStatus === CASE_STATUS.SUSPEND ? '已中止' : ''
                },
            },
            {
                label: '环节时间',
                prop: 'caseCurrentLinkStarttime',
                width: '170',
                align: 'left',
            },
            {
                label: '立案日期',
                prop: 'caseRegistTime',
                width: '170',
                align: 'left',
            },
            {
                label: '办案期限',
                prop: 'caseTimelimit',
                width: '250',
                align: 'left',
                render: (h, { row }) => {
                    return [
                        <span>{row.caseTimelimit || '-'}</span>,
                        /**时效：timeColor */
                        row.remainTime ? <div class="surplus-box">{row.remainTime}</div> : null,
                    ]
                },
            },
            {
                label: '操作',
                prop: 'action',
                width: '160',
                fixed: 'right',
                align: 'left',
                render: (h, { row }) => {
                    return [
                        {
                            label: '案件详情',
                            click: () => {},
                            visible: true,
                            hasPermission: true,
                        },
                        {
                            label: '添加配置',
                            click: () => {
                                this.$modalDialog(() => import('./AddRoleDialog.vue'))
                            },
                            visible: [CASE_STATUS.PROCEEDING].includes(row.caseStatus),
                            hasPermission: true,
                        },
                        {
                            label: '删除',
                            style: 'color:red;',
                            click: () => {},
                            visible: ![CASE_STATUS.PROCEEDING].includes(row.caseStatus),
                            hasPermission: true,
                        },
                    ]
                        .filter(({ visible, hasPermission }) => visible && hasPermission)
                        .map(item => (
                            <el-button type="text" style={item.style} class="action-btn" onClick={item.click}>
                                {item.label}
                            </el-button>
                        ))
                },
            },
        ]
    }
    /**表格数据加载方法 */
    tableLoad: TableLoad = async (pageInfo: any) => {
        const { data } = require('./ListMock.json')
        const result = data?.data ?? []
        const total = data.recordsTotal ?? 0
        return { result, total }
    }
    /**刷新数据 */
    refreshList() {}

    /** 显示调整记录*/
    async handleShowAdjustDialog(row: { adjustStatus: string; caseId: string }) {
        // 跳调整明细 无调整返回
    }
    /**案源详情 */
    handleCaseDetail(row: { caseType: string; caseId: string }) {
        if (row.caseType == CASE_TYPE.SIMPLE) {
            // TODO
        } else {
            // TODO
        }
    }
}
</script>

<style lang="less" scoped>
p,
h3 {
    margin: 0;
}
</style>
