<template>
    <div class="sg-page icinfo-ai RoleManage">
        <!-- 查询条件 -->
        <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel" @submit="handleSearch" @reset="handleSearch"></sg-base-form>

        <!-- 操作按钮 -->
        <div class="sg-flexbox align-center mb-10">
            <el-button type="primary" @click="handleAdd">新增</el-button>
            <el-button type="danger" @click="handleBatchOperation">批量删除</el-button>
        </div>
        <!-- 列表 -->
        <sg-data-view v-bind="getTableAttrs" ref="tableRef" @selection-change="handleSelectionChange"></sg-data-view>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Ref } from 'vue-property-decorator'
import { FormColumn, FormRef, TableColumn, TableRef } from '@/sharegood-ui'
import { list, save, RoleVO } from './api'

@Component({
    name: 'RoleManage',
    components: {},
})
export default class RoleManage extends Vue {
    @Ref('formRef')
    formRef!: FormRef

    @Ref('tableRef')
    tableRef!: TableRef

    formModel: Record<string, any> = {}

    selectedRows: any[] = []

    get getFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'input',
                name: 'name',
                itemAttrs: {
                    label: '角色名称：',
                },
                attrs: {
                    placeholder: '请输入',
                    maxlength: 50,
                },
            },
            {
                tag: 'select',
                name: 'status',
                itemAttrs: {
                    label: '状态：',
                },
                attrs: {
                    placeholder: '请选择',
                    options: [
                        { label: '全部', value: '' },
                        { label: '启用', value: '1' },
                        { label: '停用', value: '0' },
                    ],
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
        ]
        return {
            span: 8,
            fields,
        }
    }

    // 是否全选
    isAllSelected = false

    get getTableAttrs() {
        const columns: TableColumn[] = [
            {
                type: 'selection',
                width: '50px',
                fixed: 'left',
            },
            {
                label: '序号',
                type: 'index',
                width: '60px',
                fixed: 'left',
            },
            {
                label: '角色名称',
                prop: 'name',
                minWidth: '200px',
                align: 'left',
            },
            {
                label: '角色描述',
                prop: 'description',
                minWidth: '300px',
                align: 'left',
                overflowCount: 1,
            },
            {
                label: '状态',
                prop: 'status',
                minWidth: '120px',
                align: 'left',
                render: (h, { row }) => {
                    return (
                        <el-switch
                            v-model={row.status}
                            active-value="1"
                            inactive-value="0"
                            active-text="启用"
                            inactive-text="停用"
                            active-color="#67C23A"
                            inactive-color="#909399"
                            onChange={(value: string) => this.handleStatusChange(row, value)}
                        ></el-switch>
                    )
                },
            },
            {
                label: '创建时间',
                prop: 'createTime',
                align: 'left',
                minWidth: '170px',
            },
            {
                label: '操作',
                prop: 'action',
                width: '180px',
                align: 'left',
                fixed: 'right',
                render: (h, { row }) => {
                    return (
                        <div>
                            <el-button type="text" onClick={() => this.handlePermission(row)}>
                                权限设置
                            </el-button>
                            <el-button type="text" onClick={() => this.handleEdit(row)}>
                                编辑
                            </el-button>
                            <el-button type="text" class="text-danger" danger={true} onClick={() => this.handleDelete(row)}>
                                删除
                            </el-button>
                        </div>
                    )
                },
            },
        ]

        return {
            load: async (params: any = {}) => {
                const { data } = await list({
                    ...params,
                    ...this.formModel,
                })
                const result = data.data.map((item: any) => {
                    return item
                })

                return {
                    result,
                    total: data.recordsTotal,
                }
            },
            columns,
        }
    }
    handleSelectionChange(selection: any[]) {
        this.selectedRows = selection
    }

    // 批量删除
    async handleBatchOperation() {
        const selectedNodes = [...this.selectedRows]
        if (selectedNodes.length === 0) {
            this.$message.warning('请选择要删除的角色')
            return
        }
        await this.$confirm('确定要删除选中的角色吗?')
        this.$message.success('删除成功')
        this.handleSearch()
    }

    handleSearch() {
        this.tableRef.onLoad({ page: 1 })
    }

    async handleAdd() {
        const result = await this.$modalDialog(() => import('./components/role-dialog/index.vue'), {
            action: 'create',
        })
        if (result) {
            this.handleSearch()
        }
    }

    async handleEdit(row: RoleVO) {
        const result = await this.$modalDialog(() => import('./components/role-dialog/index.vue'), {
            action: 'modify',
            id: row.id,
            row,
        })
        if (result) {
            this.handleSearch()
        }
    }

    async handleStatusChange(row: RoleVO, value: string) {
        try {
            await save({
                id: row.id,
                status: value,
            })
            this.$message.success('修改成功')
            this.handleSearch()
        } catch (error) {
            console.error(error)
            // 恢复原值
            row.status = row.status === '1' ? '0' : '1'
        }
    }

    async handleDelete(row: RoleVO) {
        await this.$confirm('删除后将无法恢复，是否继续？', '提示')
        this.$message.success('删除成功')
        this.handleSearch()
    }

    async handlePermission(row: RoleVO) {
        const result = await this.$modalDialog(() => import('./components/permission-dialog/index.vue'), {
            row,
        })
        if (result) {
            this.handleSearch()
        }
    }

    mounted() {}
}
</script>

<style lang="less" scoped>
.RoleManage ::v-deep {
    padding: 10px;

    .el-switch {
        .el-switch__label {
            display: none;
        }
        .el-switch__core {
            width: 50px !important;
            display: flex !important;
            align-items: center;
            background-color: transparent;
            background-color: transparent !important;
            &::before {
                content: '停用';
                display: inline-block;
                font-size: 12px;
                margin-left: 20px;
                color: #999;
                line-height: 1;
            }
            &::after {
                background-color: #d2d2d2 !important;
            }
        }

        &.is-checked {
            .el-switch__core {
                background-color: #67c23a !important;
                &::before {
                    content: '启用';
                    display: inline-block;
                    color: #fff;
                    font-size: 12px;
                    margin-left: 3px;
                }
                &::after {
                    background-color: #fff !important;
                }
            }
        }
    }
}
</style>
