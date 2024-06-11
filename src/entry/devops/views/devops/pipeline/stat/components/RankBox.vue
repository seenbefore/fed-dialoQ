<template>
    <el-card class="box-card">
        <div slot="header" class="sg-flexbox align-center">
            <span class="sg-flex-1">
                构建统计（
                <span class="sg-link">{{ count1 }}</span>
                ）
            </span>
            <div style="width:600px">
                <sg-base-form :fields="formFields" v-model="formModel" @submit="handleSearch"></sg-base-form>
            </div>
        </div>
        <div class="sg-flexbox quality_quality__H7DH8">
            <div style="flex:3;">
                <BaseChart :config="config"></BaseChart>
            </div>
        </div>
        <div>
            <BaseChart :config="config2"></BaseChart>
        </div>
    </el-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref, Watch } from 'vue-property-decorator'
import { PipelineLogService, UserService } from '@/entry/devops/api'
import { MyMixins } from '@/entry/devops/mixins'
import BaseChart from '@/sharegood-ui/packages/charts/BaseChart.vue'
import { FormRow, FormRef, TableColumn, TableRef } from '@/sharegood-ui'
import { formatDate } from '@/scripts/utils/time'
import { createPublishOption, getRecentDays, createRankOption } from './helper'

const currentDate = new Date()

@Component({
    name: 'RankBox',
    components: {
        BaseChart,
    },
})
export default class RankBox extends Vue {
    users: any[] = []
    formModel: any = {
        $recent: 1,
    }
    async syncUsers() {
        if (this.users.length) {
            return
        }
        const result = await UserService.getUserOptions()
        this.users.push(...result)
    }
    @Watch('formModel', { immediate: true, deep: true })
    async watchFormModel(newVal: any) {
        const { createdAt$ } = newVal

        if (createdAt$) {
            await this.syncUsers()
            const data = await this.handleSearch({ createdAt$ })

            Object.assign(this.config, createRankOption(this.statGroupByApp(data)))
            Object.assign(this.config2, createRankOption(this.statUserByApp(data)))
            //console.log(1111, this.config)
        }
    }
    get count1() {
        const result = this.config?.series[0]?.data?.length || 0

        return result
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
                                    label: '今天',
                                    value: 1,
                                },
                                {
                                    label: '最近3天',
                                    value: 3,
                                },
                                {
                                    label: '最近10天',
                                    value: 10,
                                },
                                // {
                                //     label: '最近30天',
                                //     value: 30,
                                // },
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

    config: any = createRankOption()
    config2: any = createRankOption()
    async handleSearch(conditions: any = {}) {
        const { data } = await PipelineLogService.stat({
            conditions: {
                createdAt$: ['2023-7-14 8:00:00', '2023-7-18 23:00:00'],
                ...conditions,
            },
            projection: {
                name: 1,
                userId: 1,
                createdAt: 1,
            },
        })

        return data
    }
    statUserByApp(data: any[] = []) {
        var countMap = data.reduce(function(result, obj) {
            var userId = obj.userId

            if (!result[userId]) {
                result[userId] = {}
                result[userId]['tips'] = []
                result[userId]['value'] = 0
            }

            result[userId]['value']++
            result[userId]['tips'].push(obj.name)

            return result
        }, {})
        const result: any[] = []
        Object.keys(countMap).forEach((userId: any) => {
            const user = this.users.find(item => item.value === userId)
            let name = userId
            let value = countMap[userId]['value']
            let tips = countMap[userId]['tips']
            if (user) {
                name = user.label
            }
            result.push({
                name,
                value,
                tips: [...new Set(tips)],
            })
        })

        return result.sort((a, b) => a.value - b.value)
    }
    statGroupByApp(data: any[] = []) {
        //console.log(111222, data)

        var countMap = data.reduce((result, obj) => {
            const user = this.users.find((item: any) => item.value === obj.userId)
            var name = obj.name

            if (!result[name]) {
                result[name] = {}
                result[name]['value'] = 0
                result[name]['tips'] = []
            }

            result[name]['value']++
            if (user) {
                result[name]['tips'].push(user.name)
            }

            return result
        }, {})

        var sortedCounts = Object.entries(countMap).sort(function(a: any, b: any) {
            return b[1]['value'] - a[1]['value']
        })

        var topTen = sortedCounts.slice(0, Math.max(20, sortedCounts.length))
        topTen = topTen.reverse()

        let result: any = []

        topTen.forEach((item: any) => {
            const [name, val] = item
            const { value, tips } = val
            result.push({
                name,
                value,
                tips: [...new Set(tips)],
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
    .el-card__body {
        padding: 12px 10px;
    }
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
<style lang="less">
.quality_quality__H7DH8 .quality_common_faults__cvDEb,
.quality_quality__H7DH8 .quality_same_level__GXIri {
    // width: 288px;
    flex: 1;
    padding: 16px 20px 0;
    margin: 0 10px;
    // margin-left: 20px;
    background-color: #f8f9fc;
    border-radius: 4px;
    overflow: hidden;
    box-sizing: border-box;
}
.quality_title___QSo_ {
    margin: 0;
    text-align: center;
    font-size: 16px;
    color: #111e36;
    font-weight: 700;
}
.quality_quality__H7DH8 .quality_rank__w6_5X {
    padding-top: 10px;
    margin-top: 0;
}

.quality_quality__H7DH8 .quality_rank__w6_5X span {
    float: left;
    text-align: right;
}

.quality_quality__H7DH8 .quality_rank__w6_5X span:first-child {
    width: 70%;
    text-align: left;
}

.quality_quality__H7DH8 .quality_rank__w6_5X span:last-child {
    width: 30%;
}

.quality_quality__H7DH8 .quality_rank__w6_5X dt {
    line-height: 16px;
    font-size: 14px;
    color: #828ca0;
    overflow: hidden;
}

.quality_quality__H7DH8 .quality_rank__w6_5X dd {
    line-height: 42px;
    font-size: 14px;
    overflow: hidden;
    margin-left: 0;
}

.quality_quality__H7DH8 .quality_rank__w6_5X dd:not(:last-child) {
    border-bottom: 1px solid #e6ebf5;
}

.quality_quality__H7DH8 .quality_rank__w6_5X dd a {
    display: block;
    color: #111e36;
}

.quality_quality__H7DH8 .quality_rank__w6_5X dd a:hover {
    color: #f60;
}

.quality_quality__H7DH8 .quality_rank__w6_5X dd a > span:first-child {
    max-width: 70%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.quality_quality__H7DH8 .quality_rank__w6_5X dd:nth-of-type(-n + 3) em {
    font-size: 20px;
    color: #f60;
}

.quality_quality__H7DH8 .quality_rank__w6_5X dd em {
    float: left;
    width: 14px;
    font-family: DINAlternate-Bold;
    font-size: 16px;
    font-weight: 700;
    color: inherit;
    font-style: normal;
}

.quality_quality__H7DH8 .quality_rank__w6_5X dd.quality_disabled__6Ri2V a,
.quality_quality__H7DH8 .quality_rank__w6_5X dd.quality_disabled__6Ri2V a em {
    color: #828ca0;
}

.quality_quality__H7DH8 .quality_rank__w6_5X dd.quality_activate__93rKt a {
    color: #f60;
    font-weight: 800;
}

.quality_quality__H7DH8 .quality_same_level__GXIri .quality_rank__w6_5X span {
    float: left;
    text-align: right;
}

.quality_quality__H7DH8 .quality_same_level__GXIri .quality_rank__w6_5X span:first-child {
    width: 40%;
    text-align: left;
}

.quality_quality__H7DH8 .quality_same_level__GXIri .quality_rank__w6_5X span:last-child,
.quality_quality__H7DH8 .quality_same_level__GXIri .quality_rank__w6_5X span:nth-child(2) {
    width: 30%;
}

.quality_quality__H7DH8 .quality_blank_tips__iMyTT {
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    line-height: 38px;
    padding: 0 32px 0 14px;
    color: #f60;
    font-size: 14px;
    background-color: rgba(255, 102, 0, 0.04);
    border: 1px solid rgba(255, 102, 0, 0.3);
    border-radius: 4px;
}

.quality_quality__H7DH8 .quality_blank_tips__iMyTT:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    width: 8px;
    height: 8px;
    border-left: 1px solid rgba(255, 102, 0, 0.3);
    border-bottom: 1px solid rgba(255, 102, 0, 0.3);
    background-color: #fff;
    transform: translate(-50%) rotate(-45deg);
}

.quality_quality__H7DH8 .quality_blank_tips__iMyTT.quality_hide__9bJCN {
    display: none;
}

.quality_quality__H7DH8 .quality_blank_tips__iMyTT i {
    position: absolute;
    top: 48%;
    right: 14px;
    width: 13px;
    height: 13px;
    transform: translateY(-50%) rotate(45deg);
    cursor: pointer;
}

.quality_quality__H7DH8 .quality_blank_tips__iMyTT i:after,
.quality_quality__H7DH8 .quality_blank_tips__iMyTT i:before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 1px;
    background-color: #f60;
}

.quality_quality__H7DH8 .quality_blank_tips__iMyTT i:after {
    width: 1px;
    height: 100%;
}

.quality_quality__H7DH8 .quality_blank_tips__iMyTT:hover,
.quality_quality__H7DH8 .quality_blank_tips__iMyTT:hover:after {
    border-color: #f60;
}
</style>
