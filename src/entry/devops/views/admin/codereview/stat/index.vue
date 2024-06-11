<template>
    <div class="sg-page AdminCodereviewStat sg-p-0 column">
        <section class="sg-card">
            <!-- <div class="sg-card-header ">
                <div class="sg-flex-1">
                    <div class="sg-card-title" v-text="$route.meta.title"></div>
                </div>
            </div> -->
            <div class="sg-card-body">
                <sg-base-form ref="formRef" :tight="true" v-bind="getFormAttrs" v-model="formModel" @submit="handleSearch" @reset="handleSearch"></sg-base-form>
                <sg-data-view v-bind="getTableAttrs" ref="tableRef"></sg-data-view>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { FormColumn, FormRow, FormRef, TableColumn, TableRef, TableLoad, TableLoadValue } from '@/sharegood-ui'
import { dateFormat, getKPIDateRange } from '@/scripts/utils'
import { ReviewService, UserService, UserGroupService } from '@/entry/devops/api'

import _ from 'lodash'

@Component({
    name: 'AdminCodereviewStat',
    components: {},
})
export default class AdminCodereviewStat extends Vue {
    mounted() {}
    @Ref('formRef')
    formRef!: FormRef
    @Ref('tableRef')
    tableRef!: TableRef
    handleSearch(val = {}) {
        this.tableRef.onLoad({ page: 1 })
    }
    formModel = {
        ['[timeStart,timeEnd]']: getKPIDateRange(),
    }
    getFormAttrs = {
        span: 8,
        fields: [
            {
                columns: [
                    {
                        span: 6,
                        tag: 'select',
                        name: 'user_group$',
                        itemAttrs: {
                            label: '用户组',
                        },
                        attrs: {
                            value: [],
                            options: async () => {
                                const { data } = await UserGroupService.findAll()

                                return data.map((item: any) => {
                                    if (item.name.indexOf('前端') > -1) {
                                        this.$set(this.formModel, 'user_group$', item.records)
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
                                this.handleSearch()
                            },
                        },
                    },

                    {
                        span: 12,
                        tag: 'daterange',
                        name: '[timeStart,timeEnd]',
                        itemAttrs: {
                            label: '日期范围',
                        },
                        attrs: {
                            value: [],
                            'default-time': ['00:00:00', '23:59:59'],

                            format: 'yyyy-MM-dd HH:mm:ss',
                            'value-format': 'yyyy-MM-dd HH:mm:ss',
                            'start-placeholder': '开始时间',
                            'end-placeholder': '结束时间',
                            type: 'datetime',
                        },
                    },
                    {
                        span: 24,
                        tag: 'select',
                        name: 'name',
                        itemAttrs: {
                            label: '被检查人',
                        },
                        attrs: {
                            value: [],
                            filterable: true,
                            multiple: true,
                            isFilterValue: true,
                            //'collapse-tags': true,
                            'default-first-option': true,
                            options: async () => {
                                const result = await UserService.getUserOptions()
                                return result.map(item => {
                                    return {
                                        label: item.label,
                                        value: item.label,
                                    }
                                })
                            },
                        },
                    },
                    {
                        span: 24,
                        tag: 'action',
                        buttons: [
                            {
                                isSubmit: true,
                                type: 'primary',
                                text: '查询',
                                size: 'small',
                                svgIcon: 'icon-search',
                            },
                            {
                                isReset: true,
                                text: '重置',
                                size: 'small',
                                svgIcon: 'icon-reset',
                            },
                        ],
                    },
                ],
            },
        ] as FormRow[],
    }
    getTableAttrs = {
        auto: false,
        height: '100%',
        pagination: {
            pageSize: 1000,
        },
        exportName: `代码走查结果${this.formModel['[timeStart,timeEnd]']?.join('至')}`,
        pageVisible: true,
        pageActionLayout: [
            {
                key: 'export',
                label: '导出',
            },
            {
                key: 'exportAll',
                label: '导出全部',
            },
        ],
        //dataSourcePath: 'data',
        load: async (params: any = {}) => {
            const formRef: any = this.$refs.formRef
            const state = formRef.getState()

            const { name, user_group$, ...rest } = state

            // 没有被检查人直接返回空
            if (!name?.length) {
                return {
                    result: [],
                    total: 0,
                }
            }
            params.conditions = {
                name,
                ...rest,
            }

            const { data } = await ReviewService.stat(params)
            const res = await ReviewService.list({
                conditions: {
                    ...rest,
                },
                page: 1,
                pageSize: 5000,
            })
            const list = res.data?.data || []

            /**
             *
             * 计算分数
             * 个人的最低分作为基准分
             * 规则：1、审查出问题的人加分 2、审查次数 3、检查次数
             */
            let goodReviewer: any[] = []
            data.forEach(item => {
                let { score, name, count, reviewCount } = item
                reviewCount = reviewCount || 0
                count = count || 0
                score = score || 0
                let points$ = score * 2
                // 审查出问题点加分项
                let bonusPoint = 0
                list.forEach(item => {
                    let score = item.score || 30
                    if (item.reviewerName === name) {
                        bonusPoint = bonusPoint + (30 - score)
                    }
                })
                console.log(`检查出问题 ${name} ${bonusPoint}`)

                item.bonusPoint$ = bonusPoint
                if (bonusPoint > 0) {
                    goodReviewer.push({
                        name,
                        bonusPoint,
                    })
                }
                //item.points$ = Math.min(points$, 100)
            })
            goodReviewer = goodReviewer.sort((a, b) => {
                return b.bonusPoint$ - a.bonusPoint$
            })

            data.forEach(item => {
                let { score, name, count, reviewCount, bonusPoint$ } = item
                reviewCount = reviewCount || 0
                count = count || 0
                score = score || 0

                //const goodReviewerRank = goodReviewer.findIndex(item => item.name === name)

                // 审查出问题的前50%人员再额外乘以2
                // bonusPoint$ = goodReviewerRank != -1 && goodReviewerRank < Math.floor(goodReviewer.length / 2) ? bonusPoint$ * 2 : bonusPoint$

                //console.log(name, bonusPoint$, goodReviewerRank, Math.floor(goodReviewer.length / 2), goodReviewer)
                if (score === 0) {
                    item.points$ = 0
                } else {
                    item.points$ = Math.min(100, score * 2 + bonusPoint$ * 2 + Math.min(count, 10) + Math.min(reviewCount, 10))
                }
            })

            const sortedData = data.sort((a, b) => {
                return b.points$ - a.points$
            })

            return {
                result: sortedData,
                total: data.length,
            }
        },
        columns: [
            {
                label: '序号',
                type: 'index',
                prop: 'index',
                fixed: 'left',
                exportRender(row: any, index: any) {
                    return index + 1
                },
            },
            {
                align: 'left',
                label: '项目',
                prop: 'projectName',
                width: '200px',

                render: (h, { row }) => {
                    if (row.project) {
                        try {
                            const project = JSON.parse(row.project)
                            return [h('div', {}, project.name), h('div', {}, project.description)]
                        } catch (error) {}
                    }
                },
                exportRender(row: any, index: any) {
                    if (row.project) {
                        try {
                            const project = JSON.parse(row.project)
                            return [project.name, project.description].join('-')
                        } catch (error) {}
                    } else {
                        return '-'
                    }
                },
            },
            {
                align: 'left',
                label: '被检查人员',
                prop: 'name',
                width: '100px',
                fixed: 'left',
            },

            {
                align: 'left',
                label: '检查内容',
                prop: 'url',
                width: '250px',
                render: (h, { row }) => {
                    return [
                        h('div', {}, row.title),
                        h(
                            'a',
                            {
                                class: 'sg-link',
                                attrs: {
                                    href: row.url,
                                    target: '_blank',
                                },
                            },
                            row.url,
                        ),
                    ]
                },
            },
            {
                align: 'left',
                label: '不合格代码开始位置及不合格原因',
                prop: 'notes',
                minWidth: '250px',
                render: (h, { row }) => {
                    if (row.noteList) {
                        try {
                            const noteList = JSON.parse(row.noteList)
                            return noteList.map((item: any, i: any) => {
                                return h('div', {}, `${i + 1}. ` + item)
                            })
                        } catch (error) {}
                    } else {
                        return ''
                    }
                },
            },
            {
                align: 'left',
                label: '检查打分',
                prop: 'score',
                width: '100px',
                fixed: 'right',
                renderHeader(h: any, { column, $index }: any) {
                    return h('div', {}, [
                        h('span', '检查打分'),
                        h(
                            'el-tooltip',
                            {
                                props: {
                                    placement: 'right',
                                },
                                style: {
                                    marginLeft: '5px',
                                },
                            },
                            [
                                h(
                                    'span',
                                    {
                                        slot: 'content', // slot属性
                                        style: {
                                            display: 'inline-block',
                                            maxWidth: '220px',
                                            whiteSpace: 'normal',
                                            wordBreak: 'break-all',
                                        },
                                    },
                                    '取走查明细中的最低分',
                                ),
                                h('i', {
                                    class: 'el-icon-info',
                                }),
                            ],
                        ),
                    ])
                },
            },
            {
                align: 'left',
                label: '检查结果',
                prop: 'result',
                width: '100px',
            },
            {
                align: 'left',
                label: '结论',
                prop: 'summary',
                width: '100px',
            },

            {
                align: 'left',
                label: '检查人员',
                prop: 'reviewerName',
                width: '100px',
            },

            {
                align: 'left',
                label: '检查时间',
                prop: 'updatedAt',
                width: '180px',
                render: (h, { row }) => {
                    if (row.updatedAt) {
                        return dateFormat(new Date(row.updatedAt), 'YYYY/MM/DD')
                    }
                },
            },
            {
                align: 'left',
                label: '异常场景',
                prop: '异常场景',
                width: '80px',
                render: (h, { row }) => {
                    return row.project ? '已检查' : ''
                },
            },

            {
                align: 'left',
                label: '审查次数',
                prop: 'reviewCount',
                width: '80px',
                fixed: 'right',
                render: (h, { row }) => {
                    const reviewCount = row.reviewCount ?? '0'
                    const bonusPoint$ = row.bonusPoint$ ?? '0'
                    const result = `${reviewCount}(${bonusPoint$})`
                    return result
                },
            },
            {
                align: 'left',
                label: '检查次数',
                prop: 'count',
                width: '80px',
                fixed: 'right',
                render: (h, { row }) => {
                    return row.count ?? '0'
                },
            },

            {
                align: 'left',
                label: '总分',
                prop: 'points$',
                width: '80px',
                fixed: 'right',
                renderHeader(h: any, { column, $index }: any) {
                    return h('div', {}, [
                        h('span', '总分'),
                        h(
                            'el-tooltip',
                            {
                                props: {
                                    placement: 'right',
                                },
                                style: {
                                    marginLeft: '5px',
                                },
                            },
                            [
                                h(
                                    'span',
                                    {
                                        slot: 'content', // slot属性
                                        style: {
                                            display: 'inline-block',
                                            maxWidth: '220px',
                                            whiteSpace: 'normal',
                                            wordBreak: 'break-all',
                                        },
                                    },
                                    '总分: 检查打分*2+Math.min(审查次数, 10)+Math.min(检查次数, 10)+审查出问题点*2',
                                ),
                                h('i', {
                                    class: 'el-icon-info',
                                }),
                            ],
                        ),
                    ])
                },

                // render: (h, { row }) => {
                //     let { score = 0, count = 0, reviewCount = 0 } = row
                //     let countVal = ((count * 100) / 5) * 0.5
                //     let scoreVal = (100 - (30 - score) * 10) * 0.5
                //     let maxScore = reviewCount < 3 && score < 27 ? 90 : 100
                //     reviewCount = reviewCount >= 3 ? +reviewCount * 2 : 0
                //     let result = countVal + scoreVal + reviewCount
                //     result = result % 5 === 0 ? result : Math.floor(result / 10) * 10
                //     if (result < 0) {
                //         result = 0
                //     }
                //     return Math.min(maxScore, result)
                // },
            },
        ] as TableColumn[],
    }
    async created() {}
}
</script>

<style lang="less" scoped></style>
