<template>
    <div class="sg-page page-devops-nginx sg-p-0 column">
        <section class="sg-card sg-flexbox column sg-flex-1">
            <div class="sg-card-header">
                <div>
                    <el-button type="" @click="handleCreate" icon="el-icon-plus">创建模板</el-button>
                </div>
            </div>
            <div class="sg-card-body sg-flexbox column sg-flex-1">
                <!-- <sg-base-form
                    class="column sg-mb-3"
                    ref="formRef"
                    :fields="formFields"
                    v-model="formModel"
                    @submit="handleSearch"
                    @reset="handleSearch"
                    :span="8"
                ></sg-base-form> -->
                <sg-data-view id="table" :columns="columns" :load="load" ref="tableRef" height="100%" :page-action-layout="[]"></sg-data-view>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import * as API from '@/entry/devops/api/index'
import { ProjectTemplate } from '@/entry/devops/models'
import { FormColumn, TableColumn, TableRef, FormRef, TableLoad } from '@/sharegood-ui'
import _ from 'lodash'
import { dateFormat } from '@/scripts/utils'
interface FormModel {
    target?: string
}
@Component({
    name: 'DevopsProjectTemplate',
    components: {},
})
export default class DevopsProjectTemplate extends Vue {
    public $refs!: {
        formRef: FormRef
        tableRef: TableRef
    }
    load(params: any) {
        const model = this.formModel
        return API.ProjectTemplateService.list({
            ...params,
            conditions: {
                ...model,
            },
        }).then(res => ({ result: res.data.list, total: res.data.total }))
    }

    private formModel: FormModel = {}
    private formFields: FormColumn[] = []
    private columns: TableColumn[] = [
        {
            label: '序号',
            type: 'index',
            prop: 'index',
        },
        {
            align: 'left',
            label: '名称',
            prop: 'name',
            width: '200px',
        },
        {
            align: 'left',
            label: '代码仓库',
            prop: 'resposity',
            minWidth: '200px',
        },
        {
            align: 'left',
            label: '备注',
            prop: 'note',
            minWidth: '100px',
        },
        {
            align: 'left',
            label: '创建时间',
            prop: 'createdAt',
            width: '170px',
            render: (h, { row }) => {
                return dateFormat(new Date(row.createdAt), 'YYYY-MM-DD HH:mm:ss')
            },
        },
        {
            align: 'center',
            label: '操作',
            prop: 'name',
            width: '200px',
            render: (h, { row }: { row: ProjectTemplate }) => {
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
    handleSearch() {
        this.$refs.tableRef.onLoad({ page: 1 })
    }
    // 单独删除
    handleDelete(row: ProjectTemplate) {
        const id = row.id
        this.$confirm('确认删除吗').then(async () => {
            await API.ProjectTemplateService.remove(
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
        })
    }
    handleCreate() {
        this.$modalDialog(() => import(/* webpackChunkName: "ProjectTemplateDialog" */ './components/ProjectTemplateDialog/index.vue'), {})
            .then(() => {
                this.handleSearch()
            })
            .catch((err: any) => {
                console.log(err)
            })
    }
    handleEdit(row: ProjectTemplate) {
        const { id } = row
        this.$modalDialog(() => import(/* webpackChunkName: "ProjectTemplateDialog" */ './components/ProjectTemplateDialog/index.vue'), {
            id,
            isEdit: true,
        })
            .then(() => {
                this.handleSearch()
            })
            .catch((err: any) => {
                console.log(err)
            })
    }
}
</script>

<style lang="less" scoped></style>
