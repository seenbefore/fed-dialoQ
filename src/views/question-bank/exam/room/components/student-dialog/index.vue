<template>
    <el-dialog class="StudentDialog" :title="'考场学生列表'" :visible="true" width="800px" @close="cancel">
        <!-- 查询条件 -->
        <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel" @submit="handleSearch" @reset="handleSearch"></sg-base-form>

        <!-- 列表展示 -->
        <sg-data-view v-bind="getTableAttrs" ref="tableRef"></sg-data-view>

        <template #footer>
            <el-button @click="cancel">关闭</el-button>
        </template>
    </el-dialog>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import { FormRow, FormColumn, TableColumn, FormRef, TableRef } from '@/sharegood-ui'
import { getStudentList, StudentVO } from '../../api'

@Component({
    name: 'StudentDialog',
    components: {},
})
export default class StudentDialog extends Vue {
    /** 考场ID */
    @Prop() readonly id!: string

    @Ref('formRef')
    formRef!: FormRef
    @Ref('tableRef')
    tableRef!: TableRef

    formModel: any = {}

    get getFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'input',
                name: 'keyword',
                itemAttrs: {
                    label: '关键字',
                },
                attrs: {
                    placeholder: '请输入考生姓名/编号',
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
                label: '考生姓名',
                prop: 'name',
                minWidth: '120px',
            },
            {
                align: 'left',
                label: '考生编号',
                prop: 'code',
                minWidth: '120px',
            },
            {
                align: 'left',
                label: '所属单位',
                prop: 'department',
                minWidth: '180px',
            },
            {
                align: 'left',
                label: '联系电话',
                prop: 'phone',
                minWidth: '120px',
            },
        ]
        return {
            load: async (params: any = {}) => {
                const { data } = await getStudentList({
                    roomId: this.id,
                    ...this.formModel,
                } as any)
                return {
                    result: data.data,
                    total: data.recordsTotal,
                }
            },
            // 导出
            pageActionLayout: [],

            columns,
        }
    }

    handleSearch() {
        this.tableRef.onLoad({ page: 1 })
    }

    cancel() {
        this.$options.cancel?.()
    }
}
</script>

<style scoped lang="less">
.StudentDialog ::v-deep {
    .el-dialog__body {
        padding: 15px 20px;
    }
}
</style>
