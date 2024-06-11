<!-- 岗位管理 -->
<template>
    <PageWrapper class="AdminSystemPost column" :title="''">
        <template v-slot:title>
            <el-button type="default" icon="el-icon-plus" @click="handleCreate">新增</el-button>
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
import { UserPostService } from '@/entry/devops/api'

type FormModel = AnyType<{
    name: string
}>
@Component({
    name: 'AdminSystemPost',
    components: {
        PageWrapper,
    },
})
export default class AdminSystemPost extends Vue {
    selected: any[] = []
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
                    name: '%name%',
                    itemAttrs: {
                        label: '岗位名称',
                    },
                    attrs: {
                        placeholder: '支持模糊查询',
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
            tableHeaderSticky: {
                scrollDom: () => document.querySelector('.AdminSystemPost'),
            },
            load: async (pageInfo: any) => {
                const model: FormModel = this.formRef.getState()
                const { ...rest } = model
                const body = {
                    ...pageInfo,
                    conditions: {
                        ...rest,
                    },
                }
                const { data } = await UserPostService.list(body)

                return {
                    result: data.data,
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
                    width: '160px',
                    fixed: 'right',
                    align: 'left',
                    render: (h, { row }) => {
                        return (
                            <div>
                                <el-button
                                    type="text"
                                    onClick={() => {
                                        console.log(1)
                                    }}
                                >
                                    查看
                                </el-button>
                                <el-button
                                    type="text"
                                    onClick={() => {
                                        this.handleEdit(row)
                                    }}
                                >
                                    编辑
                                </el-button>
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
                    label: '岗位编码',
                    prop: 'code',
                    minWidth: '150px',
                },
                {
                    label: '岗位名称',
                    prop: 'name',
                    minWidth: '150px',
                },
                {
                    label: '岗位权重',
                    prop: 'weight',
                    minWidth: '150px',
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
            await UserPostService.remove({
                id: ids,
            })
            this.$message.success('删除成功')
            const tableRef = this.$refs.tableRef as TableRef
            tableRef.onLoad()
        })
    }
    handleDelete(row: any) {
        const id = row.id
        this.$confirm('确认删除吗').then(async () => {
            await UserPostService.remove(
                {
                    id,
                },
                {
                    exShowLoading: true,
                    exShowLoadingOption: {
                        target: '#table',
                        text: '删除中',
                    },
                },
            )
            this.$message.success('删除成功')
            const tableRef = this.$refs.tableRef as TableRef
            tableRef.onLoad()
        })
    }
    handleCreate() {
        this.$modalDialog(() => import('./components/EditDialog/index.vue'), {
            isEdit: false,
        })
            .then(async () => {
                this.handleSearch()
            })
            .catch((err: any) => {
                console.log(err)
            })
    }
    handleEdit(row: any) {
        this.$modalDialog(() => import('./components/EditDialog/index.vue'), {
            isEdit: true,
            row,
        })
            .then(async () => {
                this.handleSearch()
            })
            .catch((err: any) => {
                console.log(err)
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
