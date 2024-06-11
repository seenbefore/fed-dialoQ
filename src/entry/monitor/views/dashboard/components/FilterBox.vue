<!-- 错误详情 -->
<template>
    <div class="FilterBox sg-flexbox" style=" ">
        <div class="sg-flex-1 sg-flexbox align-center">
            <slot>&nbsp;</slot>
        </div>
        <div style="">
            <sg-base-form ref="formRef" v-bind="formAttrs" v-model="formModel" @submit="handleSearch"></sg-base-form>
        </div>
    </div>
</template>

<script lang="tsx">
import { FormColumn, FormRef, TableColumn, TableLoad, TableRef, FormRow } from '@/sharegood-ui'
import { Component, Vue, Prop, Ref, Watch } from 'vue-property-decorator'
import { getTimeRange } from './helper'
let map: any = {
    hour: 1 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
}

@Component({
    name: 'FilterBox',
    components: {},
})
export default class FilterBox extends Vue {
    @Prop({ default: 'dashboard' })
    type!: string
    formModel = {
        searchType: '',
        search: '',
    } as any
    created() {
        const filters: any = this.$route.query.filters
        if (filters) {
            const body = filters ? JSON.parse(filters) : {}
            const { startTime, endTime } = body

            Object.assign(this.formModel, {
                $createdAt: [startTime, endTime],
                ...body,
                startTime,
                endTime,
            })
        } else {
            const [startTime, endTime] = getTimeRange(map['week'])
            Object.assign(this.formModel, {
                $createdAt: [startTime, endTime],
                startTime,
                endTime,
                duration: 'week',
            })
            this.handleSearch()
        }
    }

    handleSearch() {
        const { $createdAt, ...rest } = this.formModel

        this.$router
            .replace({
                query: {
                    filters: JSON.stringify({
                        ...rest,
                    }),
                },
            })
            .catch(err => {
                // console.error(err)
            })
    }
    get formAttrs() {
        const searchItem =
            this.type === 'dashboard'
                ? {
                      tag: 'select',
                      name: 'searchType',
                      attrs: {
                          options: [
                              {
                                  label: '错误地址',
                                  value: 'url',
                              },
                              {
                                  label: '错误信息',
                                  value: 'message',
                              },
                              {
                                  label: '错误名称',
                                  value: 'name',
                              },
                              {
                                  label: '用户标识',
                                  value: 'trackerId',
                              },
                              //   {
                              //       label: '应用标识',
                              //       value: 'clientName',
                              //   },
                          ],
                          placeholder: '搜索',
                      },
                  }
                : {
                      tag: 'select',
                      name: 'searchType',
                      attrs: {
                          options: [
                              {
                                  label: '错误地址',
                                  value: 'data.url',
                              },
                              {
                                  label: '错误信息',
                                  value: 'data.message',
                              },
                              {
                                  label: '错误名称',
                                  value: 'data.name',
                              },
                              {
                                  label: '用户标识',
                                  value: 'authInfo.trackerId',
                              },
                              {
                                  label: '系统',
                                  value: 'deviceInfo.os',
                              },
                          ],
                          placeholder: '搜索类型',
                      },
                  }
        return {
            span: 8,
            fields: [
                searchItem,
                // {
                //     tag: 'select',
                //     name: 'searchType',
                //     attrs: {
                //         options: [
                //             {
                //                 label: '错误地址',
                //                 value: 'data.url',
                //             },
                //             {
                //                 label: '错误信息',
                //                 value: 'data.message',
                //             },
                //             {
                //                 label: '错误名称',
                //                 value: 'data.name',
                //             },
                //             {
                //                 label: '用户标识',
                //                 value: 'authInfo.trackerId',
                //             },
                //             {
                //                 label: '系统',
                //                 value: 'deviceInfo.os',
                //             },
                //         ],
                //         placeholder: '搜索类型',
                //     },
                // },
                {
                    tag: 'input',
                    name: 'search',
                    itemAttrs: {
                        class: 'sg-pl-2',
                    },
                    attrs: {
                        placeholder: '输入关键字enter搜索',
                        isTriggerSubmit: true,
                    },
                },
                {
                    span: 9,
                    tag: 'date',
                    name: '$createdAt',
                    itemAttrs: {
                        label: '',
                        class: 'sg-pl-2',
                    },
                    class: 'auto',
                    attrs: {
                        value: [],
                        type: 'datetimerange',
                        onInput: (val, { formActionType }) => {
                            formActionType.setState('duration', 'other')
                            formActionType.setState('startTime', val?.[0] || '')
                            formActionType.setState('endTime', val?.[1] || '')
                            console.log('createdAt change')

                            this.handleSearch()
                        },
                        defaultTime: ['00:00:00', '23:59:59'],
                        valueFormat: 'yyyy-MM-dd HH:mm:ss',
                    },
                },
                {
                    span: 6,
                    tag: 'radio',
                    name: 'duration',
                    itemAttrs: {
                        label: '',
                    },
                    class: 'auto',
                    attrs: {
                        type: 'button',

                        options: [
                            {
                                label: '1小时',
                                value: 'hour',
                            },
                            {
                                label: '1天',
                                value: 'day',
                            },
                            {
                                label: '7天',
                                value: 'week',
                            },
                            {
                                label: '30天',
                                value: 'month',
                            },
                        ],
                        onInput: (val, { formModel, formActionType }) => {
                            if (val <= 0) {
                                return
                            }

                            const recentDays = getTimeRange(map[val])

                            formActionType.setState('$createdAt', recentDays)
                            formActionType.setState('startTime', recentDays?.[0] || '')
                            formActionType.setState('endTime', recentDays?.[1] || '')
                            console.log('duration change')
                            this.handleSearch()
                        },
                    },
                    appendRender: () => {
                        return (
                            <router-link class="sg-pl-2" to="/login">
                                退出
                            </router-link>
                        )
                    },
                },
            ] as FormColumn[],
        }
    }
}
</script>

<style lang="less" scoped>
.FilterBox ::v-deep {
    background-color: #35353d;
    padding: 7px 12px;
    .el-radio-button__inner {
        background-color: transparent !important;
        color: #999;
        border: none !important;
        min-width: 60px;
        box-shadow: none !important;
    }
    .el-radio-button {
        &.is-acitve {
            .el-radio-button__inner {
                color: #fff !important;
            }
        }
    }
}
</style>
