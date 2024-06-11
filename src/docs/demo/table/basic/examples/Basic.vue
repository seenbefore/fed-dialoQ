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
        customLockColumn: 3,
        load: demoListApi,
        columns: [
            {
                label: '全选',
                type: 'selection',
            },
            {
                label: '序号',
                type: 'index',
                prop: 'index',
            },
            {
                align: 'left',
                label: '姓名',
                prop: 'name',
                width: '200px',
            },

            {
                align: 'left',
                label: '地址',
                prop: 'address',
                minWidth: '300px',
                overflowCount: 2,
                renderHeader(h: any, { column, $index, lockVnode }: any) {
                    return h('div', {}, [
                        h('span', '地址'),
                        h(
                            'el-tooltip',
                            {
                                props: {
                                    placement: 'top',
                                },
                                style: {
                                    marginLeft: '5px',
                                },
                            },
                            [
                                h(
                                    'span',
                                    {
                                        slot: 'content', // slot属性
                                        style: {
                                            display: 'inline-block',
                                            maxWidth: '120px',
                                            whiteSpace: 'normal',
                                            wordBreak: 'break-all',
                                        },
                                    },
                                    '这里是个说明',
                                ),
                                h('i', {
                                    class: 'el-icon-info',
                                }),
                            ],
                        ),
                        lockVnode,
                    ])
                },
            },
            {
                align: 'left',
                label: '开始时间',
                prop: 'beginTime',
                width: '200px',
                render: (h, { row }) => {
                    return dateFormat(row.beginTime)
                },
            },
            {
                align: 'left',
                label: '结束时间',
                prop: 'endTime',
                width: '200px',
            },
            {
                align: 'left',
                label: '字段1',
                prop: '字段1',
                width: '200px',
            },
            {
                align: 'left',
                label: '字段2',
                prop: '字段2',
                width: '200px',
            },
            {
                align: 'left',
                label: '操作',
                prop: 'action',
                width: '300px',
                fixed: 'right',
                render: (h, { row }) => {
                    return [
                        h('div', [
                            h(
                                'a',
                                {
                                    class: 'sg-link',
                                    props: {
                                        type: 'text',
                                    },
                                    on: {
                                        click: () => {},
                                    },
                                },
                                '上传原型',
                            ),
                            h(
                                'a',
                                {
                                    class: 'sg-link',
                                    props: {
                                        type: 'text',
                                    },
                                    on: {
                                        click: () => {},
                                    },
                                },
                                '上传设计',
                            ),
                            h(
                                'a',
                                {
                                    class: 'sg-link',
                                    props: {
                                        type: 'text',
                                    },
                                    on: {
                                        click: () => {},
                                    },
                                },
                                '复制链接',
                            ),
                            h(
                                'a',
                                {
                                    class: 'sg-link',

                                    props: {
                                        type: 'text',
                                    },
                                    on: {
                                        click: () => {},
                                    },
                                },
                                '忍痛删除',
                            ),
                        ]),
                    ]
                },
            },
        ] as TableColumn[],
    }
}
</script>

<style lang="less" scoped></style>
