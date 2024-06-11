<template>
    <PageWrapper class="AdminUi_review column " :title="null">
        <sg-base-form ref="formRef" :tight="true" v-bind="getFormAttrs" v-model="formModel" @submit="handleSearch" @reset="handleSearch"></sg-base-form>
        <sg-data-view v-bind="getTableAttrs" ref="tableRef"></sg-data-view>
    </PageWrapper>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { FormColumn, FormRow, FormRef, TableColumn, TableRef, TableLoad, TableLoadValue } from '@/sharegood-ui'
import { dateFormat, getKPIDateRange, isAdmin } from '@/scripts/utils'
import { UserService, UedReviewService } from '@/entry/devops/api'
import { MyMixins } from '@/entry/devops/mixins'
import { userStore } from '@/entry/devops/store/useStore'

const API = {
    list: UedReviewService.list,
    removeOne: UedReviewService.removeOne,
}
import _ from 'lodash'

@Component({
    name: 'AdminUi_review',
    components: {},
})
export default class AdminUi_review extends MyMixins {
    @Ref('formRef')
    formRef!: FormRef
    @Ref('tableRef')
    tableRef!: TableRef
    handleSearch(val = {}) {
        this.tableRef.onLoad({ page: 1 })
    }
    formModel = {}

    getFormAttrs = {
        span: 6,
        size: 'small',
        fields: [
            {
                columns: [
                    {
                        tag: 'select',
                        name: 'developerName',
                        itemAttrs: {
                            label: '被检查人',
                        },
                        attrs: {
                            value: '',
                            filterable: true,
                            'value-key': 'label',
                            'default-first-option': true,
                            options: async () => {
                                const result = await UserService.getUserOptions()

                                return result
                            },
                        },
                    },
                    {
                        tag: 'select',
                        name: 'reviewerName',
                        itemAttrs: {
                            label: '检查人',
                        },
                        attrs: {
                            filterable: true,
                            'value-key': 'label',
                            'default-first-option': true,
                            options: async () => {
                                return await UserService.getUserOptions()
                            },
                        },
                    },
                    {
                        tag: 'input',
                        name: 'product_title',
                        itemAttrs: {
                            label: '产品名称',
                        },
                    },
                    {
                        tag: 'input',
                        name: 'product_version',
                        itemAttrs: {
                            label: '产品版本',
                        },
                    },
                    {
                        tag: 'select',
                        name: 'status',
                        itemAttrs: {
                            label: '状态',
                        },
                        attrs: {
                            value: '',
                            options: [
                                {
                                    label: '全部',
                                    value: '',
                                },
                                {
                                    label: '进行中',
                                    value: 'opened',
                                },
                                {
                                    label: '已完成',
                                    value: 'finished',
                                },
                            ],
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
                            format: 'yyyy-MM-dd HH:mm:ss',
                            'value-format': 'yyyy-MM-dd HH:mm:ss',
                            'start-placeholder': '开始时间',
                            'end-placeholder': '结束时间',
                            type: 'datetime',
                            'default-time': ['00:00:00', '23:59:59'],
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
        dataSourcePath: 'data',
        load: async (params: any = {}) => {
            const formRef: any = this.$refs.formRef
            const state = formRef.getState()
            const { projectName = '', ...rest } = state

            const conditions = {
                ...rest,
            }

            if (projectName) {
                conditions.projectName = `%${projectName}%`
            }
            params.conditions = conditions
            return await API.list(params)
        },
        columns: [
            {
                label: '序号',
                type: 'index',
                prop: 'index',
                fixed: 'left',
            },

            {
                align: 'left',
                label: '项目',
                prop: 'title',
                minWidth: '150px',
                render(h, { row }) {
                    const { product_title, product_version } = row

                    return [
                        h('div', [
                            h(
                                'router-link',
                                {
                                    class: 'sg-link',
                                    props: {
                                        to: {
                                            path: `/admin/product/list`,
                                            query: {
                                                _: product_title,
                                                title: product_title,
                                                version: product_version,
                                                affix: 0,
                                            },
                                        },
                                    },
                                },
                                `${product_title} ${product_version}`,
                            ),
                        ]),
                    ]
                },
            },
            {
                align: 'left',
                label: '被检查人',
                prop: 'developerName',
                width: '100px',
                fixed: 'left',
            },
            {
                align: 'left',
                label: '标题',
                prop: 'title',
                minWidth: '150px',
            },

            {
                align: 'left',
                label: '检查人员',
                prop: 'reviewerName',
                width: '100px',
            },

            {
                align: 'left',
                label: '时间',
                prop: 'createdAt',
                width: '180px',
                render: (h, { row }) => {
                    return dateFormat(new Date(row.createdAt), 'YYYY-MM-DD HH:mm:ss')
                },
            },

            {
                align: 'left',
                label: '检查打分',
                prop: 'score',
                width: '80px',
                fixed: 'left',
            },
            // 函数模式
            {
                align: 'left',
                label: '操作',
                prop: 'action',
                width: '180px',
                fixed: 'right',
                render: (h, { row }) => {
                    const { reviewerName, developerName, product_title, product_version } = row
                    const name = userStore.info.name
                    return [
                        h(
                            'router-link',
                            {
                                class: 'sg-link',
                                props: {
                                    to: {
                                        path: `/product/detail`,
                                        query: {
                                            title: product_title,
                                            version: product_version,
                                        },
                                    },
                                },
                                attrs: {
                                    target: '_blank',
                                },
                            },
                            `设计稿`,
                        ),
                        h(
                            'a',
                            {
                                class: 'sg-link',
                                props: {
                                    type: 'text',
                                },

                                on: {
                                    click: () => {
                                        this.handleUIReviewDetail(row)
                                    },
                                },
                            },
                            '详情',
                        ),
                        h(
                            'a',
                            {
                                class: 'sg-link',
                                props: {
                                    type: 'text',
                                },
                                style: name === reviewerName ? '' : 'visibility:hidden',
                                on: {
                                    click: () => {
                                        this.handleUIReview(row)
                                    },
                                },
                            },
                            '验收',
                        ),
                        h(
                            'a',
                            {
                                class: 'sg-link sg-error-color',
                                props: {
                                    type: 'text',
                                },
                                style: isAdmin(userStore.info) || reviewerName === userStore.info.name ? '' : 'visibility:hidden',
                                on: {
                                    click: () => {
                                        this.handleDelete(row)
                                    },
                                },
                            },
                            '删除',
                        ),
                    ]
                },
            },
        ] as TableColumn[],
    }
    handleUIReviewDetail(row: any = {}) {
        this.$modalDialog(() => import(/* webpackChunkName: "UedReviewDialog" */ '../components/UedReviewDialog/index.vue'), {
            title: `详情-${row.product_title} ${row.product_version}`,
            isPreview: true,
            isEdit: true,
            id: row.id,
            meta: {
                ...row,
            },
        })
    }
    handleUIReview(row: any = {}) {
        this.$modalDialog(() => import(/* webpackChunkName: "UedReviewDialog" */ '../components/UedReviewDialog/index.vue'), {
            title: `开始验收-${row.product_title} ${row.product_version}`,
            isEdit: true,
            id: row.id,
        })
            .then(() => {
                this.handleSearch()
            })
            .catch((err: any) => {
                console.log(err)
            })
    }

    handleDelete(row: any) {
        const id = row.id
        this.$confirm('确认删除吗').then(async () => {
            await API.removeOne(
                {
                    id,
                },
                {
                    exShowLoading: true,
                    exShowLoadingOption: {
                        target: '#table',
                        text: '删除中',
                    },
                },
            )
            this.$message.success('删除成功')
            const tableRef = this.$refs.tableRef as TableRef
            tableRef.onLoad()
        })
    }

    created() {}
    mounted() {
        const { product_version, product_title } = this.$route.query
        Object.assign(this.formModel, {
            product_version,
            product_title,
        })
        this.handleSearch()
    }
}
</script>

<style lang="less" scoped></style>
