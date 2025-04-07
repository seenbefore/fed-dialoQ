<template>
    <admin-page class="QuestionnaireResponses" :back-url="`/survey/analysis`">
        <template #title>
            <span>{{ questionnaireTitle }} - 数据分析</span>
        </template>

        <el-tabs v-model="activeTab" type="card">
            <el-tab-pane label="统计分析" name="statistics">
                <!-- 统计概览 -->
                <div class="stats-summary">
                    <el-card class="summary-card">
                        <div slot="header">
                            <span>答卷总数</span>
                        </div>
                        <div class="card-content">
                            <span class="number">{{ statsData.totalResponses || 0 }}</span>
                            <span class="unit">份</span>
                        </div>
                    </el-card>
                </div>

                <!-- 问题统计 -->
                <div v-if="statsData.questionStats && statsData.questionStats.length > 0">
                    <div v-for="(question, index) in statsData.questionStats" :key="index" class="question-stats">
                        <el-card>
                            <div slot="header">
                                <span>{{ index + 1 }}. {{ question.questionTitle }}</span>
                            </div>

                            <!-- 单选或多选题统计 -->
                            <div v-if="['singleChoice', 'multipleChoice'].includes(question.questionType)">
                                <!-- 图表展示 -->
                                <div class="chart-container">
                                    <Chart :option="getChartOption(question)" :chart-style="{ height: '300px' }" />
                                </div>

                                <!-- 表格展示 -->
                                <el-table :data="question.optionStats" style="width: 100%">
                                    <el-table-column prop="optionText" label="选项" min-width="200"></el-table-column>
                                    <el-table-column prop="count" label="人数" width="100"></el-table-column>
                                    <el-table-column prop="percentage" label="比例" width="100">
                                        <template slot-scope="scope">{{ scope.row.percentage.toFixed(2) }}%</template>
                                    </el-table-column>
                                    <el-table-column label="百分比" width="200">
                                        <template slot-scope="scope">
                                            <el-progress :percentage="scope.row.percentage" :color="getRandomColor(scope.row.optionId)"></el-progress>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>

                            <!-- 文本题统计 -->
                            <div v-else-if="question.questionType === 'text'">
                                <div class="text-responses">
                                    <div v-for="(response, rIndex) in question.textResponses" :key="rIndex" class="text-item">
                                        <span>{{ rIndex + 1 }}. {{ response }}</span>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </div>
            </el-tab-pane>

            <el-tab-pane label="答卷列表" name="responses">
                <!-- 查询条件 -->
                <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel" @submit="handleSearch" @reset="handleSearch"></sg-base-form>

                <!-- 列表 -->
                <sg-data-view v-bind="getTableAttrs" ref="tableRef">
                    <template #header>
                        <div class="sg-flexbox align-center">
                            <el-button type="primary" @click="handleExport">导出数据</el-button>
                        </div>
                    </template>
                </sg-data-view>
            </el-tab-pane>
        </el-tabs>

        <template #footer="{ back }">
            <el-button @click="back">返回</el-button>
        </template>
    </admin-page>
</template>

<script lang="tsx">
import { Component, Vue, Ref, Prop } from 'vue-property-decorator'
import { FormColumn, TableColumn, FormRef, TableRef } from '@/sharegood-ui'
import Chart from '@/components/Chart/index.vue'
import { responseList, statistics, exportResponses, ResponseVO, StatisticsVO, QuestionStatVO } from '../api'

/*
 * 描述: 问卷答卷管理和数据分析模块
 *
 * 功能描述:
 * - 展示问卷统计分析数据(图表、表格)
 * - 查询问卷答卷列表
 * - 查看答卷详情
 * - 导出答卷数据
 */
@Component({
    name: 'QuestionnaireResponses',
    components: {
        Chart,
    },
})
export default class QuestionnaireResponses extends Vue {
    @Prop({ default: '' }) id!: string
    @Prop({ default: '' }) title!: string

    @Ref('formRef')
    formRef!: FormRef

    @Ref('tableRef')
    tableRef!: TableRef

    activeTab = 'statistics'
    questionnaireTitle = this.title || '问卷'
    formModel: Record<string, any> = {}
    statsData: StatisticsVO = {
        questionnaireId: '',
        questionnaireTitle: '',
        totalResponses: 0,
        questionStats: [],
    }

    // 颜色映射表
    colorMap: Record<string, string> = {}

    async mounted() {
        this.fetchStatistics()
    }

    async fetchStatistics() {
        try {
            const { data } = await statistics({ questionnaireId: this.id })
            this.statsData = data
        } catch (error) {
            console.error('获取问卷统计数据失败', error)
        }
    }

    getChartOption(question: QuestionStatVO) {
        const isMultipleChoice = question.questionType === 'multipleChoice'
        const chartType = isMultipleChoice ? 'bar' : 'pie'

        if (chartType === 'pie') {
            return {
                title: {
                    text: question.questionTitle,
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)',
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: question.optionStats?.map(option => option.optionText) || [],
                },
                series: [
                    {
                        name: '选择人数',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center',
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '16',
                                fontWeight: 'bold',
                            },
                        },
                        labelLine: {
                            show: false,
                        },
                        data: question.optionStats?.map(option => ({
                            value: option.count,
                            name: option.optionText,
                            itemStyle: {
                                color: this.getRandomColor(option.optionId),
                            },
                        })),
                    },
                ],
            }
        } else {
            return {
                title: {
                    text: question.questionTitle,
                    left: 'center',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                    },
                },
                legend: {
                    data: ['选择人数'],
                    top: 30,
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                },
                xAxis: {
                    type: 'category',
                    data: question.optionStats?.map(option => option.optionText) || [],
                    axisLabel: {
                        interval: 0,
                        rotate: 30,
                    },
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        name: '选择人数',
                        type: 'bar',
                        data: question.optionStats?.map(option => ({
                            value: option.count,
                            itemStyle: {
                                color: this.getRandomColor(option.optionId),
                            },
                        })),
                    },
                ],
            }
        }
    }

    getRandomColor(id: string) {
        if (this.colorMap[id]) {
            return this.colorMap[id]
        }

        const colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#67C23A', '#409EFF', '#E6A23C', '#F56C6C', '#909399']

        const randomIndex = Math.floor(Math.random() * colors.length)
        this.colorMap[id] = colors[randomIndex]
        return this.colorMap[id]
    }

    handleSearch() {
        this.tableRef.onLoad({ page: 1 })
    }

    handleView(row: ResponseVO) {
        this.$router.push(`/survey/analysis/response-detail?id=${row.id}&title=${this.questionnaireTitle}`)
    }

    async handleExport() {
        try {
            const response = await exportResponses({ questionnaireId: this.id })
            // 创建下载链接
            const url = window.URL.createObjectURL(new Blob([response]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `${this.questionnaireTitle}-答卷数据.xlsx`)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
        } catch (error) {
            console.error('导出数据失败', error)
            this.$message.error('导出数据失败')
        }
    }

    get getFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'input',
                name: 'submitter',
                itemAttrs: {
                    label: '提交人',
                },
                attrs: {
                    placeholder: '请输入提交人姓名',
                },
            },
            {
                tag: 'daterange',
                name: 'submitTime',
                itemAttrs: {
                    label: '提交时间',
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
                label: '提交人',
                prop: 'submitter',
                minWidth: '100px',
                render: (h, { row }) => {
                    return row.submitter || '匿名用户'
                },
            },
            {
                label: '提交时间',
                prop: 'submitTime',
                minWidth: '170px',
            },
            {
                label: '答题耗时',
                prop: 'duration',
                minWidth: '100px',
                render: (h, { row }) => {
                    const duration = row.duration || 0
                    if (duration < 60) {
                        return `${duration}秒`
                    } else if (duration < 3600) {
                        return `${Math.floor(duration / 60)}分${duration % 60}秒`
                    } else {
                        const hours = Math.floor(duration / 3600)
                        const minutes = Math.floor((duration % 3600) / 60)
                        const seconds = duration % 60
                        return `${hours}时${minutes}分${seconds}秒`
                    }
                },
            },
            {
                label: '操作',
                fixed: 'right',
                width: '120px',
                render: (h, { row }) => {
                    return (
                        <div>
                            <el-button type="text" onClick={() => this.handleView(row)}>
                                查看
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
                const { submitTime, ...rest } = this.formModel
                const [submitTimeStart, submitTimeEnd] = submitTime || []
                const { data } = await responseList({
                    ...params,
                    ...rest,
                    questionnaireId: this.id,
                    submitTimeStart,
                    submitTimeEnd,
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
.QuestionnaireResponses ::v-deep {
    .stats-summary {
        display: flex;
        margin-bottom: 20px;

        .summary-card {
            margin-right: 20px;
            width: 240px;

            .card-content {
                display: flex;
                align-items: baseline;

                .number {
                    font-size: 36px;
                    font-weight: bold;
                    color: var(--color-primary);
                }

                .unit {
                    font-size: 16px;
                    margin-left: 5px;
                    color: #606266;
                }
            }
        }
    }

    .question-stats {
        margin-bottom: 20px;

        .chart-container {
            height: 300px;
            margin-bottom: 20px;
        }

        .text-responses {
            .text-item {
                padding: 10px;
                border-bottom: 1px solid #ebeef5;

                &:last-child {
                    border-bottom: none;
                }
            }
        }
    }
}
</style>
