<!-- 我的已办 -->
<template>
    <div class="sg-page WorkbenchDone">
        <el-card class="my-card">
            <div slot="header" class="ic-row middle">
                <div class="ic-col-flex-1 ic-row middle">
                    <span class="ic-font-20 ic-bold ic-mr-4">我的已办</span>
                </div>
            </div>
            <section class="sg-card">
                <sg-base-form ref="formRef" v-bind="formAttrs" v-model="formModel" @submit="refreshList" @reset="refreshList"></sg-base-form>
                <sg-data-view ref="tableRef" v-bind="tableAttrs"></sg-data-view>
            </section>
        </el-card>
    </div>
</template>

<script lang="tsx">
import { FormColumn, FormRef, TableColumn, TableLoad, TableRef, FormRow } from '@/sharegood-ui'
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { AnyType } from '@/@types'
import { Helper } from './helper'
type FormModel = AnyType<{
    name: string
}>
@Component({
    name: 'WorkbenchDone',
    components: {},
})
export default class WorkbenchDone extends Vue {
    mounted() {}
    @Ref('formRef')
    formRef!: FormRef
    /**表单值 */
    formModel = {} as FormModel
    /**表单配置 */
    get formAttrs() {
        return {
            span: 8,
            fields: [
                {
                    tag: 'input',
                    name: 'cusName',
                    itemAttrs: {
                        label: '客户名称',
                    },
                    attrs: {
                        placeholder: '支持模糊查询',
                    },
                },
                {
                    tag: 'input',
                    name: 'unicode',
                    itemAttrs: {
                        label: '统一社会信用代码',
                    },
                    attrs: {
                        placeholder: '支持模糊查询',
                    },
                },
                {
                    tag: 'input',
                    name: 'cuidcsid',
                    itemAttrs: {
                        label: '客户号',
                    },
                    attrs: {
                        placeholder: '支持模糊查询',
                    },
                },
                {
                    tag: 'daterange',
                    name: '[updateTimeStart,updateTimeEnd]',
                    itemAttrs: {
                        label: '更新日期',
                    },
                    attrs: {
                        value: [],
                        startPlaceholder: '年/月/日',
                        endPlaceholder: '年/月/日',
                    },
                },
                {
                    tag: 'select',
                    name: 'examineStatus',
                    itemAttrs: {
                        label: '审批状态',
                    },
                    attrs: {
                        options: [
                            {
                                label: '全部',
                                value: '',
                            },
                            ...Helper.Dict.getOptions('examineStatus'),
                        ],
                    },
                },
                {
                    tag: 'select',
                    name: 'examineType',
                    itemAttrs: {
                        label: '待办类型',
                    },
                    attrs: {
                        options: [
                            {
                                label: '全部',
                                value: '',
                            },
                            ...Helper.Dict.getOptions('examineType'),
                        ],
                    },
                },
                {
                    tag: 'action',
                    span: 24,
                    buttons: [
                        {
                            isSubmit: true,
                            text: '查询',
                        },
                        {
                            isReset: true,
                            text: '重置',
                        },
                    ],
                },
            ] as FormColumn[],
        }
    }

    @Ref('tableRef')
    tableRef!: TableRef
    get tableAttrs() {
        return {
            border: false,
            pagination: { pageSize: 10 },
            tableHeaderSticky: {
                scrollDom: () => document.querySelector('.WorkbenchDone'),
            },
            load: async (pageInfo: any) => {
                const model: FormModel = this.formRef.getState()
                const { ...rest } = model
                const body = {
                    ...pageInfo,
                    ...rest,
                }
                const { data } = await Helper.list(body)
                console.log('load', body)

                return { result: data.data, total: data.total }
            },
            columns: [
                {
                    label: '序号',
                    prop: 'index',
                    type: 'index',
                    fixed: 'left',
                },

                {
                    label: '操作',
                    prop: 'action',
                    width: '80px',
                    fixed: 'left',
                    align: 'left',
                    render: (h, { row }) => {
                        return (
                            <div>
                                <el-button
                                    type="text"
                                    onClick={() => {
                                        this.$router.push({
                                            path: '/workbench/done/detail',
                                        })
                                    }}
                                >
                                    查看
                                </el-button>
                            </div>
                        )
                    },
                },
                {
                    label: '待办类型',
                    prop: 'examineType',
                    minWidth: '150px',
                    render: (h, { row }) => {
                        const { examineType } = row
                        const option = Helper.Dict.getOption('examineType', examineType)
                        return <div>{option.label}</div>
                    },
                },

                {
                    label: '客户名称',
                    prop: '客户名称',
                    minWidth: '150px',
                    render: (h, { row }) => {
                        const { pripid, cusName } = row
                        return (
                            <div>
                                <el-button
                                    type="text"
                                    onClick={() => {
                                        this.openNewPage('/market-customer/corporate-portrait/360-search/portrait-detail', { pripid })
                                    }}
                                >
                                    {cusName}
                                </el-button>
                            </div>
                        )
                    },
                },
                {
                    label: '统一社会信用代码',
                    prop: 'unicode',
                    minWidth: '180px',
                },
                {
                    label: '审批状态',
                    prop: 'examineStatus',
                    minWidth: '150px',
                    render: (h, { row }) => {
                        const { examineStatus } = row
                        const option = Helper.Dict.getOption('examineStatus', examineStatus)
                        return <div>{option.label}</div>
                    },
                },
                {
                    label: '流程节点',
                    prop: 'dealStatus',
                    minWidth: '150px',
                    render: (h, { row }) => {
                        const { dealStatus } = row
                        const option = Helper.Dict.getOption('dealStatus', dealStatus)
                        return <div>{option.label}</div>
                    },
                },
                {
                    label: '更新时间',
                    prop: 'updateTime',
                    minWidth: '170px',
                },
                {
                    label: '归属机构',
                    prop: 'deptName',
                    minWidth: '150px',
                },
                {
                    label: '客户经理',
                    prop: 'accountName',
                    minWidth: '150px',
                },
            ] as TableColumn[],
        }
    }

    /**刷新数据 */
    refreshList() {
        this.tableRef.onLoad({ page: 1 })
    }
}
</script>

<style lang="less" scoped>
.WorkbenchDone ::v-deep {
}
</style>
