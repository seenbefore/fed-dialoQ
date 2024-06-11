<template>
    <div>
        {{ selected }}
        <sg-data-view v-bind="getTableAttrs" @selection-change-all="onChange"></sg-data-view>
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
    selected: any = []
    getTableAttrs = {
        // 初始化默认选中的数据
        multipleSelectionAll: [{ id: 1 }, { id: 4 }, { id: 12 }],
        // 唯一匹配的字段
        idKey: 'id',
        load: demoListApi,
        columns: [
            {
                label: '全选',
                type: 'selection',
            },
            {
                label: 'id',
                prop: 'id',
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
            },
            {
                align: 'left',
                label: '结束时间',
                prop: 'endTime',
                width: '200px',
            },
        ] as TableColumn[],
    }
    onChange(val: any) {
        this.selected = val.map((item: any) => ({ id: item.id }))
    }
    mounted() {
        this.selected = this.getTableAttrs.multipleSelectionAll
    }
}
</script>

<style lang="less" scoped></style>
