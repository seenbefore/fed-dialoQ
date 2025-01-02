<template>
    <div class="sg-page icinfo-ai StudentList">
        <!-- 查询条件 -->
        <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel" @submit="handleSearch" @reset="handleSearch"></sg-base-form>
        <!-- 在查询条件和列表之间添加 -->
        <div class="sg-flexbox align-center justify-between" style="margin-bottom: 7px;">
            <div>
                <el-button type="primary" @click="handleAdd">新增</el-button>
            </div>
        </div>
        <!-- 列表展示 -->
        <sg-data-view v-bind="getTableAttrs" ref="tableRef"></sg-data-view>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import { FormRow, FormColumn, TableColumn, FormRef, TableRef } from '@/sharegood-ui'
import { FiremanEnum, FiremanEnumMap } from './enum'
import { list, save, remove, detail, VO } from './api'

@Component({
    name: 'StudentList',
    components: {},
})
export default class StudentList extends Vue {
    @Ref('formRef')
    formRef!: FormRef
    @Ref('tableRef')
    tableRef!: TableRef

    formModel: Record<string, any> = {}

    handleSearch() {
        this.tableRef.onLoad({ page: 1 })
    }

    async handleAdd() {
        const result = await this.$modalDialog(() => import('./components/student-dialog/index.vue'), {
            action: 'create',
        })
        if (result) {
            this.handleSearch()
        }
    }
    async handleEdit(row: VO) {
        const result = await this.$modalDialog(() => import('./components/student-dialog/index.vue'), {
            id: row.id,
            action: 'modify',
        })
        if (result) {
            this.handleSearch()
        }
    }

    async handleDelete(row: VO) {
        await this.$confirm('删除后将无法找回')
        await remove({ id: row.id })
        this.$message.success('删除成功')
        this.handleSearch()
    }

    get getFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'input',
                name: 'keyword',
                itemAttrs: {
                    label: '关键字',
                },
                attrs: {
                    placeholder: '请输入姓名/身份证号/手机号码',
                    maxlength: 50,
                },
            },
            {
                tag: 'select',
                name: 'examType',
                itemAttrs: {
                    label: '考试类型',
                },
                attrs: {
                    placeholder: '请选择',
                    options: async () => {
                        return [
                            {
                                label: '全部',
                                value: '',
                            },
                        ]
                    },
                },
            },
            {
                tag: 'select',
                name: 'fireman',
                itemAttrs: {
                    label: '是否消防人员',
                },
                attrs: {
                    placeholder: '请选择',
                    options: Object.values(FiremanEnumMap),
                },
            },
        ]
        return {
            // 是否自动布局
            autoLayout: true,
            // 是否自动添加查询按钮
            autoAppendAction: true,
            fields,
        }
    }

    get getTableAttrs() {
        const columns: TableColumn[] = [
            {
                label: '序号',
                type: 'index',
                prop: 'index',
                fixed: 'left',
                width: '50px',
            },
            {
                align: 'left',
                label: '区域',
                prop: 'area',
                minWidth: '120px',
            },
            {
                align: 'left',
                label: '姓名',
                prop: 'name',
                minWidth: '120px',
            },
            {
                align: 'left',
                label: '手机号码',
                prop: 'phone',
                minWidth: '120px',
            },
            {
                align: 'left',
                label: '身份证号',
                prop: 'idCard',
                minWidth: '180px',
            },
            {
                align: 'left',
                label: '单位',
                prop: 'company',
                minWidth: '180px',
            },
            {
                align: 'left',
                label: '注册日期',
                prop: 'registerDate',
                minWidth: '170px',
            },
            {
                label: '操作',
                prop: 'action',
                width: '180px',
                fixed: 'right',
                align: 'left',
                render: (h, { row }) => {
                    return (
                        <div>
                            <el-button
                                type="text"
                                onClick={() => {
                                    this.handleEdit(row)
                                }}
                            >
                                编辑
                            </el-button>
                            <el-button
                                type="text"
                                danger={true}
                                onClick={() => {
                                    this.handleDelete(row)
                                }}
                            >
                                删除
                            </el-button>
                        </div>
                    )
                },
            },
        ]
        return {
            load: async (params: any = {}) => {
                const { data } = await list({
                    ...params,
                    ...this.formModel,
                })
                return {
                    result: data.data,
                    total: data.recordsTotal,
                }
            },
            columns,
        }
    }
}
</script>

<style scoped lang="less">
.StudentList ::v-deep {
    padding: 0px;
}
</style>
