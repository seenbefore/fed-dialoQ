<template>
    <div class="sg-page icinfo-ai CaseSearch">
        <!-- 查询条件 -->
        <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel" @submit="handleSearch" @reset="handleSearch"></sg-base-form>

        <!-- 列表 -->
        <sg-data-view v-bind="getTableAttrs" ref="tableRef"></sg-data-view>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Ref } from 'vue-property-decorator'
import { FormColumn, FormRef, TableColumn, TableRef } from '@/sharegood-ui'
import { StatusEnum, StatusEnumMap } from './enum'
import { list, getDictList } from './api'
import moment from 'moment'
import { apply } from '@/services/auto/common/volume/view'
import { useLoading } from '@/hooks/useLoading'

@Component({
    name: 'CaseSearch',
    components: {},
})
export default class CaseSearch extends Vue {
    @Ref('formRef')
    formRef!: FormRef

    @Ref('tableRef')
    tableRef!: TableRef

    formModel: Record<string, any> = {}

    handleSearch() {
        this.tableRef.onLoad({ page: 1 })
    }
    handleBtnClick(item: { code: string }, row: any) {
        switch (item.code) {
            //查看
            case 'view':
                this.handleView(row)
                break
            //申请查看
            case 'applyfor':
                this.handleApply(row)
                break
        }
    }
    /**查看 */
    async handleView(row: any) {
        const { volumeUrl } = row
        await this.$modalDialog(() => import('@/views/file-review/components/file-dialog/index.vue'), {
            fileUrl: volumeUrl,
        })
    }
    /**申请查看 */
    async handleApply(row: any) {
        const result = await this.$modalDialog(() => import('./components/apply-dialog/index.vue'), {})
        if (result) {
            await useLoading(apply, {
                volumeId: row.id,
                applyReason: result.reason,
            })
            this.$message.success('申请成功')
            this.handleSearch()
        }
    }

    get getFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'select',
                name: 'volumeType',
                label: '卷宗类型',
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
                label: '卷宗名称',
                attrs: {
                    placeholder: '请输入',
                },
            },
            {
                tag: 'input',
                name: 'objectName',
                label: '对象',
                attrs: {
                    placeholder: '请输入',
                },
            },
            {
                tag: 'input',
                name: 'archiveNumber',
                label: '归档号',
                attrs: {
                    placeholder: '请输入',
                },
            },
            {
                tag: 'select',
                name: 'applyStatus',
                label: '申请状态',
                attrs: {
                    placeholder: '请选择',
                    options: async () => {
                        return Object.values(StatusEnumMap)
                    },
                },
            },
            {
                tag: 'action',
                span: 24,
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
        ]
        return {
            span: 8,
            fields,
        }
    }

    get getTableAttrs() {
        const columns: TableColumn[] = [
            {
                label: '序号',
                type: 'index',
                width: '50px',
                fixed: 'left',
            },
            {
                label: '卷宗类型',
                prop: 'volumeType',
                minWidth: '120px',
            },
            {
                label: '卷宗名称',
                prop: 'volumeName',
                minWidth: '250px',
            },
            {
                label: '编号',
                prop: 'volumeNumber',
                minWidth: '250px',
            },
            {
                label: '对象',
                prop: 'objectName',
                minWidth: '120px',
            },
            {
                label: '归档日期',
                prop: 'archiveDate',
                width: '170px',
                render: (h, { row }) => {
                    return <span>{moment(row.archiveDate).format('YYYY-MM-DD')}</span>
                },
            },
            {
                label: '归档号',
                prop: 'archiveNumber',
                minWidth: '250px',
            },
            {
                label: '申请状态',
                prop: 'applyStatus',
                minWidth: '100px',
                render: (h, { row }) => {
                    const status = StatusEnumMap[row.applyStatus as keyof typeof StatusEnumMap]
                    const colorMap = {
                        [StatusEnum.PENDING]: '#FF9900',
                        [StatusEnum.APPROVED]: '#67C23A',
                        [StatusEnum.REJECTED]: '#F56C6C',
                    }
                    const color = colorMap[row.applyStatus as keyof typeof StatusEnum] || ''

                    if (row.applyStatus === StatusEnum.REJECTED) {
                        return (
                            <el-tooltip content={row.approveRemark || '无退回理由'} placement="top" effect="light">
                                <span style={{ color }}>{status?.label || '-'}</span>
                            </el-tooltip>
                        )
                    }

                    return <span style={{ color }}>{status?.label || '-'}</span>
                },
            },
            {
                label: '更新时间',
                prop: 'updateTime',
                width: '170px',
                render: (h, { row }) => {
                    return <span>{moment(row.updateTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                },
            },
            {
                label: '操作',
                prop: 'action',
                width: '120px',
                fixed: 'right',
                render: (h, { row }) => {
                    return (
                        <div>
                            {row.buttons?.map(item => {
                                return (
                                    <el-button type="text" onClick={() => this.handleBtnClick(item, row)} disabled={item.disabled === '1'}>
                                        {item.text}
                                    </el-button>
                                )
                            })}
                        </div>
                    )
                },
            },
        ]

        return {
            pageActionLayout: [],
            load: async (params: any = {}) => {
                const { data } = await list({
                    ...params,
                    ...this.formModel,
                })
                return {
                    result: data.data,
                    total: parseInt(data.recordsTotal),
                }
            },
            columns,
        }
    }
}
</script>

<style lang="less" scoped>
.CaseSearch ::v-deep {
    padding: 0px;
}
</style>
