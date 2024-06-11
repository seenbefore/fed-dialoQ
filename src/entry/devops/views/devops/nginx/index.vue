<template>
    <div class="sg-page page-devops-nginx sg-p-0 column">
        <section class="sg-card sg-flexbox column sg-flex-1">
            <div class="sg-card-header">
                <div class="sg-flex-1">
                    <el-button type="" @click="handleCreate" icon="el-icon-plus">创建nginx配置</el-button>
                    <el-button type="danger" @click="handleInit" class="sg-ml-3" v-if="isAdmin">一键初始化vhost</el-button>
                    <el-switch
                        v-model="isOn"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-text="已开启"
                        inactive-text="未开启"
                        @change="handleNginxSwitch"
                        class="sg-ml-3"
                        v-if="isAdmin"
                    ></el-switch>
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
import * as API from '@/entry/devops/api/index'
import { NginxConf, Pipeline } from '@/entry/devops/models'
import * as Utils from '@/scripts/utils'
import Polling from '@/scripts/utils/polling'
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
    name: 'DevopsNginx',
    components: {},
})
export default class DevopsNginx extends Vue {
    private UserOptions: UserOptionsType = []
    async created() {
        this.handleNginxStatus()
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
        return API.NginxService.list({
            ...params,
            conditions: {
                ...model,
            },
        }).then(res => ({ result: res.data.list, total: res.data.total }))
    }
    private nginx = {
        isOn: false,
        loading: true,
    }
    private isOn = false
    private polling!: Polling
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
            tag: 'input',
            name: 'port',
            itemAttrs: {
                label: '端口',
            },
            attrs: {
                placeholder: '比如 80',
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
                // {
                //     label: '序号',
                //     type: 'index',
                //     prop: 'index',
                // },
                {
                    align: 'left',
                    label: '配置名称',
                    prop: 'name',
                    width: '300px',
                    fixed: 'left',
                    render: (h, { row }: { row: NginxConf }) => {
                        const { name, filename } = row

                        return [
                            h(
                                'a',
                                {
                                    class: 'sg-link',
                                    attrs: {
                                        title: filename,
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
                    label: '端口',
                    prop: 'port',
                    width: '80px',
                },
                {
                    align: 'left',
                    label: '最近更新',
                    prop: 'createdUserId',
                    width: '110px',
                    render: (h, { row }) => {
                        const target = this.UserOptions.find(item => item.username === row.createdUserId)
                        if (row.updatedUser) {
                            return row.updatedUser
                        }
                        if (target) {
                            return target.label
                        }
                        return row.createdUserId
                    },
                },

                {
                    align: 'left',
                    label: '备注',
                    prop: 'note',
                    minWidth: '200px',
                },
                {
                    align: 'left',
                    label: '服务器地址',
                    prop: '服务器地址',
                    width: '180px',
                    render: (h, { row }: { row: NginxConf }) => {
                        const { port } = row
                        const url = location.origin.replace(location.port, port + ' ')
                        return [
                            h(
                                'a',
                                {
                                    class: 'sg-link',
                                    attrs: {
                                        target: '_blank',
                                        href: url,
                                    },
                                },
                                url,
                            ),
                        ]
                    },
                },
                {
                    align: 'left',
                    label: '服务器文件名',
                    prop: 'filename',
                    minWidth: '220px',
                },
                {
                    width: '170px',
                    align: 'left',
                    label: '创建时间',
                    prop: 'createAt',
                    // sortable: 'custom',
                    // 'sort-orders': ['ascending', 'descending'],
                    render: (h, { row }: { row: NginxConf }) => {
                        if (row.createdAt) {
                            return Utils.dateFormat(row.createdAt, 'YYYY-MM-DD HH:mm:ss')
                        }
                        return '-'
                    },
                },
                {
                    width: '170px',
                    align: 'left',
                    label: '修改时间',
                    prop: 'updatedAt',
                    // sortable: 'custom',
                    // 'sort-orders': ['ascending', 'descending'],
                    render: (h, { row }: { row: NginxConf }) => {
                        if (row.updatedAt) {
                            return Utils.dateFormat(row.updatedAt, 'YYYY-MM-DD HH:mm:ss')
                        }
                        return '-'
                    },
                },
                {
                    align: 'left',
                    label: '创建人',
                    prop: 'createdUserId',
                    width: '110px',
                    render: (h, { row }) => {
                        const target = this.UserOptions.find(item => item.username === row.createdUserId)

                        if (target) {
                            return target.label
                        }
                        return row.createdUserId
                    },
                },
                {
                    align: 'center',
                    label: '操作',
                    prop: 'name',
                    width: '150px',
                    fixed: 'right',
                    render: (h, { row }: { row: NginxConf }) => {
                        const { on } = row
                        return [
                            h(
                                'el-button',
                                {
                                    props: {
                                        type: 'text',
                                        icon: 'el-icon-edit',
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
                                        icon: 'el-icon-delete',
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
    async getPort() {
        const { data } = await API.NginxService.list({ pageSize: 1000 })
        const list = data.list || []

        list.sort((a, b) => Number(b.port) - Number(a.port))

        return Number(list[0]['port']) + 1
    }
    async handleSearch() {
        await this.$refs.tableRef.onLoad({ page: 1 })
    }
    // 单独删除
    handleDelete(row: NginxConf) {
        const id = row.id
        this.$confirm('确认删除吗').then(async () => {
            await API.NginxService.remove(
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
    async handleCreate() {
        const port = await this.getPort()

        this.$modalDialog(() => import(/* webpackChunkName: "NginxEditDialog" */ './components/NginxEditDialog/index.vue'), {
            port,
            isEdit: false,
        })
            .then(async () => {
                this.handleSearch()
                if (this.isOn) {
                    await API.NginxService.reload()
                    this.$message.success('服务已生效')
                } else {
                    this.$message.warning('请启动nginx')
                }
            })
            .catch((err: any) => {
                console.log(err)
            })
    }
    handleEdit(row: NginxConf) {
        const { id } = row
        this.$modalDialog(() => import(/* webpackChunkName: "NginxEditDialog" */ './components/NginxEditDialog/index.vue'), {
            id,
            isEdit: true,
        })
            .then(async () => {
                await this.handleSearch()
                if (this.isOn) {
                    await API.NginxService.reload()
                    this.$message.success('服务已生效')
                } else {
                    this.$message.warning('请启动nginx')
                }
            })
            .catch((err: any) => {
                console.log(err)
                this.nginx.loading = false
            })
    }
    async handleNginxSwitch() {
        try {
            this.nginx.loading = true
            if (!this.isOn) {
                await API.NginxService.stop()
                this.nginx.isOn = false
            } else {
                await API.NginxService.start()
                this.nginx.isOn = true
            }

            this.nginx.loading = false
        } catch (err) {
            this.nginx.loading = false
        }
    }
    //
    async handleNginxStatus() {
        try {
            this.nginx.loading = true
            const result = await API.NginxService.status()
            this.isOn = result.data
            this.nginx.loading = false
        } catch (err) {
            this.nginx.loading = false
        }
    }
    // 一键初始化
    async handleInit() {
        this.$modalDialog(() => import(/* webpackChunkName: "NginxVhostDialog" */ './components/NginxVhostDialog/index.vue'), {})
            .then(() => {
                this.handleSearch()
            })
            .catch((err: any) => {
                console.log(err)
            })
    }
    handleStop() {
        this.polling.stop()
    }
}
</script>

<style lang="less" scoped></style>
