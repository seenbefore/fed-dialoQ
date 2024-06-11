<template>
    <section class="sg-card app-form">
        <div class="sg-card-body">
            <sg-base-form class="column" ref="formRef" :fields="FormView.fields" v-model="FormView.model" @submit="onSubmit" :span="24"></sg-base-form>

            <sg-data-view :columns="columns" :load="load" ref="tableRef" :page-action-layout="[]"></sg-data-view>
        </div>
    </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { FormRow, FormRef, TableColumn, TableLoad, TableRef } from '@/sharegood-ui'
import * as API from '@/entry/devops/api/index'
import { User } from '@/entry/devops/models'
interface FormViewModelProps {
    type?: boolean
    appConfig?: any[]
    [propName: string]: any
}
interface FormViewProps {
    loading: boolean
    model: FormViewModelProps
    fields: FormRow[]
}
@Component({
    name: 'DevopsAppEdit',
    components: {},
})
export default class DevopsAppEdit extends Vue {
    // @Prop() private title!:string
    // @Prop() private action!:string
    @Prop({
        default: () => {
            return {}
        },
    })
    meta!: FormViewModelProps
    @Prop({ default: false }) private isEdit!: boolean

    public $refs!: {
        formRef: FormRef
        tableRef: TableRef
    }
    private FormView: FormViewProps = {
        loading: false,
        model: {
            ...this.meta,
        },
        fields: [
            {
                columns: [
                    {
                        tag: 'select',
                        name: 'userIds',
                        itemAttrs: {
                            label: '添加用户',
                        },
                        attrs: {
                            filterable: true,
                            placeholder: '',
                            multiple: true,
                            options: async () => {
                                const result = await API.UserService.findAll()

                                return result.data.map(item => {
                                    return {
                                        lable: item.name,
                                        value: item.name,
                                    }
                                })
                            },
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        tag: 'slot',
                        itemAttrs: {
                            label: ' ',
                        },
                        render: h => {
                            return [
                                h(
                                    'el-button',
                                    {
                                        props: {
                                            type: 'primary',
                                            loading: this.FormView.loading,
                                        },
                                        on: {
                                            click: () => {
                                                this.onSubmit()
                                            },
                                        },
                                    },
                                    `添加`,
                                ),
                            ]
                        },
                    },
                ],
            },
        ],
    }
    private load: TableLoad = params => {
        return API.UserService.list({
            ...params,
        }).then(res => ({ result: res.data.list, total: res.data.total }))
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
            label: '用户',
            prop: 'name',
        },
        {
            align: 'left',
            label: '用户名',
            prop: 'username',
        },
        {
            align: 'left',
            label: '角色',
            prop: 'role',
            render: (h, { row }: { row: User }) => {
                // Maintainer Developer Owner
                const role$ = row.role === 'OWNER' ? '拥有者' : '开发者'
                return [
                    h(
                        'el-tag',
                        {
                            props: {
                                type: 'danger',
                            },
                        },
                        `${role$}`,
                    ),
                ]
            },
        },
        {
            align: 'center',
            label: '操作',
            prop: 'name',
            width: '200px',
            render: (h, { row }: { row: User }) => {
                return [
                    h(
                        'el-button',
                        {
                            class: ' sg-error-color',
                            props: {
                                type: 'danger',
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
    handleDelete(row: User) {}
    async onSubmit() {
        const { userIds } = this.FormView.model
        this.FormView.loading = true
        await API.PipelineService.updateMember({
            userIds,
        })
        this.FormView.loading = false
        this.$refs.tableRef.onLoad({
            page: 1,
        })
    }
    created() {}
    mounted() {}
}
</script>

<style lang="less" scoped></style>
