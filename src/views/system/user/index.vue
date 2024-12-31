<template>
    <AdminPage class="UserManage">
        <!-- 查询条件 -->
        <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel" @submit="handleSearch" @reset="handleSearch"></sg-base-form>

        <!-- 列表 -->
        <sg-data-view v-bind="getTableAttrs" ref="tableRef" @selection-change="handleSelectionChange">
            <template #header>
                <!-- 操作按钮 -->
                <div class="sg-flexbox align-center">
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                    <el-button type="danger" @click="handleBatchOperation">批量删除</el-button>
                </div>
            </template>
        </sg-data-view>
    </AdminPage>
</template>

<script lang="tsx">
import AdminPage from '@/components/admin/admin-page/index.vue'
import { Component, Vue, Ref } from 'vue-property-decorator'
import { FormColumn, FormRef, TableColumn, TableRef } from '@/sharegood-ui'
import { list, save, UserVO } from './api'

@Component({
    name: 'UserManage',
    components: {
        AdminPage,
    },
})
export default class UserManage extends Vue {
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
                name: 'keyword',
                itemAttrs: {
                    label: '姓名/账号：',
                },
                attrs: {
                    placeholder: '请输入',
                    maxlength: 50,
                },
            },
        ]
        return {
            // 是否自动添加查询按钮
            autoAppendAction: true,
            fields,
        }
    }

    // 是否全选
    isAllSelected = false
    private dataList: any[] = []

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
                label: '区划',
                prop: 'area',
                minWidth: '200px',
                align: 'left',
            },
            {
                label: '姓名',
                prop: 'name',
                minWidth: '150px',
                align: 'left',
            },
            {
                label: '手机号码',
                prop: 'mobile',
                minWidth: '150px',
                align: 'left',
            },
            {
                label: '角色',
                prop: 'role',
                minWidth: '150px',
                align: 'left',
            },
            {
                label: '备注',
                prop: 'remark',
                minWidth: '200px',
                align: 'left',
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
                            onChange={(value: string) => this.handleStatusChange(row, value)}
                        ></el-switch>
                    )
                },
            },
            {
                label: '操作',
                prop: 'action',
                width: '120px',
                align: 'left',
                fixed: 'right',
                render: (h, { row }) => {
                    return (
                        <div>
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
                this.dataList = result
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
            this.$message.warning('请选择要删除的用户')
            return
        }
        await this.$confirm('确定要删除选中的用户吗?')
        this.$message.success('删除成功')
        this.handleSearch()
    }

    handleSearch() {
        this.tableRef.onLoad({ page: 1 })
    }

    async handleAdd() {
        const result = await this.$modalDialog(() => import('./components/user-dialog/index.vue'), {
            action: 'create',
        })
        if (result) {
            this.handleSearch()
        }
    }

    async handleEdit(row: UserVO) {
        const result = await this.$modalDialog(() => import('./components/user-dialog/index.vue'), {
            action: 'modify',
            id: row.id,
            row,
        })
        if (result) {
            this.handleSearch()
        }
    }

    async handleStatusChange(row: UserVO, value: string) {
        try {
            await save({
                id: row.id,
                status: value,
            })
            this.$message.success('修改成功')
            //this.handleSearch()
        } catch (error) {
            console.error(error)
            // 恢复原值
            row.status = row.status === '1' ? '0' : '1'
        }
    }

    async handleDelete(row: UserVO) {
        await this.$confirm('删除后将无法恢复，是否继续？', '提示')
        this.$message.success('删除成功')
        this.handleSearch()
    }

    mounted() {}
}
</script>

<style lang="less" scoped>
.UserManage ::v-deep {
    padding: 10px;
}
</style>
