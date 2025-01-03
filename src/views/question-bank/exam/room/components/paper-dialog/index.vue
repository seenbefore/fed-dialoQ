<template>
    <el-dialog class="PaperDialog" title="选择试卷" :visible="true" width="800px" @close="cancel">
        <!-- 查询条件 -->
        <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel" @submit="handleSearch" @reset="handleSearch"></sg-base-form>

        <!-- 列表展示 -->
        <sg-data-view v-bind="getTableAttrs" ref="tableRef"></sg-data-view>

        <template #footer>
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="confirm" :disabled="!selected">确定</el-button>
        </template>
    </el-dialog>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import { FormRow, FormColumn, TableColumn, FormRef, TableRef } from '@/sharegood-ui'

@Component({
    name: 'PaperDialog',
    components: {},
})
export default class PaperDialog extends Vue {
    @Ref('formRef')
    formRef!: FormRef
    @Ref('tableRef')
    tableRef!: TableRef

    formModel: any = {}
    selected: any = null

    get getFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'input',
                name: 'keyword',
                itemAttrs: {
                    label: '关键字',
                },
                attrs: {
                    placeholder: '请输入试卷名称',
                },
            },
        ]
        return {
            autoAppendAction: true,
            fields,
        }
    }

    get getTableAttrs() {
        const columns: TableColumn[] = [
            {
                label: '序号',
                type: 'index',
                prop: 'index',
                fixed: 'left',
                width: '50px',
            },
            {
                align: 'left',
                label: '试卷名称',
                prop: 'name',
                minWidth: '180px',
            },
            {
                align: 'left',
                label: '题目数量',
                prop: 'questionCount',
                minWidth: '120px',
            },
            {
                align: 'left',
                label: '创建时间',
                prop: 'createTime',
                minWidth: '170px',
            },
        ]
        return {
            tableHeaderSticky: {
                scrollDom: () => document.querySelector('.PaperDialog'),
            },
            highlightCurrentRow: true,
            load: async (params: any = {}) => {
                // 模拟数据
                return {
                    result: [
                        {
                            id: 1,
                            name: '2024年第二次协助执法文员考试试卷A',
                            questionCount: 100,
                            createTime: '2024-03-12 15:00:00',
                        },
                    ],
                    total: 1,
                }
            },
            columns,
            onCurrentChange: (row: any) => {
                this.selected = row
            },
        }
    }

    handleSearch() {
        this.tableRef.onLoad({ page: 1 })
    }

    cancel() {
        this.$options.cancel?.()
    }

    confirm() {
        this.$options.confirm?.(this.selected)
    }
}
</script>

<style scoped lang="less">
.PaperDialog ::v-deep {
    .el-dialog__body {
        padding: 15px 20px;
    }
}
</style>
