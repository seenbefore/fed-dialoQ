<template>
    <div class="sg-page DevopsArtifact sg-p-0 column">
        <section class="sg-card sg-flexbox column sg-flex-1">
            <div class="sg-card-header">
                <div class="sg-flex-1">
                    <el-button type="" @click="handleCreate" icon="el-icon-plus">创建</el-button>
                </div>
            </div>
            <div class="sg-card-body sg-flexbox column sg-flex-1">
                <sg-base-form class="column tight" ref="formRef" :fields="formFields" v-model="formModel" @submit="handleSearch" @reset="handleSearch" :span="8"></sg-base-form>
                <sg-data-view id="table" :columns="columns" :load="load" ref="tableRef" height="100%" :page-action-layout="[]"></sg-data-view>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ArtifactService } from '@/entry/devops/api'
import { Artifact } from '@/entry/devops/models'
import * as Utils from '@/scripts/utils'
import { isAdmin } from '@/scripts/utils'
import { userStore } from '@/entry/devops/store/useStore'
import { FormColumn, TableColumn, TableRef, FormRef, TableLoad } from '@/sharegood-ui'
import { UserService } from '@/entry/devops/api/index'
import _ from 'lodash'
type UserOptionsType = ReturnType<typeof UserService.getUserOptions> extends Promise<infer T> ? T : never
interface FormModel {
    target?: string
}
@Component({
    name: 'DevopsArtifact',
    components: {},
})
export default class DevopsArtifact extends Vue {
    private UserOptions: UserOptionsType = []
    async created() {
        const result = await UserService.getUserOptions()

        this.UserOptions.push(...result)
    }
    get isAdmin() {
        return isAdmin(userStore.info)
    }
    public $refs!: {
        formRef: FormRef
        tableRef: TableRef
    }
    load(params: any) {
        const model = this.formModel
        return ArtifactService.list({
            ...params,
            conditions: {
                ...model,
            },
            sort: {
                sortBy: 'createdAt',
                sortValue: 'DESC',
            },
        }).then(res => ({ result: res.data.data, total: res.data.total }))
    }

    private formModel: FormModel = {}
    private formFields = [
        {
            tag: 'input',
            name: 'row$',
            itemAttrs: {
                label: '关键字',
            },
            attrs: {
                placeholder: '全文模糊查询',
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
    ] as FormColumn[]
    get columns(): TableColumn[] {
        if (this.UserOptions.length) {
            return [
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
                    width: '150px',
                    showOverflowTooltip: false,

                    render: (h, { row }: { row: Artifact }) => {
                        const { name } = row

                        return [
                            h(
                                'a',
                                {
                                    class: 'sg-link',
                                    attrs: {
                                        href: 'javascript:void(0)',
                                    },
                                },
                                name,
                            ),
                        ]
                    },
                },

                {
                    align: 'left',
                    label: '下载地址',
                    prop: 'createdUserId',
                    width: '220px',
                    showOverflowTooltip: false,
                    render: (h, { row }) => {
                        const name = row.name
                        return `http://192.168.1.147/artifact/zip/${name}/snapshot.zip`
                    },
                },
                {
                    align: 'left',
                    label: '创建人',
                    prop: 'createdUserId',
                    width: '110px',

                    render: (h, { row }) => {
                        return row.createdUserName
                    },
                },

                {
                    align: 'left',
                    label: '流水线',
                    prop: 'note',
                    minWidth: '400px',
                    showOverflowTooltip: false,
                    render: (h, { row }: { row: Artifact }) => {
                        const pipelines = row.pipelines
                        const html = pipelines.map(item =>
                            h(
                                'a',
                                {
                                    class: 'sg-link',
                                    attrs: {
                                        href: 'javascript:void(0)',
                                    },
                                    on: {
                                        click: () => {
                                            this.run(item)
                                        },
                                    },
                                },
                                item.name || item.id,
                            ),
                        )

                        return [...html]
                    },
                },
                {
                    align: 'left',
                    label: '通知人',
                    prop: 'note',
                    width: '160px',
                    showOverflowTooltip: false,
                    render: (h, { row }: { row: Artifact }) => {
                        const atUsers = row.atUsers || []
                        // const users = this.UserOptions.filter(item => atUsers.includes(item.phone))
                        // const names = users.map(item => item.name)

                        return [h('span', {}, atUsers.join('、'))]
                    },
                },
                {
                    width: '170px',
                    align: 'left',
                    label: '修改时间',
                    prop: 'updatedAt',
                    // sortable: 'custom',
                    // 'sort-orders': ['ascending', 'descending'],
                    render: (h, { row }: { row: Artifact }) => {
                        if (row.updatedAt) {
                            return Utils.dateFormat(row.updatedAt, 'YYYY-MM-DD HH:mm:ss')
                        }
                        return '-'
                    },
                },

                {
                    width: '170px',
                    align: 'left',
                    label: '创建时间',
                    prop: 'createAt',
                    // sortable: 'custom',
                    // 'sort-orders': ['ascending', 'descending'],
                    render: (h, { row }: { row: Artifact }) => {
                        if (row.createdAt) {
                            return Utils.dateFormat(row.createdAt, 'YYYY-MM-DD HH:mm:ss')
                        }
                        return '-'
                    },
                },

                {
                    align: 'center',
                    label: '操作',
                    prop: 'name',
                    width: '150px',
                    fixed: 'right',
                    render: (h, { row }: { row: Artifact }) => {
                        const loading = (row as any).loading ?? false
                        return [
                            h(
                                'el-button',
                                {
                                    props: {
                                        type: 'text',
                                        loading: loading,
                                        //icon: 'el-icon-edit',
                                    },
                                    on: {
                                        click: async () => {
                                            try {
                                                this.$set(row, 'loading', true)
                                                const data = await this.handleZip(row)
                                                this.$alert(`${data}`)
                                            } catch (error) {
                                                console.log(error)
                                            } finally {
                                                this.$set(row, 'loading', false)
                                            }
                                        },
                                    },
                                },
                                '打包',
                            ),
                            h(
                                'el-button',
                                {
                                    props: {
                                        type: 'text',
                                        //icon: 'el-icon-edit',
                                    },
                                    on: {
                                        click: () => {
                                            this.handleEdit(row)
                                        },
                                    },
                                },
                                '修改',
                            ),
                            h(
                                'el-button',
                                {
                                    class: 'sg-error-color',
                                    props: {
                                        type: 'text',
                                        //icon: 'el-icon-delete',
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

    // 构建
    run(row: any) {
        const id = row.id
        this.$modalDialog(() => import('@/entry/devops/views/devops/pipeline/components/PreDeployDialog/index.vue'), {
            redirect: false,
            target: row.target,
            meta: {
                id,
            },
        }).then(() => {
            this.handleSearch()
        })
    }
    async handleSearch() {
        await this.$refs.tableRef.onLoad({ page: 1 })
    }
    // 单独删除
    handleDelete(row: Artifact) {
        const id = row.id
        this.$confirm('确认删除吗').then(async () => {
            await ArtifactService.remove(
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
            const table: any = this.$refs.tableRef.$refs.table
            table.clearSelection()
            this.$refs.tableRef.onLoad()
            this.$message.success(`删除成功`)
        })
    }
    async handleZip(row: Artifact) {
        const { id } = row
        const { data } = await ArtifactService.zip({
            id,
        })
        this.$message.success(`打包成功`)

        return data
    }
    async handleCreate() {
        this.$modalDialog(() => import('./components/FormDialog/index.vue'), {})
            .then(async () => {
                await this.handleSearch()
            })
            .catch((err: any) => {})
    }
    handleEdit(row: Artifact) {
        const { id } = row
        this.$modalDialog(() => import('./components/FormDialog/index.vue'), {
            id,
            isEdit: true,
        })
            .then(async () => {
                await this.handleSearch()
            })
            .catch((err: any) => {
                console.log(err)
            })
    }
}
</script>

<style lang="less" scoped></style>
