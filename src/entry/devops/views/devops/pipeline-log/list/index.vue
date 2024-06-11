<!-- 岗位管理 -->
<template>
    <PageWrapper class="DevopsPipelineLogList column" :title="''">
        <template v-slot:title>
            <el-button type="danger" :disabled="selected.length === 0" @click="handleBatchDelete">批量删除</el-button>
        </template>
        <sg-base-form ref="formRef" v-bind="formAttrs" v-model="formModel" @submit="handleSearch" @reset="handleSearch"></sg-base-form>
        <sg-data-view ref="tableRef" v-bind="tableAttrs" @selection-change="onChange"></sg-data-view>
    </PageWrapper>
</template>

<script lang="tsx">
import { FormColumn, FormRef, TableColumn, TableLoad, TableRef, FormRow } from '@/sharegood-ui'
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { AnyType } from '@/@types'
import PageWrapper from '@/components/PageWrapper/index.vue'
import { PipelineLogService } from '@/entry/devops/api'

type FormModel = AnyType<{
    name: string
}>
@Component({
    name: 'DevopsPipelineLogList',
    components: {
        PageWrapper,
    },
})
export default class DevopsPipelineLogList extends Vue {
    selected: any[] = []
    mounted() {}
    @Ref('formRef')
    formRef!: FormRef
    /**表单值 */
    formModel = {} as FormModel
    /**表单配置 */
    get formAttrs() {
        return {
            span: 6,
            fields: [
                {
                    tag: 'input',
                    name: 'row$',
                    itemAttrs: {
                        label: '关键字',
                    },
                    attrs: {
                        placeholder: '支持模糊查询',
                    },
                },
                {
                    tag: 'input',
                    name: 'pipelineId',
                    itemAttrs: {
                        label: 'pipelineId',
                    },
                    attrs: {
                        placeholder: '',
                    },
                },
                {
                    tag: 'input',
                    name: 'logId',
                    itemAttrs: {
                        label: 'logId',
                    },
                    attrs: {
                        placeholder: '',
                    },
                },

                {
                    tag: 'action',
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
            height: '100%',
            border: false,
            pagination: { pageSize: 10 },

            load: async (pageInfo: any) => {
                const model: FormModel = this.formRef.getState()
                const { ...rest } = model
                const body = {
                    ...pageInfo,
                    conditions: {
                        ...rest,
                    },
                }
                const { data } = await PipelineLogService.query(body)

                return {
                    result: data.list,
                    total: data.total,
                }
            },
            columns: [
                {
                    label: '全选',
                    type: 'selection',
                },

                {
                    label: '操作',
                    prop: 'action',
                    width: '80px',
                    fixed: 'right',
                    align: 'left',
                    render: (h, { row }) => {
                        return (
                            <div>
                                <el-button
                                    type="text"
                                    class="sg-error-color"
                                    onClick={() => {
                                        this.handleDelete(row)
                                    }}
                                >
                                    删除
                                </el-button>
                            </div>
                        )
                    },
                },

                {
                    label: 'logId',
                    prop: 'logId',
                    minWidth: '80px',
                },
                {
                    label: 'status',
                    prop: 'status',
                    minWidth: '50px',
                },
                {
                    label: 'target',
                    prop: 'target',
                    minWidth: '80px',
                },

                {
                    label: 'pipelineId',
                    prop: 'pipelineId',
                    minWidth: '150px',
                },
                {
                    label: 'name',
                    prop: 'name',
                    minWidth: '150px',
                },
                {
                    label: 'userId',
                    prop: 'userId',
                    minWidth: '80px',
                },
                {
                    label: '长度',
                    prop: 'weight',
                    minWidth: '50px',
                    render: (h, { row }) => {
                        const result = JSON.stringify(row).length
                        return <div>{result}</div>
                    },
                },
            ] as TableColumn[],
        }
    }
    onChange(val: any) {
        this.selected = val.map((item: any) => ({ id: item.id }))
    }
    handleBatchDelete() {
        const ids = this.selected
        this.$confirm(`确认删除这${ids.length}项吗`).then(async () => {
            await PipelineLogService.remove(
                {
                    id: ids,
                },
                {
                    exShowLoading: true,
                    // exShowLoadingOption: {
                    //     target: '#table',
                    //     text: '删除中',
                    // },
                },
            )
            this.$message.success('删除成功')
            const tableRef = this.$refs.tableRef as TableRef
            tableRef.onLoad()
        })
    }
    handleDelete(row: any) {
        const id = row.id
        this.$confirm('确认删除吗').then(async () => {
            await PipelineLogService.remove(
                {
                    id,
                },
                {
                    exShowLoading: true,
                    // exShowLoadingOption: {
                    //     target: '#table',
                    //     text: '删除中',
                    // },
                },
            )
            this.$message.success('删除成功')
            const tableRef = this.$refs.tableRef as TableRef
            tableRef.onLoad()
        })
    }

    /**刷新数据 */
    handleSearch() {
        this.tableRef.onLoad({ page: 1 })
    }
}
</script>

<style lang="less" scoped>
.AdminSystemPost ::v-deep {
}
</style>
