<template>
    <div class="sg-page icinfo-ai CaseSort">
        <!-- 查询条件 -->
        <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel" @submit="handleSearch" @reset="handleSearch"></sg-base-form>

        <!-- 列表 -->
        <sg-data-view v-bind="getTableAttrs" ref="tableRef"></sg-data-view>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import { FormRow, FormColumn, TableColumn, FormRef, TableRef } from '@/sharegood-ui'
import { SORT_STATUS, SORT_STATUS_MAP } from './enum'
import { list, getDictList } from './api'
import moment from 'moment'

@Component({
    name: 'CaseSort',
    components: {},
})
export default class CaseSort extends Vue {
    @Ref('formRef')
    formRef!: FormRef

    @Ref('tableRef')
    tableRef!: TableRef

    formModel: Record<string, any> = {}

    get getFormAttrs() {
        const fields: FormRow[] = [
            {
                columns: [
                    {
                        tag: 'select',
                        name: 'volumeType',
                        itemAttrs: {
                            label: '卷宗类型',
                        },
                        attrs: {
                            placeholder: '请选择',
                            filterable: true,
                            'default-first-option': true,
                            options: async () => {
                                const { data } = await getDictList({ dictType: 'archive_type' })
                                return data.map((item: any) => ({
                                    label: item.dictChineseName,
                                    value: item.dictCode,
                                }))
                            },
                        },
                    },
                    {
                        tag: 'input',
                        name: 'volumeName',
                        itemAttrs: {
                            label: '卷宗名称',
                        },
                        attrs: {
                            placeholder: '请输入',
                        },
                    },
                    {
                        tag: 'input',
                        name: 'volumeObject',
                        itemAttrs: {
                            label: '对象',
                        },
                        attrs: {
                            placeholder: '请输入',
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        tag: 'input',
                        name: 'archiveNumber',
                        itemAttrs: {
                            label: '归档号',
                        },
                        attrs: {
                            placeholder: '请输入',
                        },
                    },
                    {
                        tag: 'select',
                        name: 'status',
                        itemAttrs: {
                            label: '整理状态',
                        },
                        attrs: {
                            placeholder: '请选择',
                            options: [{ label: '全部', value: '' }, ...Object.values(SORT_STATUS_MAP)],
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
                                svgIcon: 'icon-search',
                                icon: 'search-btn',
                            },
                            {
                                isReset: true,
                                type: 'reset',
                                text: '重置',
                                svgIcon: 'icon-reset',
                                icon: 'icon-reset',
                            },
                        ],
                    },
                ],
            },
        ]
        return {
            span: 8,
            fields,
        }
    }

    get getTableAttrs() {
        const columns: TableColumn[] = [
            {
                label: '卷宗类型',
                prop: 'volumeType',
                minWidth: '100px',
            },
            {
                label: '卷宗名称',
                prop: 'volumeName',
                minWidth: '200px',
            },
            {
                label: '编号',
                prop: 'code',
                minWidth: '200px',
            },
            {
                label: '对象',
                prop: 'volumeObject',
                minWidth: '120px',
            },
            {
                label: '归档日期',
                prop: 'archiveDate',
                minWidth: '120px',
            },
            {
                label: '归档号',
                prop: 'archiveNumber',
                minWidth: '200px',
            },
            {
                label: '整理状态',
                prop: 'status',
                minWidth: '100px',
                render: (h, { row }) => {
                    const { status } = row
                    const { label, color } = SORT_STATUS_MAP[status] || {}
                    return <span style={{ color }}>{label}</span>
                },
            },
            {
                label: '更新时间',
                prop: 'updateTime',
                minWidth: '160px',
                render: (h, { row }) => {
                    return <span>{moment(row.updateTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                },
            },
            {
                label: '操作',
                prop: 'action',
                fixed: 'right',
                width: '120px',
                render: (h, { row }) => {
                    return (
                        <div>
                            <el-button type="text" onClick={() => this.handleSort(row)}>
                                整理
                            </el-button>
                            <el-button type="text" onClick={() => this.handleView(row)}>
                                查看
                            </el-button>
                        </div>
                    )
                },
            },
        ]

        return {
            load: async (params: any = {}) => {
                const { data } = await list({ ...params, ...this.formModel })
                return {
                    result: data.data,
                    total: data.recordsTotal,
                }
            },
            columns,
        }
    }

    handleSearch() {
        this.tableRef.onLoad({ page: 1 })
    }

    handleSort(row: any) {
        this.$router.push({
            path: '/file-review/case-sort/save',
            query: { id: row.id },
        })
    }

    async handleView(row: any) {
        const { archiveUrl } = row
        console.log(archiveUrl)
        await this.$modalDialog(() => import('@/views/file-review/components/file-dialog/index.vue'), {
            fileUrl: row.volumeUrl,
        })
    }
}
</script>

<style lang="less" scoped>
.CaseSort {
    padding: 20px;
}
</style>
