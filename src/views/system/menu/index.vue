<template>
    <div class="sg-page icinfo-ai MenuManage">
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
import { list, save, MenuVO } from './api'
const subTypeLineIcon = require('./assets/sub_type_line.gif')
@Component({
    name: 'MenuManage',
    components: {},
})
export default class MenuManage extends Vue {
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
                    label: '菜单名称：',
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
                        { label: '显示', value: '1' },
                        { label: '隐藏', value: '0' },
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
    private dataList: any[] = []
    subTypeLineIcon = subTypeLineIcon
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
                label: '图标',
                prop: 'icon',
                minWidth: '100px',
                align: 'left',
                render: (h, { row }) => {
                    return <i class={row.icon}></i>
                },
            },
            {
                label: '路由地址',
                prop: 'uri',
                minWidth: '200px',
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
                width: '150px',
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

    // 批量删除
    async handleBatchOperation() {
        const selectedNodes = this.getSelectedNodes()
        if (selectedNodes.length === 0) {
            this.$message.warning('请选择要删除的菜单')
            return
        }
        await this.$confirm('确定要删除选中的菜单吗?')
        this.$message.success('删除成功')
        this.handleSearch()
    }

    handleSearch() {
        this.tableRef.onLoad({ page: 1 })
    }

    async handleAdd(row?: MenuVO) {
        const result = await this.$modalDialog(() => import('./components/menu-dialog/index.vue'), {
            action: 'create',
            parentRow: row,
        })
        if (result) {
            this.handleSearch()
        }
    }

    async handleEdit(row: MenuVO) {
        const result = await this.$modalDialog(() => import('./components/menu-dialog/index.vue'), {
            action: 'modify',
            id: row.id,
            row,
        })
        if (result) {
            this.handleSearch()
        }
    }

    async handleStatusChange(row: MenuVO, value: string) {
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

    async handleDelete(row: MenuVO) {
        await this.$confirm('删除后将无法恢复，是否继续？', '提示')
        this.$message.success('删除成功')
        this.handleSearch()
    }

    async handleSortChange(row: MenuVO, value: number) {
        try {
            await save({
                id: row.id,
                sort: value,
            })
            this.$message.success('修改成功')
            this.handleSearch()
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
.MenuManage ::v-deep {
    padding: 10px;
    .el-table {
        .el-table__body {
            .cell {
                display: flex;
                align-items: center;
            }
        }
    }
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
                content: '隐藏';
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
                    content: '显示';
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
