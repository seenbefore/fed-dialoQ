<template>
    <PageWrapper class="AdminProductList ">
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
import { dateFormat, clipboard } from '@/scripts/utils'
import { ProductService, UserService, OpenService } from '@/entry/devops/api'

const API = {
    list: ProductService.list,
    removeOne: ProductService.removeOne,
}
import _ from 'lodash'

@Component({
    name: 'AdminProductList',
    components: {},
})
export default class AdminProductList extends MyMixins {
    mounted() {
        Object.assign(this.formModel, {
            author_id: this.author_id,
            '%title%': decodeURIComponent(this.title),
            version: decodeURIComponent(this.version),
        })
        this.handleSearch()
    }
    @Prop({ default: '' }) title!: string
    @Prop({ default: '' }) version!: string
    @Prop() author_id!: string
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
        author_id: this.author_id,
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
                            label: '标题名称',
                        },
                        attrs: {
                            placeholder: '支持模糊查询',
                        },
                    },
                    {
                        tag: 'input',
                        name: 'version',
                        itemAttrs: {
                            label: '版本',
                        },
                        attrs: {
                            placeholder: '请输入',
                        },
                    },

                    {
                        tag: 'autocomplete',
                        name: '%author%',
                        itemAttrs: {
                            label: '产品',
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
                        visible: !this.author_id,
                    },
                    {
                        tag: 'autocomplete',
                        name: '%ued_author%',
                        itemAttrs: {
                            label: '设计',
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
                        visible: !this.author_id,
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
            scrollDom: () => document.querySelector('.AdminProductList'),
        },
        auto: false,
        // height: '100%',
        dataSourcePath: 'data',
        load: async (params: any = {}) => {
            const formRef: any = this.$refs.formRef
            const state = formRef.getState()
            params.conditions = {
                ...state,
            }
            return await API.list(params)
        },
        columns: [
            // {
            //     label: '序号',
            //     type: 'index',
            //     prop: 'index',
            //     fixed: 'left',
            // },
            {
                align: 'left',
                label: '标题',
                prop: 'title',
                width: '250px',
                fixed: 'left',
                render: (h, { row }) => {
                    return [
                        h('div', [
                            h(
                                'router-link',
                                {
                                    class: 'sg-link',
                                    props: {
                                        to: {
                                            path: `/product/detail/${row.uuid}?title=${encodeURIComponent(row.title)}`,
                                        },
                                    },
                                    attrs: {
                                        target: '_blank',
                                    },
                                },
                                row.title,
                            ),
                        ]),
                        h('div', [
                            h(
                                'el-tag',
                                {
                                    props: {
                                        type: 'danger',
                                    },
                                },
                                row.version,
                            ),
                            // h(
                            //     'el-tag',
                            //     {
                            //         class: 'sg-ml-2',
                            //         props: {
                            //             type: 'warning',
                            //         },
                            //     },
                            //     `产品-${row.author}`,
                            // ),
                            row.ued_author
                                ? h(
                                      'el-tag',
                                      {
                                          class: 'sg-ml-2',
                                          props: {
                                              type: 'success',
                                          },
                                      },
                                      `设计-${row.ued_author}`,
                                  )
                                : [],
                        ]),
                    ]
                },
            },

            {
                align: 'left',
                label: '原型地址',

                prop: 'url',
                minWidth: '120px',
                render: (h, { row }) => {
                    return h(
                        'a',
                        {
                            class: 'sg-link',
                            attrs: {
                                href: row.url,
                                target: '_blank',
                            },
                        },
                        '原型-' + row.author,
                    )
                },
            },

            {
                align: 'left',
                label: '设计稿',
                prop: 'ued_urls',
                minWidth: '250px',

                render: (h, { row }) => {
                    let { ued_urls = [], ued_url = '' } = row
                    const ued_type = row.ued_type
                    ued_urls = ued_urls || []

                    if ('url' === ued_type) {
                        return h(
                            'a',
                            {
                                style: 'display:block;overflow: hidden;text-overflow:ellipsis;height:18px;line-height:18px;',
                                class: 'sg-link',
                                attrs: {
                                    href: ued_url,
                                    target: '_blank',
                                },
                            },
                            ued_url,
                        )
                    } else {
                        return ued_urls.map((item: any, index: any) => {
                            const { response = '' } = item
                            let ued_name = response.split('/ued/')[1]
                            let name = ued_name.split('/index.html')[0]
                            return h('span', {}, [
                                index > 0 ? h('span', '、') : [],
                                h(
                                    'a',
                                    {
                                        class: 'sg-link',
                                        attrs: {
                                            href: response,
                                            target: '_blank',
                                        },
                                    },
                                    name || ued_name,
                                ),
                            ])
                        })
                    }
                },
            },
            {
                align: 'left',
                label: '设计稿图标',
                prop: 'ued_urls',
                minWidth: '240px',
                showOverflowTooltip: false,
                render: (h, { row }) => {
                    const ued_icons = row.ued_icons || []
                    return ued_icons.map((item: any, index: any) => {
                        const { response = '', name } = item
                        return h('span', {}, [
                            index > 0 ? h('span', '、') : [],
                            h(
                                'a',
                                {
                                    class: 'sg-link',
                                    attrs: {
                                        href: response,
                                    },
                                },
                                name,
                            ),
                        ])
                    })
                },
            },

            {
                align: 'left',
                label: '修改时间',
                prop: 'updatedAt',
                width: '170px',
                render: (h, { row }) => {
                    return dateFormat(new Date(row.updatedAt), 'YYYY-MM-DD HH:mm:ss')
                },
            },

            {
                align: 'left',
                label: '操作',
                prop: 'action',
                width: '210px',
                fixed: 'right',
                render: (h, { row }) => {
                    const author_id = row.author_id
                    const username = userStore.info.username

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
                                            this.handleUpdate(row)
                                        },
                                    },
                                },
                                '原型编辑',
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
                                            this.handleUpdateUed(row)
                                        },
                                    },
                                },
                                '设计编辑',
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
                                            const url = location.origin + `/product/detail/${row.uuid}?title=${encodeURIComponent(row.title)}`
                                            const result = clipboard(url)
                                            if (result) {
                                                this.$message.success('复制成功')
                                            }
                                        },
                                    },
                                    // directives: [
                                    //     {
                                    //         name: 'copy',
                                    //         value: location.origin + `/product/detail?title=${row.title}&version=${row.version}&affix=0`,
                                    //     },
                                    // ],
                                },
                                '复制链接',
                            ),
                        ]),
                        h('div', [
                            h(
                                'a',
                                {
                                    class: 'sg-link',
                                    attrs: {
                                        href: 'javascript:void(0)',
                                    },
                                    props: {
                                        size: 'mini',
                                        type: 'text',
                                    },
                                    on: {
                                        click: () => {
                                            this.handleLaunchUIReview(row)
                                        },
                                    },
                                },
                                '发起走查',
                            ),
                            h(
                                'a',
                                {
                                    class: 'sg-link',
                                    attrs: {
                                        href: 'javascript:void(0)',
                                    },
                                    props: {
                                        size: 'mini',
                                        type: 'text',
                                    },
                                    on: {
                                        click: () => {
                                            this.handleUIReview(row)
                                        },
                                    },
                                },
                                '设计验收',
                            ),

                            h(
                                'a',
                                {
                                    class: username === author_id ? 'sg-link sg-error-color' : 'sg-hide',
                                    props: {
                                        type: 'text',
                                    },
                                    on: {
                                        click: () => {
                                            this.handleDelete(row)
                                        },
                                    },
                                },
                                '忍痛删除',
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
    // 验收UI
    handleUIReview(row: any) {
        this.$go({
            path: '/admin/ui_review',
            query: {
                product_version: row.version,
                product_title: row.title,
            },
        })
    }
    async getUserPhone(name: string) {
        const res = await UserService.findOne({
            name: name,
        })
        const user = res.data
        const phone = user.phone || user.name
        return phone
    }
    // 发起走查
    handleLaunchUIReview(row: any) {
        const { author } = row

        // if (!row.ued_author) {
        //     this.$message.error('没有设计稿，无法发起走查')
        //     return
        // }

        this.$modalDialog(() => import(/* webpackChunkName: "UedReviewDialog" */ '../components/UedReviewDialog/index.vue'), {
            meta: {
                ...row,
            },
        })
            .then(async (data: any) => {
                try {
                    let router = this.$router.resolve({
                        path: '/admin/ui_review',
                        query: {
                            reviewerName: data.reviewerName,
                            product_version: data.product_version,
                            product_title: data.product_title,
                        },
                    })
                    // 产品经理手机号码
                    //const product_phone = await this.getUserPhone(author)
                    // 设计手机号码
                    const ued_phone = await this.getUserPhone(data.reviewerName)
                    const developer_phone = await this.getUserPhone(data.developerName)
                    const url = `${location.origin}${router.href}`
                    const message = `
                    \n**项目**: ${data.product_title}\n\n**详情**: [${url}](${url})\n\n**标题**: ${data.title}\n\n**产品**: ${author}\n\n**检查人**: ${data.reviewerName}\n\n**内容**\n\n${data.description}\n\n
                    `
                    await OpenService.notify({
                        // UI走查通知群机器人
                        url: 'https://oapi.dingtalk.com/robot/send?access_token=1b173b37b57a5693f220e1375ee1bc4d0471a6a7b99bc233f3610d50cdb86b2e',
                        title: `${data.developerName}发起了UI走查`,
                        data: message,
                        at_mobiles: [ued_phone],
                    })
                    await OpenService.notifyByQiWei({
                        to: [ued_phone, developer_phone],
                        title: `${data.developerName}发起了UI走查`,
                        content: [`项目: ${data.product_title}`, `标题:  ${data.title}`, `产品: ${author}`, `检查人: ${data.reviewerName}`, `内容: ${data.description}`],
                        urlName: url,
                        url,
                    })
                    this.$message.success(`已成功通知 ${data.reviewerName}`)
                    this.$go({
                        path: '/admin/ui_review',
                        query: {
                            reviewerName: data.reviewerName,
                            product_version: data.product_version,
                            product_title: data.product_title,
                        },
                    })
                } catch (error) {
                    console.log(error)
                }
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
    handleUpdateUed(row: any) {
        this.$modalDialog(() => import(/* webpackChunkName: "UedEditDialog" */ './components/UedEditDialog/index.vue'), {
            id: row.id,
            isEdit: true,
        })
            .then(async () => {
                this.tableRef.onLoad({ page: 1 })
            })
            .catch((err: any) => {
                console.log(err)
            })
    }
    handleUpdate(row: any) {
        this.$modalDialog(() => import(/* webpackChunkName: "ProductEditDialog" */ './components/ProductEditDialog/index.vue'), {
            id: row.id,
            isEdit: true,
        })
            .then(async () => {
                this.tableRef.onLoad({ page: 1 })
            })
            .catch((err: any) => {
                console.log(err)
            })
    }
    handleCreate() {
        this.$modalDialog(() => import(/* webpackChunkName: "ProductEditDialog" */ './components/ProductEditDialog/index.vue'), {
            isEdit: false,
        })
            .then(async () => {
                this.tableRef.onLoad({ page: 1 })
            })
            .catch((err: any) => {
                console.log(err)
            })
    }
    search() {
        this.tableRef.onLoad({ page: 1 })
    }
}
</script>

<style lang="less" scoped>
.AdminProductList ::v-deep {
    .one {
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
    }

    .el-tag {
        height: 20px;
        line-height: 18px;
    }
    .ued_urls {
        line-height: 1.1;
        white-space: pre-wrap;
    }
}
</style>
