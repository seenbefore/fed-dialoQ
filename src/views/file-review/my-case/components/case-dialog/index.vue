<template>
    <el-dialog class="icinfo-ai CaseDialog" :title="title" :visible="true" width="800px" @close="cancel">
        <!-- 查询条件 -->
        <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel" @submit="handleSearch" @reset="handleSearch"></sg-base-form>

        <!-- 列表 -->
        <sg-data-view v-bind="getTableAttrs" ref="tableRef"></sg-data-view>

        <div slot="footer">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="confirm" :disabled="!selectedRow">确定</el-button>
        </div>
    </el-dialog>
</template>

<script lang="tsx">
import { Component, Vue, Ref } from 'vue-property-decorator'
import { FormColumn, FormRef, TableColumn, TableRef } from '@/sharegood-ui'

@Component({
    name: 'CaseDialog',
    components: {},
})
export default class CaseDialog extends Vue {
    @Ref('formRef') formRef!: FormRef
    @Ref('tableRef') tableRef!: TableRef

    formModel: Record<string, any> = {}
    selectedRow: any = null

    // 模拟数据
    tableData = [
        {
            id: 1,
            name: 'XXXXXXXXXXXXX',
            code: 'XXXXX立字〔2022〕第XXXXXX号',
            target: 'XXX等2个',
            createDate: 'XXXX-XX-XX',
        },
        {
            id: 2,
            name: 'XXXXXXXXXXXXX',
            code: 'XXXXX立字〔2022〕第XXXXXX号',
            target: 'XXX',
            createDate: 'XXXX-XX-XX',
        },
    ]

    get title() {
        return '新增'
    }

    handleSearch() {
        this.tableRef.onLoad({ page: 1 })
    }

    handleRowClick(row: any) {
        this.selectedRow = row
    }

    handleSelect(row: any) {
        this.selectedRow = row
        this.confirm()
    }

    get getFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'input',
                name: 'name',
                label: '名称',
                attrs: {
                    placeholder: '输入文献名进行过滤',
                    clearable: true,
                    prefixIcon: 'el-icon-search',
                },
            },
            {
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
            span: 12,
            fields,
        }
    }

    get getTableAttrs() {
        const columns: TableColumn[] = [
            {
                label: '名称',
                prop: 'name',
                minWidth: '200px',
            },
            {
                label: '编号',
                prop: 'code',
                minWidth: '200px',
            },
            {
                label: '对象',
                prop: 'target',
                minWidth: '120px',
            },
            {
                label: '创建日期',
                prop: 'createDate',
                width: '170px',
            },
            {
                label: '操作',
                prop: 'action',
                width: '80px',
                fixed: 'right',
                render: (h, { row }) => {
                    return (
                        <el-button type="text" onClick={() => this.handleSelect(row)}>
                            选择
                        </el-button>
                    )
                },
            },
        ]

        return {
            height: '400px',
            pageVisible: false,
            load: async (params: any = {}) => {
                // 过滤数据
                let result = this.tableData
                if (this.formModel.name) {
                    const searchText = this.formModel.name.toLowerCase()
                    result = this.tableData.filter(
                        item => item.name.toLowerCase().includes(searchText) || item.code.toLowerCase().includes(searchText) || item.target.toLowerCase().includes(searchText),
                    )
                }
                return {
                    result,
                    total: result.length,
                }
            },
            columns,
        }
    }

    async confirm() {
        if (!this.selectedRow) return
        this.$options.confirm?.(this.selectedRow)
    }

    cancel() {
        this.$options.cancel?.()
    }
}
</script>

<style lang="less" scoped>
.CaseDialog ::v-deep {
    .el-dialog__body {
        padding: 15px 20px;
    }

    .sg-data-view {
        margin-top: 15px;
        border: 1px solid #e4e7ed;
        border-radius: 4px;

        .el-table__row {
            cursor: pointer;
            &.selected {
                background-color: #f5f7fa;
            }
        }
    }
}
</style>
