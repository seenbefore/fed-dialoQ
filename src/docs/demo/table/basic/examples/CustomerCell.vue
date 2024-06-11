<template>
    <div>
        <sg-data-view v-bind="getTableAttrs">
            <template slot-scope="scope" slot="beginTime">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.beginTime }}</span>
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
            // slot模式
            {
                align: 'left',
                label: '开始时间',
                prop: 'beginTime',
                slotName: 'beginTime',
            },
            // 函数模式
            {
                align: 'left',
                label: '结束时间',
                prop: 'endTime',
                width: '200px',
                render(h, { row }) {
                    return [
                        h(
                            'i',
                            {
                                class: 'el-icon-time',
                            },
                            '',
                        ),
                        h(
                            'span',
                            {
                                style: {
                                    marginLeft: '10px',
                                },
                            },
                            row['endTime'],
                        ),
                    ]
                },
            },
        ] as TableColumn[],
    }
}
</script>

<style lang="less" scoped></style>
