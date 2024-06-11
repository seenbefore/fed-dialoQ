<template>
    <div>
        <sg-data-view v-bind="getTableAttrs"></sg-data-view>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { TableColumn, TableRef, TableLoad, TableLoadValue } from '@/sharegood-ui'
import { demoListApi } from '@/entry/devops/api/demo/table'
import { dateFormat } from '@/scripts/utils'
@Component({
    components: {},
})
export default class Demo extends Vue {
    getTableAttrs = {
        exportName: '导出excel的名字',
        load: demoListApi,
        pageActionLayout: [
            {
                key: 'print',
                label: '打印',
            },
            {
                key: 'export',
                label: '导出',
            },
        ],
        columns: [
            {
                label: '序号',
                type: 'index',
                prop: 'index',
                exportRender(row: any, index: any) {
                    return index + 1
                },
            },
            {
                align: 'left',
                label: '姓名',
                prop: 'name',
                width: '100px',
            },

            {
                align: 'left',
                label: '地址',
                prop: 'address',
                minWidth: '200px',
            },
            {
                align: 'left',
                label: '开始时间',
                prop: 'beginTime',
                width: '200px',
                exportRender(row: any, index: any) {
                    if (row.beginTime) {
                        return dateFormat(new Date(row.beginTime), 'YYYY/MM/DD')
                    }
                },
            },
            {
                align: 'left',
                label: '结束时间',
                prop: 'endTime',
                width: '200px',
                // 不导出
                noExport: true,
            },
        ] as TableColumn[],
    }
}
</script>

<style lang="less" scoped></style>
