<template>
    <div class="sg-page icinfo-ai DictManage">
        <!-- 查询条件 -->
        <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel" @submit="handleSearch" @reset="handleSearch"></sg-base-form>

        <!-- 操作按钮 -->
        <div class="sg-flexbox align-center mb-10">
            <el-button type="primary" @click="handleAdd">新增</el-button>
            <el-button type="danger" @click="handleBatchOperation">批量删除</el-button>
        </div>

        <!-- 列表 -->
        <sg-data-view v-bind="getTableAttrs" ref="tableRef"></sg-data-view>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Ref } from 'vue-property-decorator'
import { FormColumn, FormRef, TableColumn, TableRef } from '@/sharegood-ui'
import { list, save } from './api'
const subTypeLineIcon = require('./assets/sub_type_line.gif')

@Component({
    name: 'DictManage',
    components: {},
})
export default class DictManage extends Vue {
    subTypeLineIcon = subTypeLineIcon
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
                name: 'dictName',
                itemAttrs: {
                    label: '字典名称：',
                },
                attrs: {
                    placeholder: '请输入',
                    maxlength: 50,
                },
            },
            {
                tag: 'input',
                name: 'dictCode',
                itemAttrs: {
                    label: '字典编码',
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
                    label: '状态',
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
        ]
        return {
            autoLayout: true,
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
                type: '全选',
                width: '50px',
                fixed: 'left',
                renderHeader: (h, { column }) => {
                    return (
                        <el-checkbox
                            value={this.isAllSelected}
                            onChange={(val: boolean) => {
                                this.isAllSelected = val
                                this.handleSelectAll(val)
                            }}
                        ></el-checkbox>
                    )
                },
                render: (h, { row }) => {
                    return (
                        <el-checkbox
                            value={row.checked}
                            onChange={(val: boolean) => {
                                this.$set(row, 'checked', val)
                                this.updateParentCheckStatus(this.dataList)
                            }}
                        ></el-checkbox>
                    )
                },
            },
            {
                label: '序号',
                type: 'index',
                width: '60px',
                fixed: 'left',
            },
            {
                label: '名称',
                prop: 'name',
                minWidth: '200px',
                align: 'left',
                render: (h, { row }) => {
                    const isLeaf = !row.children || row.children.length === 0
                    return (
                        <div class="name-cell">
                            {isLeaf && <img src={subTypeLineIcon} class="leaf-icon" />}
                            <span>{row.name}</span>
                        </div>
                    )
                },
            },
            {
                label: '代码值',
                prop: 'code',
                minWidth: '150px',
                align: 'left',
            },
            {
                label: '类型',
                prop: 'type',
                minWidth: '100px',
                align: 'left',
            },
            {
                label: '排序',
                prop: 'sort',
                minWidth: '120px',
                align: 'left',
                render: (h, { row }) => {
                    return (
                        <el-input-number
                            v-model={row.sort}
                            controls-position="right"
                            min={1}
                            size="mini"
                            style="width: 80px"
                            onChange={(value: number) => this.handleSortChange(row, value)}
                        ></el-input-number>
                    )
                },
            },
            {
                label: '值',
                prop: 'value',
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
                            active-text="显示"
                            inactive-text="隐藏"
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
                width: '120px',
                align: 'left',
                fixed: 'right',
                render: (h, { row }) => {
                    return (
                        <div>
                            <el-button type="text" onClick={() => this.handleAdd(row)}>
                                新增
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
            pageVisible: false,
            'row-key': 'id',
            'tree-props': {
                children: 'children',
                hasChildren: 'hasChildren',
            },
            'default-expand-all': true,
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

    // 全选反选 树的所有节点
    handleSelectAll(val: boolean) {
        const dataSource = this.dataList
        this.selectTree(dataSource, val)
    }
    selectTree(dataList: any[], val: boolean) {
        dataList.forEach(item => {
            this.$set(item, 'checked', val)
            if (item.children && item.children.length > 0) {
                this.selectTree(item.children, val)
            }
        })
    }
    // 获取整颗树选中的节点
    getSelectedNodes() {
        const selectedNodes: any[] = []
        const traverseTree = (nodes: any[]) => {
            nodes.forEach(node => {
                if (node.checked) {
                    selectedNodes.push(node)
                }
                if (node.children && node.children.length > 0) {
                    traverseTree(node.children)
                }
            })
        }
        traverseTree(this.dataList)
        return selectedNodes
    }
    // 批量操作案例
    handleBatchOperation() {
        const selectedNodes = this.getSelectedNodes()
            .map(item => item.name)
            .join(',')
        console.log(selectedNodes)
        this.$message.success(`已选中节点：${selectedNodes}`)
    }

    handleSearch() {
        this.tableRef.onLoad({ page: 1 })
    }

    async handleAdd(row: any) {
        const result = await this.$modalDialog(() => import('./components/dict-dialog/index.vue'), {
            action: 'create',
            parentRow: row,
        })
        if (result) {
            this.handleSearch()
        }
    }

    async handleEdit(row: any) {
        const result = await this.$modalDialog(() => import('./components/dict-dialog/index.vue'), {
            action: 'modify',
            id: row.id,
            row,
        })
        if (result) {
            this.handleSearch()
        }
    }

    async handleStatusChange(row: any, value: string) {
        try {
            row.status = value
            // await save({
            //     id: row.id,
            //     status: value,
            // })
            // this.$message.success('修改成功')
            //this.handleSearch()
        } catch (error) {
            console.error(error)
        }
    }

    async handleDelete(row: any) {
        await this.$confirm('删除后将无法恢复，是否继续？', '提示')
        this.$message.success('删除成功')
        this.handleSearch()
    }

    async handleSortChange(row: any, value: number) {
        try {
            row.sort = value
            // await save({
            //     id: row.id,
            //     sort: value,
            // })
            this.$message.success('修改成功')
            //this.handleSearch()
        } catch (error) {
            console.error(error)
            // 恢复原值
            row.sort = row.sort
        }
    }

    mounted() {}

    updateParentCheckStatus(dataList: any[]) {
        let allChecked = true
        for (const item of dataList) {
            if (!item.checked) {
                allChecked = false
                break
            }
            if (item.children && item.children.length > 0) {
                const childrenAllChecked = this.updateParentCheckStatus(item.children)
                if (!childrenAllChecked) {
                    allChecked = false
                }
            }
        }
        this.isAllSelected = allChecked
        return allChecked
    }
}
</script>

<style lang="less" scoped>
.DictManage ::v-deep {
    padding: 10px;
    .el-table {
        .el-table__body {
            .cell {
                display: flex;
                align-items: center;
            }
        }
    }

    .name-cell {
        display: flex;
        align-items: center;
        gap: 4px;
        .leaf-icon {
            width: 16px;
            height: 16px;
            object-fit: contain;
        }
    }
}
</style>
