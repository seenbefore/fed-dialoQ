<template>
    <PageWrapper class="page-devops-user column">
        <template #title>
            <el-button type="" @click="handleCreate" icon="el-icon-plus" v-if="isAdmin">
                新增
            </el-button>
        </template>
        <sg-base-form class="column" ref="formRef" :fields="fields" v-model="model" @submit="onSubmit" @reset="onReset" :span="6"></sg-base-form>
        <sg-data-view class="sg-h-100 sg-flex-1" :columns="columns" :load="load" height="100%" ref="tableRef" :page-action-layout="[]"></sg-data-view>
    </PageWrapper>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import * as API from '@/entry/devops/api/index'
import { User } from '@/entry/devops/models'
import * as Utils from '@/scripts/utils'
import PageWrapper from '@/components/PageWrapper/index.vue'
import { FormColumn, TableColumn, TableRef, FormRef, TableLoad, FormRow } from '@/sharegood-ui'
import { isAdmin } from '@/scripts/utils'
import { userStore } from '@/entry/devops/store/useStore'
@Component({
    name: 'DevopsUser',
    components: {
        PageWrapper,
    },
})
export default class DevopsUser extends Vue {
    get isAdmin() {
        return isAdmin(userStore.info)
    }
    @Prop({ default: '' }) name!: string
    private model: any = {}
    private fields: FormColumn[] = [
        {
            tag: 'input',
            name: '%name%',
            itemAttrs: {
                label: '姓名',
            },
            attrs: {
                value: this.name,
                placeholder: '支持模糊查询',
            },
        },
        {
            tag: 'input',
            name: '%username%',
            itemAttrs: {
                label: '用户名',
            },
            attrs: {
                placeholder: '支持模糊查询',
            },
        },
        {
            tag: 'select',
            name: 'position',
            itemAttrs: {
                label: '岗位',
            },
            attrs: {
                // multiple: true,
                // value: [],
                // 'collapse-tags': true,
                options: [
                    {
                        label: '前端开发',
                        value: '前端开发',
                    },
                    {
                        label: '后端开发',
                        value: '后端开发',
                    },
                    {
                        label: '测试',
                        value: '测试',
                    },
                    {
                        label: '产品经理',
                        value: '产品经理',
                    },
                    {
                        label: '设计师',
                        value: '设计师',
                    },
                    {
                        label: '运维',
                        value: '运维',
                    },
                    {
                        label: '其他',
                        value: '其他',
                    },
                ],
            },
        },
        {
            tag: 'action',
            buttons: [
                {
                    isSubmit: true,
                    type: 'primary',
                    text: '查询',
                },
                {
                    type: '',
                    isReset: true,
                    text: '重置',
                },
            ],
        },
    ]
    private load: TableLoad = params => {
        console.log(this.model)
        return API.UserService.list({
            ...params,
            conditions: {
                ...this.model,
            },
        }).then(res => ({ result: res.data.data, total: res.data.total }))
    }
    public $refs!: {
        formRef: FormRef
        tableRef: TableRef
    }

    private columns: TableColumn[] = [
        {
            align: 'left',
            label: '序号',
            type: 'index',
            prop: 'index',
        },
        {
            align: 'left',
            label: '用户名',
            prop: 'username',
            width: '150px',
        },
        {
            align: 'left',
            label: '姓名',
            prop: 'name',
            width: '150px',
        },
        {
            align: 'left',
            label: '岗位',
            prop: 'position',
            width: '120px',
        },
        {
            align: 'left',
            label: '电话',
            prop: 'phone',
            width: '150px',
        },
        {
            align: 'left',
            label: '邮箱',
            prop: 'email',
            minWidth: '240px',
        },
        {
            align: 'left',
            label: '来源',
            prop: 'from',
            minWidth: '80px',
            render: (h, { row }) => {
                const { token } = row
                if (token.length === 64) {
                    return h('el-tag', {}, `gitlab`)
                }
                if (row.from) {
                    return h('el-tag', {}, row.from)
                }

                return h('el-tag', {}, `注册`)
            },
        },

        {
            align: 'left',
            label: '创建时间',
            prop: 'createdAt',
            width: '200px',
            render: (h, { row }: { row: User }) => {
                return Utils.dateFormat(row.createdAt!, 'YYYY-MM-DD HH:mm:ss')
            },
        },
        {
            align: 'left',
            label: 'token',
            prop: 'token',
            minWidth: '200px',
        },
        {
            align: 'center',
            label: '操作',
            prop: 'action',
            width: '120px',
            fixed: 'right',
            render: (h, { row }: { row: User }) => {
                return [
                    h(
                        'el-button',
                        {
                            props: {
                                type: 'text',
                            },
                            on: {
                                click: () => {
                                    this.handleUpdate(row)
                                },
                            },
                        },
                        `修改`,
                    ),
                    h(
                        'el-button',
                        {
                            class: 'sg-error-color',
                            props: {
                                type: 'text',
                            },
                            on: {
                                click: () => {
                                    this.handleDelete(row)
                                },
                            },
                        },
                        `删除`,
                    ),
                ]
            },
        },
    ]
    onSubmit() {
        this.$refs.tableRef.onLoad({
            page: 1,
        })
    }
    onReset() {
        this.$refs.tableRef.onLoad({
            page: 1,
        })
    }
    async handleDelete(row: User) {
        const { username } = row
        this.$confirm('确认删除吗').then(async () => {
            await API.UserService.remove(
                {
                    username,
                },
                // {
                //     exShowLoading: true,
                //     exShowLoadingOption: {
                //         target: '#table',
                //         text: '删除中',
                //     },
                // },
            )
            this.$refs.tableRef.onLoad()
        })
    }
    handleUpdate(row: User) {
        this.$modalDialog(() => import(/* webpackChunkName: "UserEditDialog" */ '@/entry/devops/components/UserEditDialog/index.vue'), {
            isEdit: true,
            id: row.username,
        }).then(() => {
            this.$refs.tableRef.onLoad()
        })
    }
    handleCreate() {
        this.$modalDialog(() => import(/* webpackChunkName: "UserEditDialog" */ '@/entry/devops/components/UserEditDialog/index.vue'), {}).then(() => {
            this.$refs.tableRef.onLoad()
        })
    }
    created() {}
    mounted() {}
}
</script>

<style lang="less" scoped></style>
