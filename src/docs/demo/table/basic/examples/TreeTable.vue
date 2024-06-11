<template>
    <div>
        <p>树形数据</p>
        <sg-data-view v-bind="getTableAttrs"></sg-data-view>
        <p>树形数据懒加载</p>
        <sg-data-view v-bind="getTableAttrs2"></sg-data-view>
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
        rowKey: 'id',
        treeProps: { children: 'children', hasChildren: 'hasChildren' },
        columns: [
            {
                align: 'left',
                label: 'id',
                prop: 'id',
                width: '100px',
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
                minWidth: '100px',
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
            },
        ] as TableColumn[],
    }
    getTableAttrs2 = {
        load: demoListApi,
        rowKey: 'id',
        treeLoad: this.treeLoad,
        lazy: true,
        treeProps: { children: 'children2', hasChildren: 'hasChildren' },
        columns: [
            {
                align: 'left',
                label: 'id',
                prop: 'id',
                width: '100px',
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
                minWidth: '100px',
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
            },
        ] as TableColumn[],
    }
    async treeLoad(tree: any, treeNode: any, resolve: any) {
        await demoListApi({})
        resolve([
            {
                id: '45',
                name: 'sad撒多',
                address: 'sdfghgs',
            },
        ])
    }
}
</script>

<style lang="less" scoped></style>
