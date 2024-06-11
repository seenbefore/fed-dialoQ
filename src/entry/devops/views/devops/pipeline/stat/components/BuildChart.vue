<template>
    <el-card class="box-card">
        <div slot="header" class="sg-flexbox align-center">
            <span class="sg-flex-1">构建次数统计</span>
            <div style="width:600px">
                <sg-base-form :fields="formFields" v-model="formModel" @submit="handleSearch"></sg-base-form>
            </div>
        </div>

        <div class="sg-flexbox">
            <div class="sg-flex-1">
                <BaseChart :config="config"></BaseChart>
            </div>
            <div class="" style="width:300px">
                <BaseChart :config="config2"></BaseChart>
            </div>
        </div>
    </el-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref, Watch } from 'vue-property-decorator'
import { PipelineLogService } from '@/entry/devops/api'
import { MyMixins } from '@/entry/devops/mixins'
import BaseChart from '@/sharegood-ui/packages/charts/BaseChart.vue'
import { FormRow, FormRef, TableColumn, TableRef } from '@/sharegood-ui'
import { formatDate } from '@/scripts/utils/time'
import { createPieOption, createLineOption, getRecentDays } from './helper'
const currentDate = new Date()

@Component({
    name: 'BuildChart',
    components: {
        BaseChart,
    },
})
export default class BuildChart extends Vue {
    formModel: any = {
        $recent: 30,
    }
    @Watch('formModel', { immediate: true, deep: true })
    async watchFormModel(newVal: any) {
        const { createdAt$ } = newVal

        if (createdAt$) {
            const data = await this.handleSearch({ createdAt$ })
            const dataStat = await this.stat({ createdAt$ })

            Object.assign(this.config2, createPieOption(dataStat))
            Object.assign(this.config, createLineOption(data))
        }
    }
    @Ref('formRef')
    formRef!: FormRef
    get formFields(): FormRow[] {
        const recentDays = getRecentDays(currentDate, this.formModel.$recent)

        const firstData = recentDays[0] // 获取第一个数据
        const lastData = recentDays[recentDays.length - 1] // 获取最后一个数据
        return [
            {
                columns: [
                    {
                        span: 12,
                        tag: 'date',
                        name: 'createdAt$',
                        itemAttrs: {
                            label: '',
                        },
                        attrs: {
                            value: this.formModel.$recent ? [firstData.start, lastData.end] : [],
                            type: 'daterange',
                            onInput: (val, { formActionType }) => {
                                formActionType.setState('$recent', 0)
                            },
                            defaultTime: ['00:00:00', '23:59:59'],
                            valueFormat: 'yyyy-MM-dd HH:mm:ss',
                        },
                    },
                    {
                        span: 12,
                        tag: 'radio',
                        name: '$recent',
                        itemAttrs: {
                            label: '',
                        },
                        attrs: {
                            type: 'button',
                            //value: 90,
                            options: [
                                {
                                    label: '最近10天',
                                    value: 10,
                                },
                                {
                                    label: '最近30天',
                                    value: 30,
                                },
                                {
                                    label: '最近90天',
                                    value: 90,
                                },
                            ],
                            onInput: (val, { formModel, formActionType }) => {
                                if (val <= 0) {
                                    return
                                }
                                const recentDays = getRecentDays(currentDate, val)
                                const firstData = recentDays[0] // 获取第一个数据
                                const lastData = recentDays[recentDays.length - 1] // 获取最后一个数据
                                formActionType.setState('createdAt$', [firstData.start, lastData.end])
                            },
                        },
                    },
                ],
            },
        ]
    }
    config2 = createPieOption([
        // {
        //     value: 380,
        //     name: '个体户',
        // },
        // { value: 180, name: '企业' },
        // { value: 40, name: '农专社' },
        // { value: 250, name: '其他' },
    ])
    config: any = createLineOption({})
    async handleSearch(conditions: any = {}) {
        const { data } = await PipelineLogService.stat({
            conditions: {
                createdAt$: ['2023-7-14 8:00:00', '2023-7-18 23:00:00'],
                //status: 'success',
                ...conditions,
            },
            projection: {
                logId: 1,
                name: 1,
                pipelineId: 1,
                createdAt: 1,
            },
        })
        return this.statGroupByDate(
            data.sort((a, b) => a.createdAt - b.createdAt),
            conditions.createdAt$,
        )
    }
    async stat(conditions: any = {}) {
        const { data } = await PipelineLogService.stat({
            conditions: {
                createdAt$: ['2023-7-14 8:00:00', '2023-7-18 23:00:00'],

                ...conditions,
            },
            projection: {
                // logId: 1,
                // name: 1,
                // pipelineId: 1,
                status: 1,
                //createdAt: 1,
            },
        })
        const result = [
            {
                name: '构建成功次数',
                value: data.filter(item => item.status === 'success').length,
            },
            {
                name: '构建失败次数',
                value: data.filter(item => item.status === 'error').length,
            },
        ]

        return result
    }

    statGroupByDate(data: any[] = [], range = []) {
        var groupedData: any = {}

        // 获取最早和最晚的日期

        var minDate = new Date(range[0])
        var maxDate = new Date(range[1])

        // 循环填充缺失的日期

        for (var date = new Date(minDate); date <= maxDate; date.setDate(date.getDate() + 1)) {
            var dateString = date.toISOString().split('T')[0] // 获取日期字符串，格式为YYYY-MM-DD
            //console.log(dateString)

            if (!groupedData[dateString]) {
                groupedData[dateString] = []
            }
        }

        // 将数据添加到对应日期的数组中

        data.forEach(function(obj) {
            var date = new Date(obj.createdAt)
            var dateString = date.toISOString().split('T')[0] // 获取日期字符串，格式为YYYY-MM-DD
            //console.log(53, dateString, groupedData[dateString])

            groupedData[dateString]?.push(obj)
        })
        const xData: any = []
        const yData: any = []
        Object.keys(groupedData).forEach(date => {
            xData.push(date)
            yData.push(groupedData[date].length)
        })
        return {
            xData,
            yData,
        }
    }
    async mounted() {}
}
</script>

<style lang="less" scoped>
.box-card ::v-deep {
    margin: 10px 0;
    .el-card__header {
        padding: 10px 15px;
    }
    .el-form-item {
        margin: 0 !important;
    }
    .el-radio-group {
        vertical-align: top;
        margin-left: 10px;
    }
}
</style>
