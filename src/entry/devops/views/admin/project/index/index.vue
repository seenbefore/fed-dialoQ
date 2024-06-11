<template>
    <PageWrapper class="AdminProjectIndex column" :title="$route.meta.title">
        <template #extra>
            <el-button
                type="primary"
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
import { FormColumn, FormRef, TableColumn, TableRef, TableLoad, TableLoadValue } from '@/sharegood-ui'
import { dateFormat } from '@/scripts/utils'
import { ProjectService, DictService } from '@/entry/devops/api'

const API = {
    list: ProjectService.list,
    removeOne: ProjectService.removeOne,
}
import _ from 'lodash'

@Component({
    name: 'AdminProjectIndex',
    components: {},
})
export default class AdminProjectIndex extends MyMixins {
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
        fields: [
            {
                columns: [
                    {
                        tag: 'input',
                        name: 'title',
                        itemAttrs: {
                            label: '标题名称',
                        },
                        attrs: {
                            placeholder: '支持模糊查询',
                        },
                    },
                    {
                        tag: 'select',
                        name: 'book_name',
                        itemAttrs: {
                            label: '分类',
                        },
                        attrs: {
                            filterable: true,
                            'default-first-option': true,
                            options: async () =>
                                DictService.all({
                                    conditions: {
                                        code: '文章分类',
                                    },
                                }),
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
                            //type: 'daterange',
                            'value-format': 'yyyy-MM-dd',
                            'start-placeholder': '开始时间',
                            'end-placeholder': '结束时间',
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
        ] as FormColumn[],
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
                type: 'index',
                prop: 'index',
                fixed: 'left',
            },
            {
                align: 'left',
                label: '项目名称',
                prop: 'name',
                width: '220px',
                fixed: 'left',
            },
            {
                align: 'left',
                label: '优先级',
                prop: 'priority',
                width: '100px',
            },
            {
                align: 'left',
                label: '应用',
                prop: 'app',
                width: '100px',
            },
            {
                align: 'left',
                label: '产品经理',
                prop: 'product_maintainer',
                width: '120px',
            },
            {
                align: 'left',
                label: '前端负责人',
                prop: 'frontend_maintainer',
                width: '120px',
            },
            {
                align: 'left',
                label: '后端负责人',
                prop: 'backend_maintainer',
                width: '120px',
            },

            {
                align: 'left',
                label: '项目概况',
                prop: 'summary',
                minWidth: '200px',
            },

            {
                align: 'left',
                label: '项目详情',
                prop: 'content',
                minWidth: '200px',
            },

            {
                align: 'left',
                label: '修改时间',
                prop: 'updatedAt',
                width: '180px',
                render: (h, { row }) => {
                    return dateFormat(new Date(row.updatedAt), 'YYYY-MM-DD HH:mm:ss')
                },
            },
            {
                align: 'left',
                label: '操作',
                prop: 'action',
                width: '130px',
                fixed: 'right',
                render: (h, { row }) => {
                    return [
                        h(
                            'a',
                            {
                                class: 'sg-link',
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
                            '查看',
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
                            'a',
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
