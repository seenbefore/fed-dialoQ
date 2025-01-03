<template>
    <admin-page class="ExamRoom">
        <!-- 查询条件 -->
        <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel" @submit="handleSearch" @reset="handleSearch"></sg-base-form>

        <!-- 列表展示 -->
        <sg-data-view v-bind="getTableAttrs" ref="tableRef">
            <template #header>
                <div class="sg-flexbox align-center">
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </div>
            </template>
        </sg-data-view>
    </admin-page>
</template>

<script lang="tsx">
import AdminPage from '@/components/admin/admin-page/index.vue'
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import { FormRow, FormColumn, TableColumn, FormRef, TableRef } from '@/sharegood-ui'
import { list, save, remove, RoomVO } from './api'

@Component({
    name: 'ExamRoom',
    components: {
        AdminPage,
    },
})
export default class ExamRoom extends Vue {
    @Ref('formRef')
    formRef!: FormRef
    @Ref('tableRef')
    tableRef!: TableRef

    formModel: any = {}

    handleSearch() {
        this.tableRef.onLoad({ page: 1 })
    }

    async handleAdd() {
        const result = await this.$modalDialog(() => import('./components/save-drawer/index.vue'), {
            action: 'add',
        })
        if (result) {
            this.handleSearch()
        }
    }

    async handleEdit(row: RoomVO) {
        const result = await this.$modalDialog(() => import('./components/save-drawer/index.vue'), {
            action: 'edit',
            id: row.id,
        })
        if (result) {
            this.handleSearch()
        }
    }

    async handleDelete(row: RoomVO) {
        await this.$confirm('删除后将无法找回', '确认删除？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
        })
        await remove({ id: row.id } as any)
        this.$message.success('删除成功')
        this.handleSearch()
    }

    async handleAssign(row: RoomVO) {
        await this.$modalDialog(() => import('./components/student-dialog/index.vue'), {
            id: row.id,
        })
    }

    async handlePreview(row: RoomVO) {
        // 改为打开浏览器标签页
        const { href } = this.$router.resolve({
            path: '/question-bank/paper/preview',
            query: {
                id: row.id,
            },
        })
        window.open(href, '_blank')
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
                    placeholder: '请输入监考老师/考场名称',
                },
            },
            {
                tag: 'date',
                name: 'date',
                itemAttrs: {
                    label: '选择日期',
                },
                attrs: {
                    placeholder: '请选择',
                    'value-format': 'yyyy-MM-dd',
                },
            },
        ]
        return {
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
                label: '考试名称',
                prop: 'examName',
                minWidth: '180px',
            },
            {
                align: 'left',
                label: '考场',
                prop: 'name',
                minWidth: '120px',
            },
            {
                align: 'left',
                label: '监考老师',
                prop: 'teachers',
                minWidth: '120px',
            },
            {
                align: 'left',
                label: '开始时间',
                prop: 'startTime',
                minWidth: '170px',
            },
            {
                align: 'left',
                label: '结束时间',
                prop: 'endTime',
                minWidth: '170px',
            },
            {
                label: '操作',
                prop: 'action',
                width: '220px',
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
                                onClick={() => {
                                    this.handleAssign(row)
                                }}
                            >
                                学生列表
                            </el-button>
                            <el-button
                                type="text"
                                onClick={() => {
                                    this.handlePreview(row)
                                }}
                            >
                                试卷预览
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
            tableHeaderSticky: {
                scrollDom: () => document.querySelector('.ExamRoom'),
            },
            load: async (params: any = {}) => {
                const { data } = await list({
                    ...params,
                    ...this.formModel,
                } as any)
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
.ExamRoom ::v-deep {
    padding: 0px;
}
</style>
