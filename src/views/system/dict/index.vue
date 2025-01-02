<template>
    <div class="sg-page icinfo-ai DictManage">
        <div class="dict-container">
            <!-- 左侧字典类型列表 -->
            <div class="dict-type-list">
                <div class="dict-type-header">
                    <div class="title">字典类型</div>
                    <el-button type="primary" size="small" @click="handleAddType">新增类型</el-button>
                </div>
                <div class="dict-type-search">
                    <el-input v-model="searchKey" placeholder="请输入类型名称/编码" prefix-icon="el-icon-search" clearable size="small" @input="handleSearch"></el-input>
                </div>
                <el-menu :default-active="activeType" class="dict-menu" text-color="#333" active-text-color="#fff" @select="handleTypeSelect">
                    <el-menu-item v-for="item in filteredDictTypes" :key="item.code" :index="item.code">
                        <div class="menu-item-content">
                            <span class="item-name">{{ item.name }}</span>
                            <span class="item-code">{{ item.code }}</span>
                        </div>
                    </el-menu-item>
                </el-menu>
            </div>

            <!-- 右侧字典值列表 -->
            <div class="dict-value-list">
                <!-- 操作按钮 -->
                <div class="sg-flexbox align-center mb-10">
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                    <el-button type="danger" @click="handleBatchOperation">批量删除</el-button>
                </div>

                <!-- 列表 -->
                <sg-data-view v-bind="getTableAttrs" ref="tableRef"></sg-data-view>
            </div>
        </div>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Ref } from 'vue-property-decorator'
import { TableColumn, TableRef } from '@/sharegood-ui'
import { list, save, remove, getTypeList, DictTypeVO, DictValueVO } from './api'

@Component({
    name: 'DictManage',
    components: {},
})
export default class DictManage extends Vue {
    @Ref('tableRef')
    tableRef!: TableRef

    selectedRows: any[] = []

    // 字典类型列表
    dictTypes: DictTypeVO[] = []

    // 当前选中的字典类型
    activeType = 'notice_type'

    // 搜索关键字
    searchKey = ''

    // 过滤后的字典类型列表
    get filteredDictTypes() {
        if (!this.searchKey) return this.dictTypes
        const key = this.searchKey.toLowerCase()
        return this.dictTypes.filter(item => item.name.toLowerCase().includes(key) || item.code.toLowerCase().includes(key))
    }

    // 加载字典类型列表
    async loadDictTypes() {
        try {
            const res = await getTypeList()
            if (res.success) {
                this.dictTypes = res.data
                // 如果没有选中类型，默认选中第一个
                if (!this.activeType && this.dictTypes.length > 0) {
                    this.activeType = this.dictTypes[0].code
                    this.handleSearch()
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    // 处理字典类型选择
    handleTypeSelect(type: string) {
        this.activeType = type
        this.handleSearch()
    }

    // 处理添加字典类型
    async handleAddType() {
        const result = await this.$modalDialog(() => import('./components/type-dialog/index.vue'), {
            action: 'create',
        })
        if (result) {
            await this.loadDictTypes()
        }
    }

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
                label: '标签',
                prop: 'name',
                minWidth: '150px',
            },
            {
                label: '值',
                prop: 'value',
                minWidth: '150px',
            },
            {
                label: '排序',
                prop: 'sort',
                width: '100px',
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
                width: '120px',
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
                label: '创建时间',
                prop: 'createTime',
                width: '170px',
            },
            {
                label: '操作',
                prop: 'action',
                width: '150px',
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
            pageVisible: false,
            'row-key': 'id',
            load: async () => {
                const { data } = await list({
                    dictType: this.activeType,
                })
                return {
                    result: data.data || [],
                }
            },
            columns,
        }
    }

    handleSearch() {
        this.tableRef.onLoad({ page: 1 })
    }

    async handleAdd() {
        const result = await this.$modalDialog(() => import('./components/item-dialog/index.vue'), {
            action: 'create',
            dictType: this.activeType,
        })
        if (result) {
            this.handleSearch()
        }
    }

    async handleEdit(row: DictValueVO) {
        const result = await this.$modalDialog(() => import('./components/item-dialog/index.vue'), {
            action: 'modify',
            row,
            dictType: this.activeType,
        })
        if (result) {
            this.handleSearch()
        }
    }

    async handleDelete(row: DictValueVO) {
        await this.$confirm('删除后将无法恢复，是否继续？', '提示')
        try {
            await remove({ id: row.id })
            this.$message.success('删除成功')
            this.handleSearch()
        } catch (error) {
            console.error(error)
        }
    }

    async handleStatusChange(row: DictValueVO, value: string) {
        try {
            await save({
                id: row.id,
                status: value,
            })
            this.$message.success('修改成功')
        } catch (error) {
            console.error(error)
            // 恢复原值
            row.status = row.status === '1' ? '0' : '1'
        }
    }

    async handleSortChange(row: DictValueVO, value: number) {
        try {
            await save({
                id: row.id,
                sort: value,
            })
            this.$message.success('修改成功')
        } catch (error) {
            console.error(error)
            // 恢复原值
            row.sort = row.sort
        }
    }

    // 批量删除
    async handleBatchOperation() {
        const selection = this.tableRef.getSelection()

        if (selection.length === 0) {
            this.$message.warning('请选择要删除的数据')
            return
        }
        await this.$confirm(`确定要删除选中的 ${selection.length} 条数据吗？`, '提示')
        try {
            // TODO: 实现批量删除接口
            this.$message.success('删除成功')
            this.handleSearch()
        } catch (error) {
            console.error(error)
        }
    }

    mounted() {
        this.loadDictTypes()
    }
}
</script>

<style lang="less" scoped>
.DictManage ::v-deep {
    .dict-container {
        display: flex;
        gap: 10px;
        flex: 1;
        height: 100%;

        .dict-type-list {
            width: 240px;
            background: #fff;
            border-radius: 4px;
            border: 1px solid #e6e6e6;
            display: flex;
            flex-direction: column;

            .dict-type-header {
                padding: 12px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #e6e6e6;

                .title {
                    font-size: 16px;
                    font-weight: 500;
                }
            }

            .dict-type-search {
                padding: 10px;
                border-bottom: 1px solid #e6e6e6;

                .el-input {
                    .el-input__inner {
                        border-radius: 16px;
                    }
                }
            }

            .dict-menu {
                border-right: none;
                flex: 1;
                overflow-y: auto;

                // 覆盖 element-ui 的默认样式
                &.el-menu {
                    border-right: none;
                }

                .el-menu-item {
                    height: 40px;
                    line-height: 40px;
                    padding: 0 15px;
                    margin: 0;
                    border-radius: 0;

                    &.is-active {
                        background-color: var(--color-primary);
                        color: #fff;
                    }

                    &::before {
                        display: none;
                    }

                    .menu-item-content {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        width: 100%;

                        .item-name {
                            font-size: 14px;
                            flex: 1;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }

                        .item-code {
                            font-size: 12px;
                            margin-left: 8px;
                            opacity: 0.6;
                        }
                    }
                }
            }
        }

        .dict-value-list {
            flex: 1;
            background: #fff;
            border-radius: 4px;
            border: 1px solid #e6e6e6;
            padding: 10px;
            overflow: auto;
        }
    }

    .el-table {
        .el-table__body {
            .cell {
                display: flex;
                align-items: center;
            }
        }
    }
}
</style>
