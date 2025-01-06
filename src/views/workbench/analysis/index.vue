<template>
    <admin-page class="Analysis">
        <!-- 数据总览 -->
        <div class="overview-section">
            <el-card shadow="never">
                <div slot="header">数据总览</div>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <overview-card
                            title="访问次数"
                            :value="analysisData.visitCount"
                            trend-text="今日 301"
                            trend="down"
                            card-type="visits"
                            :chart-data="[594533, 594633, 594733, 594633, 594733, 594633, 594733, 594633, 594733, 594833]"
                        />
                    </el-col>
                    <el-col :span="6">
                        <overview-card
                            title="独立IP"
                            :value="analysisData.uniqueIp"
                            trend-text="今日 20"
                            trend="down"
                            card-type="ip"
                            :chart-data="[19323, 19423, 19323, 19423, 19323, 19423, 19323, 19423, 19323, 19523]"
                        />
                    </el-col>
                    <el-col :span="6">
                        <overview-card
                            title="统计示例"
                            :value="88888"
                            trend-text="较昨日 88.8"
                            trend="up"
                            card-type="stats"
                            :chart-data="[88088, 88188, 88288, 88388, 88488, 88588, 88688, 88788, 88888, 88988]"
                        />
                    </el-col>
                    <el-col :span="6">
                        <overview-card
                            title="统计示例"
                            :value="88888"
                            trend-text="88.8"
                            card-type="donut"
                            :donut-data="[
                                { name: '示例1', value: 40 },
                                { name: '示例2', value: 30 },
                                { name: '示例3', value: 30 },
                            ]"
                        />
                    </el-col>
                </el-row>
            </el-card>
        </div>

        <!-- 访问时段分析和热门模块 -->
        <el-row :gutter="10" class="chart-section">
            <el-col :span="18">
                <time-analysis :data="analysisData.timeAnalysis || []" />
            </el-col>
            <el-col :span="6">
                <hot-modules
                    :data="[
                        { name: '用户管理', value: 95000 },
                        { name: '字典管理', value: 82000 },
                        { name: '代码生成', value: 78000 },
                        { name: '角色管理', value: 75000 },
                        { name: '文件管理', value: 68000 },
                        { name: '部门管理', value: 65000 },
                        { name: '菜单管理', value: 62000 },
                        { name: '参数管理', value: 55000 },
                        { name: '公告管理', value: 52000 },
                        { name: '系统日志', value: 48000 },
                    ]"
                />
            </el-col>
        </el-row>

        <!-- 终端和浏览器分析 -->
        <el-row :gutter="10" class="chart-section">
            <el-col :span="12">
                <distribution-chart title="终端分布" :data="analysisData.terminalData || []" :colors="['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399']" />
            </el-col>
            <el-col :span="12">
                <distribution-chart title="浏览器分布" :data="analysisData.browserData || []" :colors="['#8064ff', '#36cfc9', '#ffd666', '#ff85c0', '#bfbfbf']" />
            </el-col>
        </el-row>
    </admin-page>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import AdminPage from '@/components/admin/admin-page/index.vue'
import { getAnalysisData, AnalysisVO } from './api'
import OverviewCard from './components/overview-card/index.vue'
import TimeAnalysis from './components/time-analysis/index.vue'
import HotModules from './components/hot-modules/index.vue'
import DistributionChart from './components/distribution-chart/index.vue'

@Component({
    name: 'Analysis',
    components: {
        AdminPage,
        OverviewCard,
        TimeAnalysis,
        HotModules,
        DistributionChart,
    },
})
export default class Analysis extends Vue {
    private analysisData: Partial<AnalysisVO> = {}

    async mounted() {
        await this.fetchData()
    }

    private async fetchData() {
        try {
            const { data } = await getAnalysisData()
            this.analysisData = data
        } catch (error) {
            console.error('Failed to fetch analysis data:', error)
        }
    }
}
</script>

<style lang="less" scoped>
.Analysis ::v-deep {
    background-color: #eee !important;

    .admin-page__content {
        padding: 0px;
    }

    .overview-section {
        margin-bottom: 10px;
    }

    .chart-section {
        margin-bottom: 10px;
    }
    .el-card {
        border: none;
        border-radius: 0px;
        .el-card__header {
            padding: 9px 10px;
            border: none;
            font-size: 16px;
            font-weight: 500;
            color: #333;
        }
        .el-card__body {
            padding: 0 15px 15px;
        }
    }
}
</style>
