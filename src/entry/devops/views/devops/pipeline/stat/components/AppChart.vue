<template>
    <el-card class="box-card">
        <div slot="header" class="sg-flexbox align-center">
            <span class="sg-flex-1">应用构建次数排行</span>
            <div style="width:600px">
                <sg-base-form :fields="formFields" v-model="formModel" @submit="handleSearch"></sg-base-form>
            </div>
        </div>
        <BaseChart :config="option"></BaseChart>
    </el-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref, Watch } from 'vue-property-decorator'
import { PipelineLogService } from '@/entry/devops/api'
import { MyMixins } from '@/entry/devops/mixins'
import BaseChart from '@/sharegood-ui/packages/charts/BaseChart.vue'
import { FormRow, FormRef, TableColumn, TableRef } from '@/sharegood-ui'
import { formatDate } from '@/scripts/utils/time'
import { createBarOption, getRecentDays } from './helper'
const currentDate = new Date()

@Component({
    name: 'AppChart',
    components: {
        BaseChart,
    },
})
export default class AppChart extends Vue {
    formModel: any = {
        $recent: 30,
    }
    @Watch('formModel', { immediate: true, deep: true })
    async watchFormModel(newVal: any) {
        const { createdAt$ } = newVal

        if (createdAt$) {
            const data = await this.handleSearch({ createdAt$ })

            Object.assign(this.option, createBarOption(data))
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
                            //value: 10,
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
    option = createBarOption()

    async handleSearch(conditions: any = {}) {
        const { data } = await PipelineLogService.stat({
            conditions: {
                createdAt$: ['2023-7-14 8:00:00', '2023-7-18 23:00:00'],
                ...conditions,
            },
            projection: {
                logId: 1,
                name: 1,
                pipelineId: 1,
                createdAt: 1,
            },
        })

        return this.statGroupByApp(data.sort((a, b) => a.createdAt - b.createdAt))
    }

    statGroupByApp(data: any[] = []) {
        var countMap = data.reduce(function(result, obj) {
            var name = obj.name

            if (!result[name]) {
                result[name] = 0
            }

            result[name]++

            return result
        }, {})

        var sortedCounts = Object.entries(countMap).sort(function(a: any, b: any) {
            return b[1] - a[1]
        })

        var topTen = sortedCounts.slice(0, Math.min(20, sortedCounts.length))
        topTen = topTen.reverse()

        let result: any = []

        topTen.forEach(item => {
            const [name, value] = item

            result.push({
                name,
                value,
            })
        })

        return result
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
