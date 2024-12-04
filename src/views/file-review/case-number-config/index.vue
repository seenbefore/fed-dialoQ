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
import moment from 'moment'

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
                label: '是否生效',
                prop: 'isTemplate',
                width: '90px',
                align: 'center',
                render: (h, { row }) => {
                    const isTemplate = row.isTemplate
                    const result = isTemplate === '1' ? '是' : '否'
                    return <span>{result}</span>
                },
            },
            {
                label: '卷宗类型',
                prop: 'volumeTypeName',
                minWidth: '150px',
            },
            {
                label: '条线名称',
                prop: 'lineName',
                minWidth: '120px',
            },
            {
                label: '卷宗名称',
                prop: 'volumeName',
                minWidth: '200px',
            },
            {
                label: '正/副卷',
                prop: 'hasMainVolume',
                minWidth: '100px',
                render: (h, { row }) => {
                    const mainText = row.hasMainVolume === '1' ? '正卷' : ''
                    const subText = row.hasSubVolume === '1' ? '副卷' : ''
                    return <span>{[mainText, subText].filter(Boolean).join('、')}</span>
                },
            },
            {
                label: '全宗号',
                prop: 'fondNumber',
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
                render: (h, { row }) => {
                    return <span>{moment(row.updateTime).format('YYYY-MM-DD HH:mm')}</span>
                },
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
                    total: parseInt(data.recordsTotal),
                }
            },
            columns,
            pageActionLayout: [],
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
