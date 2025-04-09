<template>
    <admin-page class="QuestionnaireResponses" :back-url="`/survey/analysis`">
        <template #title>
            <span>{{ questionnaireTitle }} - 数据分析</span>
        </template>

        <el-tabs v-model="activeTab" type="card">
            <!-- 参与概述 Tab -->
            <el-tab-pane label="参与概述" name="overview">
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
                    <el-card class="summary-card">
                        <div slot="header">
                            <span>答完率</span>
                        </div>
                        <div class="card-content">
                            <span class="number">{{ completionRate }}</span>
                            <span class="unit">%</span>
                        </div>
                    </el-card>
                    <el-card class="summary-card">
                        <div slot="header">
                            <span>平均花费时间</span>
                        </div>
                        <div class="card-content">
                            <span class="number">{{ averageDuration }}</span>
                            <span class="unit">分钟</span>
                        </div>
                    </el-card>
                </div>

                <!-- 答卷趋势图 -->
                <el-card class="trend-chart">
                    <div slot="header">
                        <span>答卷趋势</span>
                    </div>
                    <Chart :option="getTrendChartOption()" :chart-style="{ height: '300px' }" />
                </el-card>
            </el-tab-pane>

            <el-tab-pane label="统计分析" name="statistics">
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
                                        <template v-slot="scope">{{ scope.row.percentage.toFixed(2) }}%</template>
                                    </el-table-column>
                                    <el-table-column label="百分比" width="200">
                                        <template v-slot="scope">
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
import { Component, Vue, Ref, Prop, Watch } from 'vue-property-decorator'
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

    activeTab = 'overview'
    questionnaireTitle = this.title || '问卷'
    formModel: Record<string, any> = {}
    statsData: StatisticsVO = {
        questionnaireId: '',
        questionnaireTitle: '',
        totalResponses: 0,
        questionStats: [],
        completionRate: 0,
        averageDuration: 0,
        dailyResponses: [],
    }

    // 颜色映射表
    colorMap: Record<string, string> = {}

    private refreshTimer: number | null = null

    async mounted() {
        await this.fetchStatistics()
    }

    // 页面激活时刷新数据（从其他页面返回时）
    activated() {
        this.fetchStatistics()
        // 设置定时刷新
        this.startAutoRefresh()
    }

    // 页面停用时清除定时器
    deactivated() {
        this.stopAutoRefresh()
    }

    // 组件销毁时清除定时器
    beforeDestroy() {
        this.stopAutoRefresh()
    }

    // 启动定时刷新（每20秒刷新一次）
    startAutoRefresh() {
        this.stopAutoRefresh() // 先清除可能存在的定时器
        this.refreshTimer = window.setInterval(() => {
            this.fetchStatistics()
        }, 20000) // 20秒刷新一次
    }

    // 停止定时刷新
    stopAutoRefresh() {
        if (this.refreshTimer) {
            clearInterval(this.refreshTimer)
            this.refreshTimer = null
        }
    }

    @Watch('activeTab')
    async onTabChange(newTab: string) {
        if (newTab === 'responses' && this.tableRef) {
            this.handleSearch()
        } else if (newTab === 'statistics') {
            // 确保统计分析数据已加载
            if (!this.statsData.questionStats?.length) {
                await this.fetchStatistics()
            }
        }
    }

    async fetchStatistics() {
        try {
            const { data } = await statistics({ questionnaireId: this.id })

            // 处理返回的数据，确保所有必要字段
            this.statsData = {
                questionnaireId: data.questionnaireId || '',
                questionnaireTitle: data.questionnaireTitle || '',
                totalResponses: data.totalResponses || 0,
                completionRate: data.completionRate || 0,
                averageDuration: data.averageDuration || 0,
                dailyResponses: data.dailyResponses || [],
                questionStats: data.questionStats || [],
            }

            // 如果没有问题统计数据，创建一些示例数据
            if (!this.statsData.questionStats || this.statsData.questionStats.length === 0) {
                console.warn('未获取到问题统计数据，使用默认数据')
            }

            // 打印数据以便调试
            console.log('统计数据已加载:', this.statsData)
        } catch (error) {
            console.error('获取问卷统计数据失败', error)
            // 设置一些默认值以避免错误
            this.statsData = {
                ...this.statsData,
                completionRate: 0,
                averageDuration: 0,
                dailyResponses: [],
                questionStats: [],
            }
        }
    }

    getChartOption(question: QuestionStatVO) {
        // 确保有选项数据
        if (!question.optionStats || question.optionStats.length === 0) {
            return {
                title: {
                    text: question.questionTitle,
                    left: 'center',
                },
                series: [],
            }
        }

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
                    data: question.optionStats.map(option => option.optionText),
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
                        data: question.optionStats.map(option => ({
                            value: option.count || 0,
                            name: option.optionText || '',
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
                    data: question.optionStats.map(option => option.optionText || ''),
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
                        data: question.optionStats.map(option => ({
                            value: option.count || 0,
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
                    value: [],
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
                label: 'AI总结',
                prop: 'aiSummary',
                minWidth: '250px',
                render: (h, { row }) => {
                    // 展示AI总结的前50个字符，超出则显示省略号
                    const summary = row.aiSummary || '暂无AI总结'
                    const displayText = summary.length > 50 ? summary.substring(0, 50) + '...' : summary

                    return (
                        <el-tooltip placement="top" effect="light" width="400" disabled={!row.aiSummary}>
                            <div slot="content" style="white-space: pre-wrap">
                                {row.aiSummary}
                            </div>
                            <div class="ellipsis">{displayText}</div>
                        </el-tooltip>
                    )
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

    get completionRate() {
        return this.statsData.completionRate?.toFixed(1) || '0.0'
    }

    get averageDuration() {
        return (this.statsData.averageDuration / 60).toFixed(1) || '0.0'
    }

    getTrendChartOption() {
        // 确保有数据
        if (!this.statsData.dailyResponses || this.statsData.dailyResponses.length === 0) {
            // 创建近7天的空数据
            const emptyData = []
            for (let i = 6; i >= 0; i--) {
                const date = new Date()
                date.setDate(date.getDate() - i)
                const year = date.getFullYear()
                const month = String(date.getMonth() + 1).padStart(2, '0')
                const day = String(date.getDate()).padStart(2, '0')
                emptyData.push({
                    date: `${year}-${month}-${day}`,
                    count: 0,
                })
            }

            return this.createTrendChart(emptyData)
        }

        return this.createTrendChart(this.statsData.dailyResponses)
    }

    createTrendChart(dailyData: any[]) {
        // 确保日期格式正确
        const formattedData = dailyData.map(item => {
            // 确保日期是字符串类型并且格式正确
            let dateStr = item.date
            // 验证是否为有效日期格式
            if (!dateStr || dateStr.includes('NaN')) {
                const date = new Date()
                date.setDate(date.getDate() - dailyData.indexOf(item))
                dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
            }
            return {
                ...item,
                date: dateStr,
            }
        })

        return {
            title: {
                text: '答卷数量趋势',
                left: 'center',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                data: formattedData.map(item => item.date),
                axisLabel: {
                    rotate: 30,
                },
            },
            yAxis: {
                type: 'value',
                name: '答卷数量',
            },
            series: [
                {
                    name: '答卷数量',
                    type: 'bar',
                    data: formattedData.map(item => ({
                        value: item.count || 0,
                        itemStyle: {
                            color: '#409EFF',
                        },
                    })),
                    barMaxWidth: 50,
                },
            ],
        }
    }
}
</script>

<style scoped lang="less">
.QuestionnaireResponses ::v-deep {
    .stats-summary {
        display: flex;
        margin-bottom: 20px;
        flex-wrap: wrap;
        gap: 20px;

        .summary-card {
            width: 240px;
            margin-right: 0;

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

    .trend-chart {
        margin-bottom: 20px;
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

    .ellipsis {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>
