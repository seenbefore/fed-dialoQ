<template>
    <PageWrapper class="DevopsPipelineStat" :title="null">
        <div class="analytic-insight-summary">
            <div class="item">
                <span translate="modules.PROJECT" class="text-desc font-size-md ng-star-inserted">应用总数</span>
                <span class="text-secondary text-number" v-text="stat.PipelineCount"></span>
            </div>

            <div class="item ng-star-inserted">
                <span translate="mission.project.PENDING_TASK" class="text-desc font-size-md">构建次数</span>
                <span class="text-warning text-number" v-text="stat.LogCount"></span>
            </div>
            <div class="item">
                <span translate="mission.project.DELAY_UNFINISHED" class="text-desc font-size-md">成功构建次数</span>
                <span class="text-success text-number" v-text="stat.SuccessLogCount"></span>
            </div>
            <div class="item">
                <span translate="mission.project.DELAY_UNFINISHED" class="text-desc font-size-md">构建成功率</span>
                <span class="text-danger text-number" v-text="stat.successPercentages"></span>
            </div>
            <!---->
            <div class="divider"></div>
            <div class="item">
                <span translate="status.PROGRESS" class="text-desc font-size-md">服务器总容量</span>
                <span class="text-secondary text-number" v-text="stat.totalCapacities"></span>
            </div>
            <div class="item">
                <span translate="status.PROGRESS" class="text-desc font-size-md">剩余容量</span>
                <span class="text-warning text-number" v-text="stat.remainingCapacities"></span>
            </div>
            <div class="item ng-star-inserted">
                <span translate="mission.project.DELAY_UNFINISHED" class="text-desc font-size-md">使用率</span>
                <span class="text-success text-number" v-text="stat.usagePercentages"></span>
            </div>
            <!---->
            <div class="divider"></div>
            <div class="item">
                <span translate="mission.project.DELAY_UNFINISHED" class="text-desc font-size-md">应用模板总数</span>
                <span class="text-danger text-number" v-text="stat.ProjectTemplateCount"></span>
            </div>
        </div>
        <RankBox></RankBox>
        <PublishChart></PublishChart>
        <BuildChart></BuildChart>
        <!-- <AppChart></AppChart> -->
        <!-- <AppChart></AppChart> -->
    </PageWrapper>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { PipelineService, ProjectTemplateService, BaseService } from '@/entry/devops/api'
import { MyMixins } from '@/entry/devops/mixins'
import AppChart from '@/entry/devops/views/devops/pipeline/stat/components/AppChart.vue'
import BuildChart from '@/entry/devops/views/devops/pipeline/stat/components/BuildChart.vue'
import PublishChart from '@/entry/devops/views/devops/pipeline/stat/components/PublishChart.vue'
import RankBox from '@/entry/devops/views/devops/pipeline/stat/components/RankBox.vue'
@Component({
    name: 'DevopsPipelineStat',
    components: {
        AppChart,
        BuildChart,
        PublishChart,
        RankBox,
    },
})
export default class DevopsPipelineStat extends MyMixins {
    fedendUserCount = 43

    stat: any = {
        PipelineCount: 0,
        SuccessLogCount: 0,
        LogCount: 0,
        successPercentages: '',
        ProjectTemplateCount: 0,

        totalCapacities: '',
        remainingCapacities: '',
        usagePercentages: '',
    }

    async mounted() {
        const { data } = await PipelineService.stat()
        const {
            data: { total },
        } = await ProjectTemplateService.list()
        const {
            data: { totalCapacities = '', remainingCapacities = '', usagePercentages = '' },
        } = await BaseService.getDiskFree()
        const successPercentages = Math.round((data.SuccessLogCount * 100) / data.LogCount) + '%'
        Object.assign(this.stat, {
            ...data,
            ProjectTemplateCount: total,
            totalCapacities,
            remainingCapacities,
            usagePercentages,
            successPercentages,
        })
    }
}
</script>

<style lang="less" scoped>
.style_main-wrapper__3f4pE {
    padding: 10px 30px 30px 10px;
    height: 100%;
    font-size: 16px;
}
.style_basicInfo__oZb_U {
    margin-bottom: 24px;
}
.style_title__3CnOs {
    color: rgb(32, 45, 64);
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 13px;
}
.style_row__3kv7R {
    display: flex;
}
.style_field__2Ie9J {
    display: flex;
    margin-bottom: 12px;
}
.label {
    width: 120px;
    color: rgb(96, 108, 128);

    font-family: PingFangSC-Regular;
    font-weight: 400;
    letter-spacing: 0px;
}
.value {
    min-width: 200px;
    padding-right: 10px;
    color: rgb(32, 44, 64);

    font-family: PingFangSC-Regular;
    font-weight: 400;
    letter-spacing: 0px;
}
.p {
    color: var(--system-success-color);
}

.analytic-insight-summary {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

.analytic-insight-summary .item {
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

.analytic-insight-summary .item .text-number {
    font-size: 2.5em;
}

.analytic-insight-summary .divider {
    width: 1px;
    background: #eee;
    height: 76px;
    overflow: hidden;
}
.text-success {
    color: #73d897 !important;
}
.text-secondary {
    color: #666 !important;
}
.text-desc {
    color: #aaa !important;
}
.text-warning {
    color: #ffcd5d !important;
}
.text-danger {
    color: #ff7575 !important;
}
</style>
