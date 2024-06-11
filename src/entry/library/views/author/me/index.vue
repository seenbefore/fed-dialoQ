<!-- 我的 -->
<template>
    <div class="AuthorMe">
        <main class="container">
            <el-tabs v-model="formModel.owner$" class="my-tabs" v-if="tabsFormSchema.length > 0">
                <el-tab-pane :label="item.label" :name="item.name" v-for="(item, index) in tabsFormSchema" :key="index"></el-tab-pane>
            </el-tabs>
            <sg-base-form ref="formRef" :fields="formFields" v-model="formModel" @submit="handleSearch" @reset="handleSearch" :span="6"></sg-base-form>
            <sg-data-view :columns="columns" :load="load" ref="tableRef" v-bind="tableAttrs"></sg-data-view>
        </main>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Ref, Watch } from 'vue-property-decorator'
import { FormColumn, FormRef, TableColumn, TableLoadValue, TableRef } from '@/sharegood-ui'
import { userStore } from '@/entry/library/store/useStore'
import moment from 'moment'
import * as API from '@/entry/library/services/community'
import { dateFormat } from '@/scripts/utils'
import { ComboGroupDict } from '@/entry/library/scripts/dict/combo_group'
import { UserService } from '@/entry/library/services/user'

@Component({
    name: 'AuthorMe',
    components: {},
})
export default class AuthorMe extends Vue {
    @Watch('formModel.owner$')
    onStatusChange(val: any) {
        this.tableRef.onLoad({ page: 1 })
    }
    handleSearch() {
        this.tableRef.onLoad({ page: 1 })
    }
    tableAttrs = {
        pagination: { pageSize: 10 },

        pageActionLayout: [
            {
                key: 'exportAll',
                label: '导出全部',
            },
        ],
        exportAllConfig: {
            splitReqNum: 100,
        },
    }
    get tabsFormSchema() {
        const role = userStore.info?.role || ''
        if ('admin'.includes(role)) {
            return [
                {
                    name: 'all',
                    label: '全部',
                },
                {
                    name: 'me',
                    label: '我负责的',
                },
                {
                    name: 'created',
                    label: '我创建的',
                },
            ]
        }
        return [
            {
                name: 'me',
                label: '我负责的',
            },
            {
                name: 'created',
                label: '我创建的',
            },
        ]
    }
    formModel = {
        owner$: 'admin'.includes(userStore.info?.role) ? 'all' : 'me',
        plabel: '',
        clabel: '',
    }
    @Ref('formRef')
    formRef!: FormRef
    formFields: FormColumn[] = [
        {
            tag: 'input',
            name: 'keyword',
            itemAttrs: {
                label: '名称',
            },
            attrs: {
                placeholder: '支持模糊查询',
            },
        },
        {
            tag: 'autocomplete',
            name: 'owner',
            itemAttrs: {
                label: '负责人',
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
                            // console.log(111, options)
                            // 当前用户名
                            // const currentUserName = userStore.info?.username || ''

                            // // 对数组进行排序
                            // options.sort((a, b) => {
                            //     // 如果a或b的name属性等于当前用户名，将其放在前面
                            //     if (a.username === currentUserName) return -1
                            //     if (b.username === currentUserName) return 1
                            //     // 否则，按照原始顺序排序
                            //     return 0
                            // })
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
            tag: 'select',
            name: 'communityState',
            itemAttrs: {
                label: '状态',
            },
            attrs: {
                options: () => {
                    return ComboGroupDict.communityState
                },
                onInput: () => {
                    this.handleSearch()
                },
            },
        },
        {
            tag: 'select',
            name: 'plabel',
            itemAttrs: {
                label: '一级分类',
            },
            attrs: {
                options: () => {
                    return ComboGroupDict.plabel
                },
                onInput: () => {
                    this.handleSearch()
                },
            },
        },
        {
            tag: 'select',
            name: 'clabel',
            itemAttrs: {
                label: '二级分类',
            },
            attrs: {
                //value: clabel,
                onInput: (val, { formActionType, formModel }) => {
                    console.log('二级分类 onInput', val)

                    this.$set(this.formModel, 'slabel', '')
                    this.handleSearch()
                },
            },
            getAttrs: () => {
                return {
                    placeholder: '请选择类型',
                    options: () => {
                        const val = this.formModel.plabel
                        console.log('this.formModel.plabel', val)
                        const result = ComboGroupDict.clabel.filter(item => item.parent === val)
                        return result
                    },
                }
            },
            ifRender: model => {
                const val = model.plabel
                console.log('ifRender plabel', val)
                const result = ComboGroupDict.clabel.filter(item => item.parent === val)
                return val && result.length > 0
            },
        },
        // {
        //     tag: 'date',
        //     name: '[timeStart,timeEnd]',
        //     itemAttrs: {
        //         label: '日期范围',
        //     },
        //     attrs: {
        //         value: ['2022-10-1', '2022-10-7'],
        //         type: 'daterange',
        //         'value-format': 'yyyy-MM-dd',
        //         'start-placeholder': '开始时间',
        //         'end-placeholder': '结束时间',
        //     },
        // },

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
    ]
    @Ref('tableRef')
    tableRef!: TableRef
    async load(opt: any) {
        const state = this.formRef.getState()
        console.log('table请求参数', state, opt)
        const { name = '', owner$, ...rest } = state
        const conditions = {
            ...rest,
        }
        if (owner$ === 'me') {
            conditions.owner = userStore.info?.name
        } else if (owner$ === 'created') {
            conditions.createdUserName = userStore.info?.name
        }
        if (name) {
            conditions.name = `%${name}%`
        }
        const { data } = await API.list({
            ...opt,
            conditions,
        })
        return {
            result: data.data,
            total: data.total,
        }
    }
    columns: TableColumn[] = [
        {
            label: '序号',
            type: 'index',
            prop: 'index',
            fixed: 'left',
        },
        {
            align: 'left',
            label: '名称',
            prop: 'name',
            width: '300px',
            fixed: 'left',
        },
        {
            align: 'left',
            label: '负责人',
            prop: 'owner',
            width: '120px',
        },
        {
            align: 'left',
            label: '状态',
            prop: 'communityState',
            width: '120px',
            render: (h, { row }) => {
                const { communityState } = row
                const val = new Map([
                    [
                        'done',
                        {
                            label: '已完成',
                            class: 'sg-dot green',
                        },
                    ],
                    [
                        'doing',
                        {
                            label: '建设中',
                            class: 'sg-dot orange',
                        },
                    ],
                ]).get(communityState)

                return [
                    h(
                        'span',
                        {
                            class: val?.class,
                        },
                        [val?.label],
                    ),
                ]
            },
        },

        {
            align: 'left',
            label: '一级分类',
            prop: 'plabel',
            width: '120px',
        },
        {
            align: 'left',
            label: '二级分类',
            prop: 'clabel',
            width: '120px',
        },
        {
            align: 'left',
            label: '简介',
            prop: 'intro',
            overflowCount: 2,
            minWidth: '220px',
        },
        {
            align: 'left',
            label: '修改时间',
            prop: 'updatedAt',
            width: '130px',
            render: (h, { row }) => {
                return dateFormat(new Date(row.updatedAt), 'MM-DD HH:mm:ss')
            },
        },
        {
            align: 'left',
            label: '创建时间',
            prop: 'createdAt',
            width: '130px',
            render: (h, { row }) => {
                return dateFormat(new Date(row.createdAt), 'MM-DD HH:mm:ss')
            },
        },
        {
            align: 'left',
            label: '操作',
            prop: 'action',
            width: '110px',
            fixed: 'right',
            render: (h, { row }) => {
                return [
                    h(
                        'a',
                        {
                            class: 'sg-link ',
                            props: {
                                type: 'text',
                            },
                            //style: isAdmin(userStore.info) || row.reviewerName === userStore.info.name ? '' : 'visibility:hidden',
                            on: {
                                click: () => {
                                    this.handleEdit(row)
                                },
                            },
                        },
                        '编辑',
                    ),
                    h(
                        'a',
                        {
                            class: 'sg-link  sg-error-color',
                            props: {
                                type: 'text',
                            },
                            //style: isAdmin(userStore.info) || row.reviewerName === userStore.info.name ? '' : 'visibility:hidden',
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
    ]
    handleDelete(item: any) {
        this.$confirm(`确认删除 ${item.name} 吗？`).then(async () => {
            await API.remove(
                {
                    id: item.id,
                },
                {
                    exShowLoading: true,
                    exShowLoadingOption: {
                        text: '删除中',
                    },
                },
            )
            this.tableRef.onLoad({ page: 1 })
        })
    }
    handleEdit(item: any) {
        this.$router.push({
            path: '/community/upload',
            query: {
                action: 'update',
                id: item.id,
            },
        })
    }

    created() {}
    mounted() {}
}
</script>

<style lang="less" scoped>
.AuthorMe ::v-deep {
    padding-top: 72px;
    padding-bottom: 30px;
    .sg-link {
        cursor: pointer;
    }
    .container {
        max-width: 1800px;
    }
}
</style>
