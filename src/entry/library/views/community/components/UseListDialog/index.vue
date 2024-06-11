<template>
    <el-dialog class="UseListDialog" :title="communityName" visible width="800px" @close="cancel">
        <sg-data-view v-bind="getTableAttrs" ref="tableRef"></sg-data-view>
    </el-dialog>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Ref, Watch } from 'vue-property-decorator'
import { FormColumn, FormRef, FormRow, TableColumn, TableRef } from '@/sharegood-ui'
import moment from 'moment'
import { userStore } from '@/entry/library/store/useStore'
import * as API from '@/entry/library/services/community_used'
@Component({
    name: 'UseListDialog',
    components: {},
})
export default class UseListDialog extends Vue {
    @Prop({ required: true }) communityId!: string
    @Prop({ required: true }) communityName!: string
    mounted() {}

    @Ref('form')
    formRef!: FormRef
    @Ref('tableRef')
    tableRef!: TableRef
    get getTableAttrs() {
        const columns: TableColumn[] = [
            {
                label: '序号',
                type: 'index',
                prop: 'index',
                fixed: 'left',
            },

            {
                align: 'left',
                label: '项目',
                prop: 'projectName',
                width: '220px',
            },
            {
                align: 'left',
                label: '功能点',
                prop: 'feature',
                width: '120px',
            },
            {
                align: 'left',
                label: '所有人',
                prop: 'owner',
                width: '120px',
            },
            {
                align: 'left',
                label: '使用日期',
                prop: 'date',
                width: '120px',
            },

            {
                align: 'center',
                label: '操作',
                prop: 'action',
                width: '120px',
                fixed: 'right',
                render: (h, { row }) => {
                    const { createdUserId } = row
                    const username = userStore.info?.username || ''
                    const role = userStore.info?.role || ''
                    const isAdmin = role.includes('admin')
                    const isAuthor = createdUserId === username
                    //console.log(role, isAdmin, isAuthor, createdUserId, username)
                    if (isAdmin || isAuthor) {
                        return [
                            h('div', [
                                h(
                                    'el-button',
                                    {
                                        props: {
                                            type: 'primary',
                                            size: 'mini',
                                        },
                                        on: {
                                            click: async () => {
                                                const result = await this.$modalDialog(() => import('../UseDialog/index.vue'), {
                                                    id: row.id,
                                                })
                                                if (result) {
                                                    this.tableRef.onLoad()
                                                }
                                            },
                                        },
                                    },
                                    '修改',
                                ),
                                h(
                                    'el-button',
                                    {
                                        props: {
                                            type: 'danger',
                                            size: 'mini',
                                        },
                                        on: {
                                            click: () => {
                                                this.handleDelete(row)
                                            },
                                        },
                                    },
                                    '删除',
                                ),
                            ]),
                        ]
                    }
                    return []
                },
            },
        ]
        return {
            //auto: false,
            // height: '100%',
            //dataSourcePath: 'data',
            load: async (params: any = {}) => {
                params.conditions = {
                    communityId: this.communityId,
                }
                const { data } = await API.list(params)
                return {
                    result: data.data,
                    total: data.total,
                }
            },
            pageActionLayout: [
                // {
                //     key: 'export',
                //     label: '导出',
                // },
                // {
                //     key: 'exportAll',
                //     label: '导出全部',
                // },
            ],
            columns,
        }
    }

    cancel() {
        this.$options.cancel?.()
    }
    handleDelete(row: any) {
        const id = row.id
        this.$confirm('确认删除吗').then(async () => {
            await API.remove({
                id,
            })
            this.$message.success('删除成功')
            const tableRef = this.$refs.tableRef as TableRef
            tableRef.onLoad()
        })
    }
}
</script>
