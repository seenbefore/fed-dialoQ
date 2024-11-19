<template>
    <div class="sg-page icinfo-ai CaseNumberConfig">
        <!-- 列表 -->
        <sg-data-view v-bind="getTableAttrs" ref="tableRef"></sg-data-view>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import { FormRow, FormColumn, TableColumn, FormRef, TableRef } from '@/sharegood-ui'
import { getList, save } from './api'

@Component({
    name: 'CaseNumberConfig',
    components: {},
})
export default class CaseNumberConfig extends Vue {
    @Ref('tableRef')
    tableRef!: TableRef

    get getTableAttrs() {
        const columns: TableColumn[] = [
            {
                label: '卷宗类型',
                prop: 'caseType',
                minWidth: '120px',
            },
            {
                label: '卷宗范围',
                prop: 'caseScope',
                minWidth: '120px',
            },
            {
                label: '卷宗名称',
                prop: 'caseName',
                minWidth: '200px',
            },
            {
                label: '正/副卷',
                prop: 'isMain',
                minWidth: '100px',
            },
            {
                label: '全宗号',
                prop: 'allNumber',
                minWidth: '100px',
            },
            {
                label: '目录号',
                prop: 'catalogNumber',
                minWidth: '100px',
            },
            {
                label: '案卷号',
                prop: 'caseNumber',
                minWidth: '100px',
            },
            {
                label: '更新时间',
                prop: 'updateTime',
                minWidth: '160px',
            },
            {
                label: '操作',
                prop: 'action',
                fixed: 'right',
                width: '120px',
                render: (h, { row }) => {
                    return (
                        <div>
                            <el-button type="text" onClick={() => this.handleEdit(row)}>
                                编辑
                            </el-button>
                        </div>
                    )
                },
            },
        ]

        return {
            load: async (params: any = {}) => {
                const { data } = await getList(params)
                return {
                    result: data.data,
                    total: data.recordsTotal,
                }
            },
            columns,
        }
    }

    handleAdd() {
        this.openDialog()
    }

    handleEdit(row: any) {
        this.openDialog(row)
    }

    async openDialog(data?: any) {
        try {
            const result = await this.$modalDialog(() => import('./components/edit-dialog/index.vue'), {
                data: data || {},
            })
            if (result) {
                await save(result)
                this.$message.success('保存成功')
                this.tableRef.onLoad()
            }
        } catch (error) {
            console.error(error)
        }
    }
}
</script>

<style lang="less" scoped>
.CaseNumberConfig {
    padding: 20px;
}
</style>
