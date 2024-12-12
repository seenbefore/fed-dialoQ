<template>
    <div class="sg-page icinfo-ai DepartmentList">
        <!-- 搜索框 -->
        <div class="sg-flexbox align-center justify-between" style="margin-bottom: 7px;">
            <div class="sg-flexbox align-center">
                <el-input v-model="keyword" placeholder="请输入部门名称" style="width: 200px;" @keyup.enter.native="handleSearch" clearable></el-input>
                <el-button type="primary" @click="handleSearch" style="margin-left: 10px;">搜索</el-button>
            </div>
            <div>
                <el-button type="primary" @click="handleAdd('')">新增</el-button>
            </div>
        </div>

        <!-- 列表展示 -->
        <sg-data-view v-bind="getTableAttrs" ref="tableRef"></sg-data-view>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import { FormRow, FormColumn, TableColumn, FormRef, TableRef } from '@/sharegood-ui'
import { StatusEnum, StatusEnumMap } from './enum'
import { tree, remove, DepartmentVO } from './api'

@Component({
    name: 'DepartmentList',
    components: {},
})
export default class DepartmentList extends Vue {
    keyword = ''
    loading = false
    StatusEnumMap = StatusEnumMap

    @Ref('tableRef')
    tableRef!: TableRef

    async handleSearch() {
        this.tableRef.onLoad({ page: 1 })
    }

    async handleAdd(parentId: string) {
        const result = await this.$modalDialog(() => import('./components/department-dialog/index.vue'), {
            action: 'create',
            parentId,
        })
        if (result) {
            this.handleSearch()
        }
    }

    async handleEdit(row: DepartmentVO) {
        const result = await this.$modalDialog(() => import('./components/department-dialog/index.vue'), {
            id: row.id,
            action: 'modify',
        })
        if (result) {
            this.handleSearch()
        }
    }

    async handleDelete(row: DepartmentVO) {
        await this.$confirm('删除后将无法找回', '确认删除？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
        })
        await remove({ id: row.id })
        this.$message.success('删除成功')
        this.handleSearch()
    }

    get getTableAttrs() {
        const columns: TableColumn[] = [
            {
                label: '部门名称',
                prop: 'name',
                minWidth: '180px',
                align: 'left',
            },
            {
                label: '状态',
                prop: 'status',
                width: '100px',
                align: 'left',
                render: (h, { row }) => {
                    return (
                        <el-tag type={row.status === StatusEnum.ENABLED ? 'success' : 'danger'} size="mini">
                            {StatusEnumMap[row.status as keyof typeof StatusEnumMap]?.label || '-'}
                        </el-tag>
                    )
                },
            },
            {
                label: '描述',
                prop: 'description',
                minWidth: '200px',
                align: 'left',
                render: (h, { row }) => {
                    return row.description || '-'
                },
            },
            {
                label: '创建时间',
                prop: 'createTime',
                width: '170px',
                align: 'left',
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
                            <el-button type="text" onClick={() => this.handleAdd(row.id)}>
                                新增
                            </el-button>
                            <el-button type="text" onClick={() => this.handleEdit(row)}>
                                编辑
                            </el-button>
                            <el-button type="text" danger onClick={() => this.handleDelete(row)}>
                                删除
                            </el-button>
                        </div>
                    )
                },
            },
        ]
        return {
            tableHeaderSticky: {
                scrollDom: () => document.querySelector('.DepartmentList'),
            },
            load: async (params: any = {}) => {
                const { data } = await tree({
                    name: this.keyword,
                })
                return {
                    result: data,
                    total: data.length,
                }
            },
            columns,
            // 树形表格配置
            treeProps: {
                children: 'children',
                hasChildren: 'hasChildren',
            },
            // 默认展开所有节点
            defaultExpandAll: true,
            // 树形表格必须指定row-key
            rowKey: 'id',
        }
    }
}
</script>

<style scoped lang="less">
.DepartmentList ::v-deep {
    padding: 10px;
    .el-table {
        .el-table__body {
            .cell {
                display: flex;
                align-items: center;
                .ellipsis-tooltip {
                    width: auto;
                }
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
