<template>
    <PageWrapper class="AdminCodereview sg-p-0 column" :title="null">
        <sg-base-form ref="formRef" :tight="true" v-bind="getFormAttrs" v-model="formModel" @submit="handleSearch" @reset="handleSearch"></sg-base-form>
        <sg-data-view v-bind="getTableAttrs" ref="tableRef"></sg-data-view>
    </PageWrapper>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { MyMixins } from '@/entry/devops/mixins'
import { FormColumn, FormRow, FormRef, TableColumn, TableRef, TableLoad, TableLoadValue } from '@/sharegood-ui'
import { dateFormat, getKPIDateRange, isAdmin } from '@/scripts/utils'
import { ReviewService, UserService } from '@/entry/devops/api'
import { userStore } from '@/entry/devops/store/useStore'

const API = {
    list: ReviewService.list,
    removeOne: ReviewService.removeOne,
}
import _ from 'lodash'

@Component({
    name: 'AdminCodereview',
    components: {},
})
export default class AdminCodereview extends MyMixins {
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
                        tag: 'autocomplete',
                        name: 'developerName',
                        itemAttrs: {
                            label: '被检查人',
                        },
                        componentProps({ formActionType }) {
                            return {
                                attrs: {
                                    value: '',
                                    'value-key': 'label',
                                    debounce: 500,
                                    'highlight-first-item': true,
                                    'trigger-on-focus': true,
                                    placeholder: '模糊查询',
                                    options: async () => {
                                        let options = await UserService.getUserOptions()
                                        //options = options.filter(item => item.position!.indexOf('前端') > -1)
                                        // 当前用户名
                                        const currentUserName = userStore.info?.username || ''

                                        // 对数组进行排序
                                        options.sort((a, b) => {
                                            // 如果a或b的name属性等于当前用户名，将其放在前面
                                            if (a.username === currentUserName) return -1
                                            if (b.username === currentUserName) return 1
                                            // 否则，按照原始顺序排序
                                            return 0
                                        })
                                        return options
                                    },
                                    listeners: {
                                        select: (val: any) => {
                                            formActionType.submit()
                                        },
                                        clear: () => {
                                            formActionType.submit()
                                        },
                                    },
                                },
                            }
                        },
                    },
                    {
                        tag: 'autocomplete',
                        name: 'reviewerName',
                        itemAttrs: {
                            label: '检查人',
                        },
                        componentProps({ formActionType }) {
                            return {
                                attrs: {
                                    value: '',
                                    'value-key': 'label',
                                    debounce: 500,
                                    'highlight-first-item': true,
                                    'trigger-on-focus': true,
                                    placeholder: '模糊查询',
                                    options: async () => {
                                        let options = await UserService.getUserOptions()
                                        //options = options.filter(item => item.position!.indexOf('前端') > -1)
                                        // 当前用户名
                                        const currentUserName = userStore.info?.username || ''

                                        // 对数组进行排序
                                        options.sort((a, b) => {
                                            // 如果a或b的name属性等于当前用户名，将其放在前面
                                            if (a.username === currentUserName) return -1
                                            if (b.username === currentUserName) return 1
                                            // 否则，按照原始顺序排序
                                            return 0
                                        })
                                        return options
                                    },
                                    listeners: {
                                        select: (val: any) => {
                                            formActionType.submit()
                                        },
                                        clear: () => {
                                            formActionType.submit()
                                        },
                                    },
                                },
                            }
                        },
                    },
                    {
                        tag: 'input',
                        name: 'projectName',
                        itemAttrs: {
                            label: '项目id',
                        },
                        attrs: {
                            placeholder: '支持模糊查询',
                            isTriggerSubmit: true,
                        },
                    },
                    {
                        tag: 'select',
                        name: 'state',
                        itemAttrs: {
                            label: '状态',
                        },
                        attrs: {
                            options: [
                                {
                                    label: '已审核',
                                    value: 'merged',
                                },
                                {
                                    label: '待审核',
                                    value: 'opened',
                                },
                                {
                                    label: '已关闭',
                                    value: 'closed',
                                },
                            ],
                            onInput: (val, { formActionType }) => {
                                formActionType.submit()
                            },
                        },
                    },
                    {
                        tag: 'select',
                        name: 'result',
                        itemAttrs: {
                            label: '是否合格',
                        },
                        attrs: {
                            options: [
                                {
                                    label: '合格',
                                    value: '合格',
                                },
                                {
                                    label: '不合格',
                                    value: '不合格',
                                },
                            ],
                            onInput: (val, { formActionType }) => {
                                formActionType.submit()
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
                            value: getKPIDateRange(),
                            'default-time': ['00:00:00', '23:59:59'],
                            //type: 'daterange',
                            format: 'yyyy-MM-dd HH:mm:ss',
                            'value-format': 'yyyy-MM-dd HH:mm:ss',
                            'start-placeholder': '开始时间',
                            'end-placeholder': '结束时间',
                            type: 'datetime',
                            onInput: (val, { formActionType }) => {
                                formActionType.submit()
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
        height: '100%',
        //dataSourcePath: 'data',
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
        load: async (params: any = {}) => {
            const formRef: any = this.$refs.formRef
            const state = formRef.getState()
            const { projectName = '', ...rest } = state

            const conditions = {
                ...rest,
            }

            console.log(11, rest)

            // if (reviewerName) {
            //     conditions.reviewerName = `%${reviewerName}%`
            // }
            if (projectName) {
                conditions.projectName = `%${projectName}%`
            }
            params.conditions = conditions
            const { data } = await API.list(params)
            return {
                result: data.data,
                total: data.total,
            }
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
                prop: 'projectName',
                width: '200px',

                render: (h, { row }) => {
                    const project = row.project || {}
                    return [
                        h(
                            'a',
                            {
                                class: 'sg-link',
                                attrs: {
                                    href: project.web_url,
                                    target: '_blank',
                                },
                            },
                            [h('div', {}, project.name), h('div', {}, project.description)],
                        ),
                    ]
                },
            },
            {
                align: 'left',
                label: '被检查人',
                prop: 'developerName',
                width: '240px',
                fixed: 'left',
                render: (h, { row }) => {
                    return [h('div', {}, row.developerName), h('div', {}, row.object_attributes?.last_commit?.author?.email)]
                },
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
                label: '问题点',
                prop: 'notes',
                minWidth: '250px',
                render: (h, { row }) => {
                    if (row.noteList) {
                        return row.noteList.map((item: any, i: any) => {
                            return h('div', {}, `${i + 1}. ` + item)
                        })
                    }
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
                width: '140px',
                render: (h, { row }) => {
                    return [h('div', {}, row.reviewerName), h('div', {}, row.reviewer?.email)]
                },
            },
            {
                align: 'left',
                label: '状态',
                prop: 'state',
                width: '100px',
                render: (h, { row }) => {
                    const { state } = row
                    const stateMap: any = new Map([
                        [
                            'opened',
                            {
                                label: '待审核',
                                class: 'sg-status-orange',
                            },
                        ],
                        [
                            'merged',
                            {
                                label: '已审核',
                                class: 'sg-status-blue',
                            },
                        ],
                        [
                            'closed',
                            {
                                label: '已关闭',
                                class: 'sg-status-red',
                            },
                        ],
                    ])
                    const state$ = stateMap.get(state)
                    return h('span', { class: state$?.class }, state$?.label)
                },
            },

            {
                align: 'left',
                label: '创建时间',
                prop: 'createdAt',
                width: '180px',
                render: (h, { row }) => {
                    return dateFormat(new Date(row.createdAt), 'YYYY-MM-DD HH:mm:ss')
                },
            },
            {
                align: 'left',
                label: '检查时间',
                prop: 'updatedAt',
                width: '180px',
                render: (h, { row }) => {
                    return dateFormat(new Date(row.updatedAt), 'YYYY-MM-DD HH:mm:ss')
                },
            },

            {
                align: 'center',
                label: '检查打分',
                prop: 'score',
                width: '80px',
                fixed: 'right',
            },
            // 函数模式
            {
                align: 'left',
                label: '操作',
                prop: 'action',
                width: '60px',
                fixed: 'right',
                render: (h, { row }) => {
                    return [
                        h(
                            'a',
                            {
                                class: 'sg-link  sg-error-color',
                                props: {
                                    type: 'text',
                                },
                                style: isAdmin(userStore.info) || row.reviewerName === userStore.info.name ? '' : 'visibility:hidden',
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
    mounted() {}
}
</script>

<style lang="less" scoped></style>
