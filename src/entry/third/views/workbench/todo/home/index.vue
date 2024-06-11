<!-- 我的待办-企业 -->
<template>
    <div class="sg-page WorkbenchTodoHome">
        <sg-base-form ref="formRef" v-bind="formAttrs" v-model="formModel" @submit="refreshList" @reset="refreshList"></sg-base-form>
        <sg-data-view ref="tableRef" v-bind="tableAttrs"></sg-data-view>
    </div>
</template>

<script lang="tsx">
import { Dict } from '@/entry/third/dict'
import { FormColumn, FormRef, TableColumn, TableLoad, TableRef, FormRow } from '@/sharegood-ui'
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
type FormModel = {
    name: string
}
@Component({
    name: 'WorkbenchTodoHome',
    components: {},
})
export default class WorkbenchTodoHome extends Vue {
    mounted() {}
    @Ref('formRef')
    formRef!: FormRef
    /**表单值 */
    formModel = {} as FormModel
    /**表单配置 */
    get formAttrs() {
        return {
            span: 8,
            autoLayout: false,
            fields: [
                {
                    tag: 'select',
                    name: 'reportType',
                    itemAttrs: {
                        label: '类型',
                    },
                    attrs: {
                        options: [
                            {
                                label: '全部',
                                value: '',
                            },
                            ...Dict.getOptions('reportType'),
                        ],
                    },
                },
                {
                    tag: 'action',
                    span: 24,
                    buttons: [
                        {
                            isSubmit: true,
                            text: '查询',
                        },
                        {
                            isReset: true,
                            text: '重置',
                        },
                    ],
                },
            ] as FormColumn[],
        }
    }

    @Ref('tableRef')
    tableRef!: TableRef
    get tableAttrs() {
        return {
            border: false,
            pagination: { pageSize: 10 },
            load: async (pageInfo: any) => {
                let result: any = [{ entStatus: 'K', reportType: '1' }]
                result = result.map((item: any) => {
                    return Dict.format(item, { deep: true })
                })
                return { result, total: 100 }
            },
            columns: [
                {
                    label: '序号',
                    prop: 'index',
                    type: 'index',
                    fixed: 'left',
                },

                {
                    label: '类型',
                    prop: 'entStatus',
                    minWidth: '150px',
                    render: (h, { row }) => {
                        const { entStatus } = row
                        const option = Dict.getOption('entStatus', entStatus)
                        return <div class={option.class}>{option.label}</div>
                    },
                },
                {
                    label: '类型11',
                    prop: 'entStatus',
                    minWidth: '150px',
                    render: (h, { row }) => {
                        const { entStatus$ } = row

                        return <div class={entStatus$.class}>{entStatus$.label}</div>
                    },
                },
                {
                    label: '类型',
                    prop: 'reportType$$',
                    minWidth: '150px',
                },
                {
                    label: '更新时间',
                    prop: 'updateTime',
                    minWidth: '170px',
                },
            ] as TableColumn[],
        }
    }

    /**刷新数据 */
    refreshList() {
        this.tableRef.onLoad({ page: 1 })
    }
}
</script>
