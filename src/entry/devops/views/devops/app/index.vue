<!-- 应用管理列表页面 -->
<template>
    <div class="sg-page DevopsApp column sg-p-0 ">
        <section class="sg-card sg-flexbox column sg-flex-1">
            <div class="sg-card-header">
                <div class="sg-flex-1">
                    <el-button type="" @click="handleCreate" icon="el-icon-plus">创建</el-button>
                </div>
            </div>
            <div class="sg-card-body sg-flexbox column sg-flex-1">
                <!-- 表单 -->
                <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel" @submit="handleSearch" @reset="handleSearch"></sg-base-form>
                <!-- 列表 -->
                <sg-data-view
                    v-bind="getTableAttrs"
                    ref="table"
                    :columns="tableColumns"
                    v-if="tableColumns.length"
                    :page-action-layout="[
                        {
                            key: 'export',
                            label: '导出',
                        },
                        {
                            key: 'exportAll',
                            label: '导出全部',
                        },
                    ]"
                ></sg-data-view>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { TableColumn, FormRef, TableRef, FormRow } from '@/sharegood-ui'
import { appStore } from '@/entry/devops/store/useStore'
import { UserService, PipelineService } from '@/entry/devops/api/index'
import { Pipeline } from '@/entry/devops/models'
import * as Utils from '@/scripts/utils'
import { OPERA_TYPE } from './components/EditDialog.vue'
import { useImagePreview } from '@/components/image-preview/hooks/useImagePreview'
import { userStore } from '@/entry/devops/store/useStore'
type UserOptionsType = ReturnType<typeof UserService.getUserOptions> extends Promise<infer T> ? T : never

@Component({
    name: 'DevopsApp',
    components: {},
})
export default class DevopsApp extends Vue {
    private UserOptions: UserOptionsType = []
    async created() {
        const result = await UserService.getUserOptions()

        this.UserOptions.push(...result)
    }
    /** 表单值 */
    formModel: Record<string, any> = {}

    @Ref('formRef')
    formRef!: FormRef

    @Ref('table')
    tableRef!: TableRef

    handleSearch(val?: any) {
        // 刷新当前页码数据
        if (val === null) {
            this.tableRef.onLoad()
        } else {
            this.tableRef.onLoad({ page: 1 })
        }
    }
    /** 表单属性 */
    getFormAttrs = {
        span: 6,
        size: 'small',
        labelWidth: '80px',
        fields: [
            {
                columns: [
                    {
                        span: 6,
                        tag: 'input',
                        name: 'row$',
                        itemAttrs: {
                            label: '关键字',
                        },
                        attrs: {
                            value: '',
                            isTriggerSubmit: true,
                            placeholder: '任意字段 支持模糊查询',
                            listeners: {
                                clear: () => {
                                    this.handleSearch()
                                },
                            },
                        },
                    },
                    {
                        span: 6,
                        tag: 'autocomplete',
                        name: 'frontendManagerA',
                        itemAttrs: {
                            label: 'A岗',
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
                                        options = options.filter(item => item.position!.indexOf('前端') > -1)
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
                        span: 6,
                        tag: 'autocomplete',
                        name: 'frontendManagerB',
                        itemAttrs: {
                            label: 'B岗',
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
                                        options = options.filter(item => item.position!.indexOf('前端') > -1)
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

                    // {
                    //     span: 6,
                    //     tag: 'input',
                    //     name: 'projectName',
                    //     itemAttrs: {
                    //         label: '项目名称',
                    //     },
                    //     attrs: {
                    //         value: '',
                    //         isTriggerSubmit: true,
                    //         placeholder: '请输入',
                    //         listeners: {
                    //             clear: () => {
                    //                 this.handleSearch()
                    //             },
                    //         },
                    //     },
                    // },
                    {
                        span: 6,
                        tag: 'select',
                        name: 'appType',
                        itemAttrs: {
                            label: '应用类型',
                        },
                        attrs: {
                            value: '',
                            options: () => {
                                return [
                                    {
                                        label: '管理端',
                                        value: '管理端',
                                    },

                                    {
                                        label: '浙里办',
                                        value: '浙里办',
                                    },
                                    {
                                        label: '官网',
                                        value: '官网',
                                    },
                                    {
                                        label: '大屏',
                                        value: '大屏',
                                    },
                                    {
                                        label: 'DataV',
                                        value: 'DataV',
                                    },
                                    {
                                        label: '小程序',
                                        value: '小程序',
                                    },
                                    {
                                        label: '组件',
                                        value: '组件',
                                    },
                                    {
                                        label: '移动端APP',
                                        value: '移动端',
                                    },
                                    {
                                        label: '其他',
                                        value: '其他',
                                    },
                                ]
                            },
                            onInput: () => {
                                this.handleSearch()
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
                            },
                            {
                                isReset: true,
                                text: '重置',
                                size: 'small',
                            },
                        ],
                    },
                ],
            },
        ] as FormRow[],
    }
    get tableColumns(): TableColumn[] {
        if (this.UserOptions.length) {
            return [
                {
                    align: 'left',
                    label: '应用id',
                    prop: 'id',
                    width: '200px',
                    showOverflowTooltip: false,
                    fixed: 'left',
                    render: (h, { row }: { row: any }) => {
                        return [
                            h(
                                'a',
                                {
                                    class: 'sg-link sg-flexbox',
                                    props: { type: 'text' },
                                    on: {
                                        click: async () => {
                                            window.open(row.config?.http_url_to_repo)
                                        },
                                    },
                                },
                                [
                                    h(
                                        'svg-icon',
                                        {
                                            class: 'sg-mr-1',
                                            props: {
                                                icon: 'mt-git',
                                            },
                                        },
                                        '',
                                    ),
                                    h(
                                        'div',
                                        {
                                            class: 'sg-flex-1',
                                            props: {},
                                        },
                                        row.id,
                                    ),
                                ],
                            ),
                        ]
                    },
                },
                {
                    align: 'left',
                    label: '应用名称',
                    prop: 'name',
                    width: '220px',
                    showOverflowTooltip: false,
                    fixed: 'left',
                    render: (h, { row }: { row: any }) => {
                        return [
                            h(
                                'a',
                                {
                                    class: 'sg-link',
                                    props: { type: 'text' },
                                    on: {
                                        click: async () => {
                                            appStore.setDevopsName(row.name)
                                            this.$router.push({
                                                path: `/devops/pipeline`,
                                                // query: {
                                                //     _: row.name,
                                                //     name: row.id,
                                                // },
                                            })
                                        },
                                    },
                                },
                                row.name,
                            ),
                        ]
                    },
                },
                {
                    align: 'left',
                    label: '前端A岗',
                    prop: 'frontendManagerA',
                    width: '80px',
                    fixed: 'left',

                    render: (h, { row }: { row: any }) => {
                        return [
                            h(
                                'el-button',
                                {
                                    props: { type: 'text' },
                                    on: {
                                        click: async () => {
                                            this.$router.push({
                                                path: '/devops/user',
                                                query: {
                                                    name: row.frontendManagerA,
                                                },
                                            })
                                        },
                                    },
                                },
                                row.frontendManagerA,
                            ),
                        ]
                    },
                },

                {
                    align: 'left',
                    label: '当前版本',
                    prop: 'version',
                    minWidth: '80px',
                },
                {
                    width: '80px',
                    align: 'left',
                    label: '创建人',
                    prop: 'createdUserId',
                    render: (h, { row }: { row: Pipeline }) => {
                        const target = this.UserOptions.find(item => item.username === row.createdUserId)
                        if (target) {
                            return target.label
                        }
                        return row.createdUserId
                    },
                },

                {
                    align: 'left',
                    label: '业务部门',
                    prop: 'business',
                    minWidth: '80px',
                },

                {
                    align: 'left',
                    label: '技术选型',
                    prop: 'technology',
                    minWidth: '80px',
                },

                {
                    align: 'left',
                    label: '应用类型',
                    prop: 'appType',
                    minWidth: '80px',
                },
                {
                    align: 'left',
                    label: '前端B岗',
                    prop: 'frontendManagerB',
                    minWidth: '80px',
                },
                {
                    align: 'left',
                    label: '研发经理',
                    prop: 'developmentManager',
                    minWidth: '80px',
                },
                {
                    align: 'left',
                    label: '产品经理',
                    prop: 'productManager',
                    minWidth: '80px',
                },
                {
                    align: 'left',
                    label: '交付经理',
                    prop: 'deliveryManager',
                    minWidth: '80px',
                },
                {
                    align: 'left',
                    label: '运维负责',
                    prop: 'devopsManager',
                    minWidth: '80px',
                },

                {
                    align: 'left',
                    label: '链接地址',
                    prop: 'uat_urls',
                    minWidth: '180px',
                    render: (h, { row }: { row: Pipeline }) => {
                        if (row.uat_urls) {
                            return JSON.stringify(row.uat_urls)
                        }
                        return ''
                    },
                },
                {
                    align: 'left',
                    label: '自定义环境',
                    prop: 'target_urls',
                    minWidth: '120px',
                    render: (h, { row }: { row: Pipeline }) => {
                        if (row.target_urls) {
                            return JSON.stringify(row.target_urls)
                        }
                        return ''
                    },
                },
                {
                    align: 'left',
                    label: 'git地址',
                    prop: 'uat_urls',
                    minWidth: '180px',
                    render: (h, { row }: { row: Pipeline }) => {
                        return [
                            h(
                                'el-button',
                                {
                                    props: { type: 'text' },
                                    on: {
                                        click: async () => {
                                            window.open(row.config?.http_url_to_repo)
                                        },
                                    },
                                },
                                row.config?.http_url_to_repo,
                            ),
                        ]
                    },
                },

                {
                    align: 'left',
                    label: '创建时间',
                    prop: 'createAt',
                    minWidth: '170px',
                    render: (h, { row }: { row: Pipeline }) => {
                        return Utils.dateFormat(row.createdAt, 'YYYY-MM-DD HH:mm:ss')
                    },
                },

                {
                    prop: 'action',
                    label: '操作',
                    width: '200px',
                    align: 'left',
                    fixed: 'right',
                    render: (h, { row }: { row: any }) => {
                        const { cover_urls = [] } = row
                        const urls = cover_urls.map((item: any) => item.url)
                        return [
                            h(
                                'el-button',
                                {
                                    props: { type: 'text', disabled: urls.length === 0 },
                                    on: {
                                        click: async () => {
                                            useImagePreview(urls)
                                        },
                                    },
                                },
                                `预览`,
                            ),
                            h(
                                'el-button',
                                {
                                    props: { type: 'text' },
                                    on: {
                                        click: async () => {
                                            await this.$modalDialog(() => import('./components/EditDialog.vue'), {
                                                id: row.id,
                                                name: row.name,
                                            })
                                            this.handleSearch(null)
                                        },
                                    },
                                },
                                `编辑`,
                            ),
                            // h(
                            //     'el-button',
                            //     {
                            //         props: { type: 'text' },
                            //         on: {
                            //             click: async () => {
                            //                 await this.$modalDialog(() => import('../pipeline/ChangeLogDialog/index.vue'), {
                            //                     id: row.id,
                            //                 })
                            //             },
                            //         },
                            //     },
                            //     `版本`,
                            // ),
                            h(
                                'el-button',
                                {
                                    props: {
                                        type: 'text',
                                    },
                                    on: {
                                        click: async () => {
                                            await this.$modalDialog(() => import(/* webpackChunkName: "PipelineUatUrlsDialog" */ '../pipeline/components/PipelineUatUrlsDialog/index.vue'), {
                                                id: row.id,
                                                name: row.name,
                                            })
                                            this.handleSearch(null)
                                        },
                                    },
                                },
                                '访问地址',
                            ),
                            h(
                                'el-button',
                                {
                                    class: 'sg-error-color',
                                    props: {
                                        type: 'text',
                                        // icon: 'el-icon-delete',
                                    },
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
        }

        return []
    }
    /* 列表属性 */
    getTableAttrs = {
        height: '100%',
        pageActionLayout: [
            {
                key: 'export',
                label: '导出',
            },
        ],

        load: async (params: any) => {
            const formRef = this.$refs.formRef as FormRef
            const state = formRef.getState()

            const { data } = await PipelineService.query({
                ...params,
                conditions: {
                    ...state,
                },
                sort: {
                    sortBy: 'createdAt',
                },
            })

            return {
                result: data.list,
                total: data.total,
            }
        },
    }
    async handleCreate() {
        await this.$modalDialog(() => import('./components/EditDialog.vue'), {
            operaType: OPERA_TYPE.CREATE,
        })
        this.handleSearch(null)
    }
    // 单独删除
    async handleDelete(row: Pipeline) {
        const id = row.id
        this.$confirm(`确认删除 ${row.name} 吗`).then(async () => {
            await PipelineService.remove(
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
            this.handleSearch(null)
        })
    }
}
</script>

<style lang="less" scoped>
::v-deep {
    .el-form-item--small.el-form-item {
        margin-bottom: 8px;
    }
    .el-table .cell {
        line-height: 1.2;
    }
}
</style>
