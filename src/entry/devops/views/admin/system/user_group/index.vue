<template>
    <PageWrapper class="AdminSystemUser_group column " :title="''">
        <template #title>
            <el-button type="" @click="handleCreate" icon="el-icon-plus">
                新增
            </el-button>
        </template>

        <sg-data-view v-bind="getTableAttrs" ref="tableRef"></sg-data-view>
    </PageWrapper>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { MyMixins } from '@/entry/devops/mixins'

import { FormColumn, FormRef, FormRow, TableColumn, TableRef, TableLoad, TableLoadValue } from '@/sharegood-ui'
import { dateFormat, clipboard } from '@/scripts/utils'
import { UserGroupService } from '@/entry/devops/api'
@Component({
    name: 'AdminSystemUser_group',
    components: {},
})
export default class AdminSystemUser_group extends MyMixins {
    @Ref('tableRef')
    tableRef!: TableRef
    getTableAttrs = {
        height: '100%',
        dataSourcePath: 'data',
        pagination: {
            pageSize: 200,
        },
        load: async (params: any = {}) => {
            params.conditions = {}
            return await UserGroupService.list(params)
        },
        columns: [
            {
                label: '序号',
                type: 'index',
                prop: 'index',
            },
            {
                align: 'left',
                label: '标题',
                prop: 'name',
                width: '180px',
            },

            {
                align: 'left',
                label: '人员',
                prop: 'records',
                minWidth: '300px',
                showOverflowTooltip: false,
                render: (h, { row }) => {
                    if (row.records && row.records.length) {
                        return row.records
                            .map((item: any) => {
                                return item.label
                            })
                            .join('，')
                    }
                },
            },
            {
                align: 'left',
                label: '数量',
                prop: 'records',
                width: '60px',
                render: (h, { row }) => {
                    if (row.records && row.records.length) {
                        return row.records.length
                    }
                },
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
                width: '100px',
                fixed: 'right',
                render: (h, { row }) => {
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
                                            this.handleEdit(row)
                                        },
                                    },
                                },
                                '修改',
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
                                            this.handleDelete(row)
                                        },
                                    },
                                },
                                '删除',
                            ),
                        ]),
                    ]
                },
            },
        ] as TableColumn[],
    }
    handleSearch(val = {}) {
        this.tableRef.onLoad({ page: 1 })
    }
    handleDelete(row: any) {
        const id = row.id
        this.$confirm('确认删除吗').then(async () => {
            await UserGroupService.removeOne(
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
    handleCreate() {
        this.$modalDialog(() => import(/* webpackChunkName: "UserGroupEditDialog" */ './components/UserGroupEditDialog/index.vue'), {
            isEdit: false,
        })
            .then(async () => {
                this.handleSearch()
            })
            .catch((err: any) => {
                console.log(err)
            })
    }
    handleEdit(row: any) {
        this.$modalDialog(() => import(/* webpackChunkName: "UserGroupEditDialog" */ './components/UserGroupEditDialog/index.vue'), {
            id: row.id,
            isEdit: true,
        })
            .then(async () => {
                this.handleSearch()
            })
            .catch((err: any) => {
                console.log(err)
            })
    }
    mounted() {}
    changeGroup() {}
}
</script>

<style lang="less" scoped></style>
