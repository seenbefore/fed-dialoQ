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
import { list } from './api'

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
    tableData = []

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
                name: 'caseName',
                label: '名称',
                attrs: {
                    placeholder: '请输入',
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
                prop: 'caseName',
                minWidth: '200px',
            },
            {
                label: '编号',
                prop: 'caseNumber',
                minWidth: '200px',
            },
            {
                label: '对象',
                prop: 'party',
                minWidth: '120px',
            },
            {
                label: '创建日期',
                prop: 'createTime',
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
            auto: false,
            pageVisible: false,
            load: async (params: any = {}) => {
                const payload: any = {
                    ...this.formModel,
                }
                const { data } = await list(payload)
                return {
                    result: data,
                    total: data.length,
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
