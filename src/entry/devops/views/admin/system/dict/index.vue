<template>
    <PageWrapper class="AdminSystemDict column ">
        <template #title>
            <el-button type="default" icon="el-icon-plus" @click="handleCreate">
                新增
            </el-button>
        </template>
        <div class="sg-flexbox" style="height:100%;">
            <div class="menu">
                <el-menu :default-active="formModel.parent_id" @select="handleSelect" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                    <el-menu-item :index="item.value" v-for="item in parent_ids" :key="item.value">
                        <i class="el-icon-menu"></i>
                        <span slot="title">{{ item.label }}</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <div class="sg-flex-1 main">
                <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel" @submit="handleSearch" @reset="handleSearch"></sg-base-form>

                <sg-data-view v-bind="getTableAttrs" ref="tableRef"></sg-data-view>
            </div>
        </div>
    </PageWrapper>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { MyMixins } from '@/entry/devops/mixins'
import { userStore } from '@/entry/devops/store/useStore'
import { FormColumn, FormRef, FormRow, TableColumn, TableRef, TableLoad, TableLoadValue } from '@/sharegood-ui'
import { dateFormat, clipboard } from '@/scripts/utils'
import { DictService } from '@/entry/devops/api'
@Component({
    name: 'AdminSystemDict',
    components: {},
})
export default class AdminSystemDict extends MyMixins {
    @Prop({ default: '' }) title!: string
    @Ref('formRef')
    formRef!: FormRef
    @Ref('tableRef')
    tableRef!: TableRef
    parent_ids: any[] = []

    formModel = {
        parent_id: '',
    }
    getFormAttrs = {
        span: 6,
        labelWidth: '80px',
        fields: [
            {
                columns: [
                    {
                        tag: 'input',
                        name: '%label%',
                        itemAttrs: {
                            label: '标题名称',
                        },
                        attrs: {
                            placeholder: '支持模糊查询',
                        },
                    },

                    {
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
        auto: false,
        height: '100%',
        dataSourcePath: 'data',
        pagination: {
            pageSize: 200,
        },
        load: async (params: any = {}) => {
            const formRef: any = this.$refs.formRef
            const state = formRef.getState()
            params.conditions = {
                ...state,
                //code: this.activeMenu,
            }
            return await DictService.list(params)
        },
        columns: [
            {
                label: '序号',
                type: 'index',
                prop: 'index',
            },
            {
                align: 'left',
                label: '字典中文',
                prop: 'label',
                minWidth: '220px',
            },

            {
                align: 'left',
                label: '字典英文',
                prop: 'value',
                width: '200px',
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
            await DictService.removeOne(
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
        this.$modalDialog(() => import(/* webpackChunkName: "DictEditDialog" */ './components/DictEditDialog/index.vue'), {
            isEdit: false,
            parent_id: this.formModel.parent_id,
        })
            .then(async val => {
                this.formModel.parent_id = val.parent_id
                this.syncGroup()
                this.handleSearch()
            })
            .catch((err: any) => {
                console.log(err)
            })
    }
    handleEdit(row: any) {
        this.$modalDialog(() => import(/* webpackChunkName: "DictEditDialog" */ './components/DictEditDialog/index.vue'), {
            id: row.id,
            isEdit: true,
            parent_id: this.formModel.parent_id,
        })
            .then(async val => {
                this.formModel.parent_id = val.parent_id
                this.syncGroup()
                this.handleSearch()
            })
            .catch((err: any) => {
                console.log(err)
            })
    }
    handleSelect(index: any, indexPath: any) {
        console.log(index, indexPath)
        this.formModel.parent_id = index
        this.handleSearch()
    }
    async syncGroup() {
        const { data } = await DictService.group()
        this.parent_ids = [...data]
    }
    async mounted() {
        const { data } = await DictService.group()
        if (data.length) {
            this.parent_ids.push(...data)
            this.formModel.parent_id = data[0].value

            this.handleSearch()
        }
    }
}
</script>

<style lang="less" scoped>
.AdminSystemDict::v-deep {
    .menu {
        flex-shrink: 0;
        width: 200px;
        height: 100%;
        overflow-y: auto;
        .el-menu {
            height: 100%;
        }
    }
    .main {
        margin-left: 10px;
        height: 100%;
        flex-direction: column;
        display: flex;
        // overflow-y: auto;
    }
    .el-menu-item,
    .el-submenu__title {
        height: 40px;
        line-height: 40px;
    }
}
</style>
