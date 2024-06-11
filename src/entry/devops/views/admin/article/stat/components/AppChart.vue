<template>
    <el-card class="box-card">
        <!-- {{ formModel }} -->
        <div slot="header" class="sg-flexbox align-center justify-between">
            <span>
                <span>
                    <span>人数：</span>
                    <span class="sg-link">{{ total }}</span>
                </span>
                <span class="sg-ml-3">
                    <span>文章数：</span>
                    <span class="sg-link">{{ articleTotal }}</span>
                </span>
                <span class="sg-ml-3">
                    <span>输出占比：</span>
                    <span class="sg-link">{{ ratio }}%</span>
                </span>
            </span>
            <div>
                <sg-base-form :fields="formFields" v-model="formModel" @submit="handleSearch"></sg-base-form>
            </div>
        </div>
        <BaseChart :config="option" :style="{ height: '500px' }" style="margin-top:-10px;"></BaseChart>
    </el-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref, Watch } from 'vue-property-decorator'
import { ArticleService, UserGroupService } from '@/entry/devops/api'
import { MyMixins } from '@/entry/devops/mixins'
import BaseChart from '@/sharegood-ui/packages/charts/BaseChart.vue'
import { FormRow, FormRef, TableColumn, TableRef } from '@/sharegood-ui'
import { formatDate } from '@/scripts/utils/time'
import { createBarOption, getRecentDays } from './helper'
import { number } from 'echarts'
const currentDate = new Date()

@Component({
    name: 'AppChart',
    components: {
        BaseChart,
    },
})
export default class AppChart extends Vue {
    formModel: any = {
        $recent: 90,
        user_group$: [],
    }
    // 人员总数
    total = 0
    // 文章总数
    articleTotal = 0
    // 输出比例
    ratio = ''
    @Watch('formModel.user_group$', { deep: true })
    async watchFormModel(newVal: any) {
        const { createdAt$ } = this.formModel

        if (newVal && newVal.length) {
            const [timeStart, timeEnd] = createdAt$
            const data = await this.handleSearch({ timeStart, timeEnd })

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
                        tag: 'select',
                        name: 'user_group$',
                        itemAttrs: {
                            label: '',
                            style: 'padding-right:5px;width:130px;',
                        },
                        attrs: {
                            disabled: true,
                            options: async () => {
                                const { data } = await UserGroupService.findAll()

                                return data.map((item: any) => {
                                    if (item.name.indexOf('前端') > -1) {
                                        this.$set(this.formModel, 'user_group$', item.records)
                                        this.total = item.records.length
                                    }
                                    return {
                                        label: item.name,
                                        value: item.records,
                                    }
                                })
                            },
                            onChange: ({ value }) => {
                                if (value && value.length) {
                                    const result = value.map((item: any) => item.label)
                                    this.$set(this.formModel, 'name', result)
                                } else {
                                    this.$set(this.formModel, 'name', [])
                                }
                                //this.handleSearch()
                            },
                        },
                    },
                    {
                        tag: 'date',
                        name: 'createdAt$',
                        itemAttrs: {
                            label: '',
                            style: 'width:240px;',
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
                                    label: '最近3个月',
                                    value: 90,
                                },
                                {
                                    label: '最近半年',
                                    value: 180,
                                },
                                {
                                    label: '最近1年',
                                    value: 365,
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
        const {
            data: { data },
        } = await ArticleService.list({
            page: 1,
            pageSize: 1000,
            conditions: {
                //createdAt$: ['2023-7-14 8:00:00', '2023-7-18 23:00:00'],
                ...conditions,
                status: 'publish',
            },
            projection: {
                // logId: 1,
                // name: 1,
                // pipelineId: 1,
                // createdAt: 1,
            },
        })

        return this.statGroupByApp(data)
    }

    statGroupByApp(data: any[] = []) {
        var countMap2 = data.reduce(function(result, obj) {
            var name = obj.author

            if (!result[name]) {
                result[name] = 0
            }

            result[name]++

            return result
        }, {})
        const countMap: any = {
            马金慧: countMap2['马金慧'] || 0,
        }
        const { user_group$ = [] } = this.formModel
        user_group$.forEach((item: any) => {
            const { label } = item
            if (countMap2[label]) {
                countMap[label] = countMap2[label]
            } else {
                countMap[label] = 0
            }
        })

        var sortedCounts = Object.entries(countMap).sort(function(a: any, b: any) {
            return b[1] - a[1]
        })

        var topTen = sortedCounts.slice(0, Math.min(50, sortedCounts.length))
        topTen = topTen.reverse()

        let result: any[] = []
        let articleTotal = 0
        let ratio = 0
        topTen.forEach(item => {
            let [name, value = 0] = item
            if (Number(value) > 0) {
                ratio++
            }
            articleTotal = articleTotal + Number(value)
            result.push({
                name,
                value,
            })
        })
        this.articleTotal = articleTotal
        this.ratio = ((ratio / result.length) * 100).toFixed(2)
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
        .el-col {
            width: auto;
        }
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
