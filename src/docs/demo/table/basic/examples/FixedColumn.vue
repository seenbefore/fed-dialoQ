<template>
    <div>
        <sg-data-view v-bind="getTableAttrs"></sg-data-view>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { TableColumn, TableRef, TableLoad, TableLoadValue } from '@/sharegood-ui'
import { demoListApi } from '@/entry/devops/api/demo/table'

@Component({
    components: {},
})
export default class Demo extends Vue {
    getTableAttrs = {
        load: demoListApi,
        columns: [
            {
                label: '序号',
                type: 'index',
                prop: 'index',
                fixed: 'left',
            },
            {
                align: 'left',
                label: 'uuid',
                prop: 'uuid',
                width: '350px',
                fixed: 'left',
            },
            {
                align: 'left',
                label: '姓名',
                prop: 'name',
                width: '100px',
                fixed: 'left',
            },
            {
                align: 'left',
                label: 'avatar',
                prop: 'avatar',
                width: '250px',
            },
            {
                align: 'left',
                label: '地址',
                prop: 'address',
                minWidth: '200px',
            },
            {
                align: 'left',
                label: '编号',
                prop: 'no',
                minWidth: '200px',
            },
            {
                align: 'left',
                label: '开始时间',
                prop: 'beginTime',
                width: '200px',
            },
            {
                align: 'left',
                label: '结束时间',
                prop: 'endTime',
                width: '200px',
            },
            {
                align: 'left',
                label: 'Action',
                prop: 'Action',
                width: '200px',
                fixed: 'right',
            },
        ] as TableColumn[],
    }
}
</script>

<style lang="less" scoped></style>
