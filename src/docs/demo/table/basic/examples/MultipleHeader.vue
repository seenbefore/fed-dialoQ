<template>
    <div>
        <sg-data-view v-bind="getTableAttrs">
            <template #third>三级</template>
            <template slot="date">
                <el-table-column label="方式一">
                    <el-table-column prop="beginTime" label="开始时间" width="200"></el-table-column>
                    <el-table-column prop="endTime" label="结束时间" width="200"></el-table-column>
                </el-table-column>
            </template>
        </sg-data-view>
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
            },
            {
                label: '姓名',
                prop: 'name',
                width: '100px',
            },
            {
                label: '地址',
                prop: 'address',
                minWidth: '200px',
            },
            {
                type: 'slot',
                prop: 'date',
            },
            {
                label: '方式二',
                children: [
                    {
                        prop: 'beginTime',
                        label: '开始时间',
                        width: '200',
                    },
                    {
                        label: 'aaa',
                        children: [
                            {
                                slotName: 'third',
                                label: 'third',
                            },
                        ],
                    },
                    {
                        prop: 'endTime',
                        label: '结束时间',
                        width: '200',
                        render: (h, e) => `time：${e.row.endTime}`,
                    },
                ],
            },
        ] as TableColumn[],
    }
}
</script>

<style lang="less" scoped></style>
