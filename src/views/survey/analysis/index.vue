<template>
    <admin-page class="QuestionnaireAnalysis">
        <!-- 查询条件 -->
        <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel" @submit="handleSearch" @reset="handleSearch"></sg-base-form>

        <!-- 列表 -->
        <sg-data-view v-bind="getTableAttrs" ref="tableRef"></sg-data-view>
    </admin-page>
</template>

<script lang="tsx">
import { Component, Vue, Ref } from 'vue-property-decorator'
import { FormColumn, TableColumn, FormRef, TableRef } from '@/sharegood-ui'
import { QuestionnaireStatusEnum, QuestionnaireStatusEnumMap } from './enum'
import { list, QuestionnaireVO } from './api'
import Chart from '@/components/Chart/index.vue'

/*
 * 描述: 数据分析与可视化模块，支持问卷数据分析和可视化展示
 *
 * 功能描述:
 * - 查询问卷列表，支持按标题和状态筛选
 * - 查看问卷数据分析
 * - 查看答卷详情
 */
@Component({
    name: 'QuestionnaireAnalysis',
    components: {
        Chart,
    },
})
export default class QuestionnaireAnalysis extends Vue {
    @Ref('formRef')
    formRef!: FormRef

    @Ref('tableRef')
    tableRef!: TableRef

    formModel: Record<string, any> = {}

    // 添加activated生命周期钩子，当页面从缓存中被激活时触发刷新
    activated() {
        // 当从其他页面返回时，刷新列表数据
        this.tableRef && this.tableRef.onLoad()
    }

    handleSearch() {
        this.tableRef.onLoad({ page: 1 })
    }

    handleView(row: QuestionnaireVO) {
        this.$router.push(`/survey/analysis/responses?id=${row.id}&title=${row.title}`)
    }

    get getFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'input',
                name: 'title',
                itemAttrs: {
                    label: '问卷标题',
                },
                attrs: {
                    placeholder: '请输入问卷标题',
                },
            },
            {
                tag: 'select',
                name: 'status',
                itemAttrs: {
                    label: '发布状态',
                },
                attrs: {
                    placeholder: '请选择',
                    options: async () => {
                        const options = Object.values(QuestionnaireStatusEnumMap)
                        options.unshift({ label: '全部', value: '' })
                        return options
                    },
                },
            },
            {
                tag: 'daterange',
                name: 'createTime',
                itemAttrs: {
                    label: '创建时间',
                },
                attrs: {
                    'start-placeholder': '开始日期',
                    'end-placeholder': '结束日期',
                    'value-format': 'yyyy-MM-dd',
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
                width: '60px',
            },
            {
                label: '问卷标题',
                prop: 'title',
                minWidth: '200px',
                showOverflowTooltip: true,
                overflowCount: 1,
            },
            {
                label: '答卷数量',
                prop: 'responseCount',
                minWidth: '100px',
            },
            {
                label: '发布状态',
                prop: 'status',
                minWidth: '100px',
                render: (h, { row }) => {
                    const statusInfo = QuestionnaireStatusEnumMap[row.status]
                    return <span style={{ color: statusInfo.color }}>{statusInfo.label}</span>
                },
            },
            {
                label: '创建时间',
                prop: 'createTime',
                minWidth: '170px',
            },
            {
                label: '更新时间',
                prop: 'updateTime',
                minWidth: '170px',
            },
            {
                label: '操作',
                fixed: 'right',
                width: '120px',
                render: (h, { row }) => {
                    return (
                        <div>
                            <el-button type="text" onClick={() => this.handleView(row)}>
                                分析
                            </el-button>
                        </div>
                    )
                },
            },
        ]

        return {
            tableHeaderSticky: {
                scrollDom: () => document.querySelector('.admin-page__content'),
            },
            load: async (params: any = {}) => {
                const { createTime, ...rest } = this.formModel
                const [createTimeStart, createTimeEnd] = createTime || []
                const { data } = await list({
                    ...params,
                    ...rest,
                    createTimeStart,
                    createTimeEnd,
                } as any)
                return {
                    result: data.data,
                    total: data.total,
                }
            },
            columns,
        }
    }
}
</script>

<style scoped lang="less">
.QuestionnaireAnalysis ::v-deep {
    padding: 0px;
}
</style>
