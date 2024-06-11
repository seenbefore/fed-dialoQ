<template>
    <PageWrapper class="AdminArticleList column">
        <template #title>
            <el-button
                type="default"
                icon="el-icon-plus"
                @click="
                    $push({
                        path: '/admin/article/edit',
                        query: {
                            _: '文章新增',
                        },
                    })
                "
            >
                新增
            </el-button>
        </template>
        <sg-base-form :tight="true" ref="formRef" v-bind="getFormAttrs" v-model="formModel" @submit="handleSearch" @reset="handleSearch"></sg-base-form>
        <sg-data-view v-bind="getTableAttrs" ref="tableRef"></sg-data-view>
    </PageWrapper>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { MyMixins } from '@/entry/devops/mixins'
import { FormColumn, FormRef, TableColumn, TableRef, TableLoad, TableLoadValue, FormRow } from '@/sharegood-ui'
import { dateFormat } from '@/scripts/utils'
import { ArticleService, DictService, UserService } from '@/entry/devops/api'
import { userStore } from '@/entry/devops/store/useStore'
const API = {
    list: ArticleService.list,
    removeOne: ArticleService.removeOne,
}
import _ from 'lodash'

@Component({
    name: 'AdminArticleList',
    components: {},
})
export default class AdminArticleList extends MyMixins {
    @Ref('formRef')
    formRef!: FormRef
    @Ref('tableRef')
    tableRef!: TableRef
    handleSearch(val = {}) {
        this.tableRef.onLoad({ page: 1 })
    }
    formModel = {}
    getFormAttrs = {
        span: 4,
        labelWidth: '60px',
        fields: [
            {
                columns: [
                    {
                        span: 6,
                        tag: 'input',
                        name: 'title',
                        itemAttrs: {
                            label: '标题',
                        },
                        attrs: {
                            placeholder: '支持模糊查询',
                            isTriggerSubmit: true,
                        },
                    },
                    // {
                    //     span: 5,
                    //     tag: 'select',
                    //     name: 'book_name',
                    //     itemAttrs: {
                    //         label: '分类',
                    //     },
                    //     attrs: {
                    //         filterable: true,
                    //         'default-first-option': true,
                    //         options: async () =>
                    //             DictService.all({
                    //                 conditions: {
                    //                     code: '文章分类',
                    //                 },
                    //             }),
                    //         onInput: (val, { formActionType }) => {
                    //             formActionType.submit()
                    //         },
                    //     },
                    // },
                    {
                        span: 5,
                        tag: 'select',
                        name: 'is_recommend',
                        itemAttrs: {
                            label: '推荐',
                        },
                        attrs: {
                            options: [
                                {
                                    label: '全部',
                                    value: '',
                                },
                                {
                                    label: '是',
                                    value: '1',
                                },
                                {
                                    label: '否',
                                    value: '0',
                                },
                            ],
                        },
                    },
                    {
                        span: 4,
                        tag: 'autocomplete',
                        name: 'author',
                        itemAttrs: {
                            label: '作者',
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
                        // attrs: {
                        //     filterable: true,
                        //     'value-key': 'label',
                        //     'default-first-option': true,
                        //     options: async () => {
                        //         return await UserService.getUserOptions()
                        //     },
                        //     onInput: (val, { formActionType }) => {
                        //         formActionType.submit()
                        //     },
                        //     listeners: {
                        //         select: (val: any) => {
                        //             this.search()
                        //         },
                        //     },
                        // },
                    },
                    {
                        span: 9,
                        tag: 'daterange',
                        name: '[timeStart,timeEnd]',
                        itemAttrs: {
                            label: '日期',
                        },
                        attrs: {
                            value: [],
                            'default-time': ['00:00:00', '23:59:59'],
                            //type: 'daterange',
                            format: 'yyyy-MM-dd HH:mm:ss',
                            'value-format': 'yyyy-MM-dd HH:mm:ss',
                            'start-placeholder': '开始时间',
                            'end-placeholder': '结束时间',
                            type: 'datetime',
                            onInput: (val, { formActionType }) => {
                                val[1] && formActionType.submit()
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
                                svgIcon: 'icon-search',
                            },
                            {
                                isReset: true,
                                text: '重置',
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
        dataSourcePath: 'data',
        load: async (params: any = {}) => {
            const formRef: any = this.$refs.formRef
            const state = formRef.getState()
            const { title = '', ...rest } = state

            const conditions = {
                ...rest,
            }
            if (title) {
                conditions.title = `%${title}%`
            }
            params.conditions = conditions
            return await API.list(params)
        },
        columns: [
            {
                label: '序号',
                type: '$index',
                prop: '$index',
                fixed: 'left',
            },
            {
                align: 'left',
                label: '标题',
                prop: 'title',
                width: '300px',
                fixed: 'left',
                showOverflowTooltip: false,
                render: (h, { row }) => {
                    const { status } = row
                    const status$ = status == 'publish' ? '' : '草稿-'
                    return [
                        h(
                            'el-link',
                            {
                                class: status == 'publish' ? 'sg-link' : 'sg-info-color',
                                props: {
                                    type: 'text',
                                },
                                on: {
                                    click: () => {
                                        this.$open({
                                            path: `/post/${row.uuid}`,
                                        })
                                    },
                                },
                            },
                            `${status$}${row.title}`,
                        ),
                    ]
                },
            },

            {
                align: 'left',
                label: '作者',
                prop: 'author',
                width: '80px',
                fixed: 'left',
            },
            // {
            //     align: 'left',
            //     label: '摘要',
            //     prop: 'summary',
            //     minWidth: '200px',
            // },
            {
                align: 'left',
                label: '分类',
                prop: 'book_name',
                width: '110px',
            },
            // {
            //     align: 'left',
            //     label: '标签',
            //     prop: 'tags',
            //     minWidth: '100px',
            // },

            {
                align: 'left',
                label: '阅读数',
                prop: 'read_num',
                width: '80px',
                render: (h, { row }) => {
                    const { read_num } = row
                    return [
                        h(
                            'span',
                            {
                                class: 'sg-info-color',
                                props: {
                                    type: '',
                                },
                            },
                            read_num,
                        ),
                    ]
                },
            },
            // {
            //     align: 'left',
            //     label: '状态',
            //     prop: 'status',
            //     width: '80px',
            //     render: (h, { row }) => {
            //         const { status } = row
            //         return [
            //             h(
            //                 'el-tag',
            //                 {
            //                     props: {
            //                         type: status == 'publish' ? 'info' : 'danger',
            //                     },
            //                 },
            //                 status == 'publish' ? '发布' : '草稿',
            //             ),
            //         ]
            //     },
            // },
            // {
            //     align: 'left',
            //     label: '是否推荐',
            //     prop: 'is_recommend',
            //     width: '100px',
            // },

            // {
            //     align: 'left',
            //     label: '点击量',
            //     prop: 'read_num',
            //     width: '100px',
            // },
            // {
            //     align: 'left',
            //     label: '点赞量',
            //     prop: 'like_num',
            //     width: '100px',
            // },
            // {
            //     align: 'left',
            //     label: '状态',
            //     prop: 'status',
            //     width: '100px',
            // },
            // {
            //     align: 'left',
            //     label: '来源',
            //     prop: 'copyright',
            //     width: '100px',
            //     render: (h, { row }) => {
            //         return row.copy_url ? '转载' : '原创'
            //     },
            // },
            {
                align: 'left',
                label: '修改时间',
                prop: 'updatedAt',
                minWidth: '130px',
                render: (h, { row }) => {
                    return dateFormat(new Date(row.updatedAt), 'MM-DD HH:mm:ss')
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
                label: '操作',
                prop: 'action',
                width: '180px',
                fixed: 'right',
                render: (h, { row }) => {
                    return [
                        h(
                            'el-button',
                            {
                                props: {
                                    type: 'text',
                                },
                                on: {
                                    click: () => {
                                        this.$push({
                                            path: '/admin/article/edit',
                                            query: {
                                                _: '编辑-' + row.title,
                                                isEdit: '1',
                                                id: row.id,
                                            },
                                        })
                                    },
                                },
                            },
                            '编辑',
                        ),
                        h(
                            'el-button',
                            {
                                class: row.is_top == '1' ? 'sg-warning-color' : '',
                                props: {
                                    type: 'text',
                                },
                                on: {
                                    click: async () => {
                                        const id = row.id
                                        const is_top = row.is_top == '1' ? 0 : 1
                                        await ArticleService.update(
                                            {
                                                id,
                                                is_top,
                                            },
                                            {
                                                exShowLoading: true,
                                                exShowLoadingOption: {
                                                    target: '#table',
                                                    text: '操作中',
                                                },
                                            },
                                        )
                                        const tableRef = this.$refs.tableRef as TableRef
                                        tableRef.onLoad()
                                    },
                                },
                            },
                            row.is_top == '1' ? '取顶' : '置顶',
                        ),
                        h(
                            'el-button',
                            {
                                class: row.is_recommend == '1' ? 'sg-warning-color' : '',
                                props: {
                                    type: 'text',
                                },
                                on: {
                                    click: async () => {
                                        const id = row.id
                                        const is_recommend = row.is_recommend == '1' ? 0 : 1
                                        await ArticleService.update(
                                            {
                                                id,
                                                is_recommend,
                                            },
                                            {
                                                exShowLoading: true,
                                                exShowLoadingOption: {
                                                    target: '#table',
                                                    text: '操作中',
                                                },
                                            },
                                        )
                                        const tableRef = this.$refs.tableRef as TableRef
                                        tableRef.onLoad()
                                    },
                                },
                            },
                            row.is_recommend == '1' ? '取推' : '推荐',
                        ),
                        h(
                            'el-button',
                            {
                                class: 'sg-link sg-error-color',
                                props: {
                                    type: 'text',
                                },
                                on: {
                                    click: () => {
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
                                            const tableRef = this.$refs.tableRef as TableRef
                                            tableRef.onLoad()
                                        })
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
}
</script>

<style lang="less" scoped></style>
