<template>
    <el-card class="box-card">
        <div slot="header" class="sg-flexbox align-center">
            <span class="sg-flex-1">发布统计</span>
            <div style="width:600px">
                <sg-base-form :fields="formFields" v-model="formModel" @submit="handleSearch"></sg-base-form>
            </div>
        </div>
        <BaseChart :config="config"></BaseChart>
    </el-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref, Watch } from 'vue-property-decorator'
import { PipelineLogService } from '@/entry/devops/api'
import { MyMixins } from '@/entry/devops/mixins'
import BaseChart from '@/sharegood-ui/packages/charts/BaseChart.vue'
import { FormRow, FormRef, TableColumn, TableRef } from '@/sharegood-ui'
import { formatDate } from '@/scripts/utils/time'
import { createPublishOption, getRecentDays } from './helper'
const currentDate = new Date()

@Component({
    name: 'PublishChart',
    components: {
        BaseChart,
    },
})
export default class PublishChart extends Vue {
    formModel: any = {
        $recent: 3,
    }
    @Watch('formModel', { immediate: true, deep: true })
    async watchFormModel(newVal: any) {
        const { createdAt$ } = newVal

        if (createdAt$) {
            const data = await this.handleSearch({ createdAt$ })
            const result = this.countNameByHour(data)
            Object.assign(this.config, createPublishOption(result))
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
                                    label: '最近3天',
                                    value: 3,
                                },
                                {
                                    label: '最近10天',
                                    value: 10,
                                },
                                {
                                    label: '最近30天',
                                    value: 30,
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

    config: any = createPublishOption()
    async handleSearch(conditions: any = {}) {
        const { data } = await PipelineLogService.stat({
            conditions: {
                createdAt$: ['2023-7-14 8:00:00', '2023-7-18 23:00:00'],
                target: 'prd',

                ...conditions,
            },
            projection: {
                name: 1,

                createdAt: 1,
            },
        })

        return data
    }
    countNameByHour(data: any) {
        // 创建一个空对象用于存储统计结果

        const countByHour: any = {}

        // 生成24小时的时间戳

        for (let i = 0; i < 24; i++) {
            countByHour[i] = {}
        }

        // 遍历数据数组

        data.forEach((item: any) => {
            // 获取当前数据项的创建时间戳和名称

            const { createdAt, name } = item

            // 将时间戳转换为日期对象

            const date = new Date(createdAt)

            // 获取当前小时数

            const hour = date.getHours()

            // 如果该名称不存在于当前小时的统计结果中，则初始化为0

            if (!countByHour[hour][name]) {
                countByHour[hour][name] = 0
            }

            // 增加该名称在当前小时的统计次数

            countByHour[hour][name]++
        })
        // 将小时转换为时间戳

        const result: any[] = []
        Object.keys(countByHour).forEach((hour: any) => {
            const obj = countByHour[hour]
            Object.keys(obj).forEach((name: any) => {
                const target = result.find(item => item.name === name)

                const count = obj[name]
                if (target) {
                    target.value[hour] = count
                } else {
                    const target = {
                        name,
                        value: Array.from({ length: 24 }, (_, i) => null),
                    }
                    target.value[hour] = count
                    result.push(target)
                }
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
