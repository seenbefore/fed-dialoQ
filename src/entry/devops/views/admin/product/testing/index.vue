<!-- 提测单 -->
<template>
    <PageWrapper class="AdminProductTesting " :title="null">
        <template #title>
            <el-button type="default" icon="el-icon-plus" @click="handleCreate">
                新增
            </el-button>
        </template>
        <sg-base-form ref="formRef" :tight="true" v-bind="getFormAttrs" v-model="formModel" @submit="handleSearch" @reset="handleSearch"></sg-base-form>
        <sg-data-view v-bind="getTableAttrs" ref="tableRef"></sg-data-view>
    </PageWrapper>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { MyMixins } from '@/entry/devops/mixins'
import { userStore } from '@/entry/devops/store/useStore'
import { FormColumn, FormRef, FormRow, TableColumn, TableRef, TableLoad, TableLoadValue } from '@/sharegood-ui'
import { dateFormat, clipboard, isAdmin } from '@/scripts/utils'
import { UserService, OpenService, ReleaseOrderService } from '@/entry/devops/api'
import moment from 'moment'
const API = {
    list: ReleaseOrderService.list,
    removeOne: ReleaseOrderService.removeOne,
}
import _ from 'lodash'

@Component({
    name: 'AdminProductTesting',
    components: {},
})
export default class AdminProductTesting extends MyMixins {
    mounted() {
        Object.assign(this.formModel, {
            '%title%': decodeURIComponent(this.title),
            version: decodeURIComponent(this.version),
        })
        this.handleSearch()
    }
    @Prop({ default: '' }) title!: string
    @Prop({ default: '' }) version!: string

    @Ref('formRef')
    formRef!: FormRef
    @Ref('tableRef')
    tableRef!: TableRef
    handleSearch(val = {}) {
        this.tableRef.onLoad({ page: 1 })
    }
    productUserOptions: any[] = []
    uedUserOptions: any[] = []
    async created() {
        this.getProductUserOptions()
        this.getUedUserOptions()
    }
    async getProductUserOptions() {
        const data = await UserService.getUserOptions()
        this.productUserOptions.push(...data)
    }
    async getUedUserOptions() {
        const data = await UserService.getUserOptions()
        this.uedUserOptions.push(...data)
    }

    formModel = {
        '%testerManager%': userStore.info?.position === '测试' ? userStore.info?.name : '',
        //'%title%': decodeURIComponent(this.title),
        //version: decodeURIComponent(this.version),
    }
    getFormAttrs = {
        span: 6,
        labelWidth: '80px',
        fields: [
            {
                columns: [
                    {
                        tag: 'input',
                        name: '%title%',
                        itemAttrs: {
                            label: '系统名称',
                        },
                        attrs: {
                            placeholder: '支持模糊查询',
                        },
                    },

                    {
                        tag: 'autocomplete',
                        name: '%frontManager%',
                        itemAttrs: {
                            label: '前端人员',
                        },
                        attrs: {
                            value: '',
                            'value-key': 'label',
                            debounce: 500,
                            'highlight-first-item': true,
                            'trigger-on-focus': true,
                            placeholder: '模糊查询',
                            fetchSuggestions: (queryString: string, cb: any) => {
                                let options = this.uedUserOptions || []
                                options = options.filter(item => item.position?.indexOf('前端') > -1)
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

                                if (!queryString) {
                                    return cb(options)
                                }
                                const results = queryString ? options.filter(this.createStateFilter(queryString)) : options
                                cb(results)
                            },
                            listeners: {
                                select: (val: any) => {
                                    this.search()
                                },
                            },
                        },
                    },

                    {
                        span: 6,
                        tag: 'date',
                        name: '[planTestDateStart,planTestDateEnd]',
                        itemAttrs: {
                            label: '计划提测',
                        },
                        attrs: {
                            value: [
                                moment()
                                    .startOf('month')
                                    .format('YYYY-MM-DD'),
                                moment()
                                    .endOf('month')
                                    .format('YYYY-MM-DD'),
                            ], // 必填
                            //placeholder: moment(new Date()).format('YYYY-MM-DD'),
                            type: 'daterange',
                            'value-format': 'yyyy-MM-dd',
                            format: 'yyyy-MM-dd',
                            'start-placeholder': '开始时间',
                            'end-placeholder': '结束时间',
                            onInput: () => {
                                this.search()
                            },
                        },
                    },
                    {
                        span: 6,
                        tag: 'date',
                        name: '[testDateStart,testDateEnd]',
                        itemAttrs: {
                            label: '实际提测',
                        },
                        attrs: {
                            value: [], // 必填
                            //placeholder: moment(new Date()).format('YYYY-MM-DD'),
                            type: 'daterange',
                            'value-format': 'yyyy-MM-dd',
                            format: 'yyyy-MM-dd',
                            'start-placeholder': '开始时间',
                            'end-placeholder': '结束时间',
                            onInput: () => {
                                this.search()
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
        // 表头吸顶
        tableHeaderSticky: {
            scrollDom: () => document.querySelector('.AdminProductTesting'),
        },
        auto: false,
        // height: '100%',
        //dataSourcePath: 'data',
        load: async (params: any = {}) => {
            const formRef: any = this.$refs.formRef
            const state = formRef.getState()
            params.conditions = {
                ...state,
            }
            const { data } = await API.list(params)
            return {
                result: data.data,
                total: data.total,
            }
        },
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
        columns: [
            {
                label: '序号',
                type: 'index',
                prop: 'index',
                fixed: 'left',
            },
            {
                align: 'left',
                label: '产品/系统名称',
                prop: 'title',
                width: '300px',
                showOverflowTooltip: false,
                fixed: 'left',
                render: (h, { row }) => {
                    return h(
                        'a',
                        {
                            class: 'sg-link ',
                            props: {
                                type: 'text',
                            },
                            on: {
                                click: () => {
                                    this.handleDetail(row)
                                },
                            },
                        },
                        [row.title],
                    )
                },
            },
            {
                align: 'left',
                label: '计划提测',
                prop: 'planTestDate',
                width: '120px',
            },
            {
                align: 'left',
                label: '实际提测',
                prop: 'testDate',
                width: '120px',
            },
            {
                align: 'left',
                label: '前端开发',
                prop: 'frontManager',
                width: '100px',
            },

            {
                align: 'left',
                label: '发布负责人',
                prop: 'deliveryManager',
                width: '100px',
            },
            {
                align: 'left',
                label: '测试人员',
                prop: 'testerManager',
                width: '100px',
            },
            {
                align: 'left',
                label: '后端开发',
                prop: 'developerManager',
                width: '100px',
            },

            {
                align: 'left',
                label: '修改时间',
                prop: 'updatedAt',
                minWidth: '170px',
                render: (h, { row }) => {
                    return dateFormat(new Date(row.updatedAt), 'YYYY-MM-DD HH:mm:ss')
                },
            },
            {
                align: 'left',
                label: '创建时间',
                prop: 'updatedAt',
                minWidth: '170px',
                render: (h, { row }) => {
                    return dateFormat(new Date(row.createdAt), 'YYYY-MM-DD HH:mm:ss')
                },
            },

            {
                align: 'center',
                label: '操作',
                prop: 'action',
                width: '150px',
                fixed: 'right',
                render: (h, { row }) => {
                    const { prototypeAddress = '', testSheetAddress = '' } = row
                    const name = userStore.info?.name || ''

                    return [
                        h('div', [
                            h(
                                'a',
                                {
                                    class: 'sg-link',
                                    props: {
                                        type: 'text',
                                    },
                                    on: {
                                        click: () => {
                                            prototypeAddress && window.open(prototypeAddress)
                                        },
                                    },
                                },
                                prototypeAddress ? '原型地址' : '',
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
                                            testSheetAddress && window.open(testSheetAddress)
                                        },
                                    },
                                },
                                prototypeAddress ? '提测单' : '',
                            ),
                        ]),
                    ]
                },
            },
        ] as TableColumn[],
    }
    createStateFilter(queryString: string) {
        return (state: any) => {
            return state.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1 || state.label.toLowerCase().indexOf(queryString.toLowerCase()) > -1
        }
    }
    timestampDifference(startTime: any, endTime: any) {
        // 这里取绝对值 保证结果为正
        let _timeInterval = Math.abs(endTime - startTime) + ''

        let hours: any = Math.floor(parseInt(_timeInterval) / 1000 / 3600)
        let minutes: any = Math.floor(parseInt(_timeInterval) / 1000 / 60)
        let seconds: any = Math.floor(parseInt(_timeInterval) / 1000)
        //取模处理 60进制
        minutes = minutes % 60
        seconds = seconds % 60
        // 判断是否为空
        let str = ''
        hours = hours ? hours + '小时' : ''
        minutes = minutes ? minutes + '分' : ''
        //seconds = seconds ? seconds + '秒' : ''
        str = hours + minutes
        return str
    }
    async getUserPhone(name: string) {
        const res = await UserService.findOne({
            name: name,
        })
        const user = res.data
        const phone = user.phone || user.name
        return phone
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

    handleUpdate(row: any) {
        this.$push({
            path: `/admin/product/release/save`,
            query: {
                id: row.id,
                _: '发布单编辑',
            },
        })
    }
    handleVerify(row: any) {
        this.$push({
            path: `/admin/product/release/save`,
            query: {
                id: row.id,
                _: '发布验收',
                action: 'verify',
            },
        })
    }
    handleDetail(row: any) {
        this.$push({
            path: `/admin/product/release/save`,
            query: {
                id: row.id,
                _: '详情-' + row.title,
                action: 'detail',
            },
        })
    }
    handleCreate() {
        this.$push({
            path: '/admin/product/release/save',
            query: {
                _: '发布单新增',
            },
        })
    }
    search() {
        this.tableRef.onLoad({ page: 1 })
    }
}
</script>

<style lang="less" scoped></style>
