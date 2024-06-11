<template>
    <div class="AdminPageListSearch sg-page sg-p-3 column" :title="null">
        <el-tabs v-model="formModel.status" class="sg-tabs">
            <el-tab-pane :label="item.label" :name="item.name" v-for="(item, index) in tabsFormSchema" :key="index">
                <span slot="label">
                    <span v-text="item.label" class="tabs__txt"></span>
                    <span class="sg-tabs__num">
                        (
                        <b v-text="item.value"></b>
                        )
                    </span>
                </span>
            </el-tab-pane>
        </el-tabs>

        <sg-base-form ref="formRef" :tight="true" v-bind="getFormAttrs" v-model="formModel" @submit="handleSearch" @reset="handleSearch"></sg-base-form>
        <sg-data-view v-bind="getTableAttrs" ref="tableRef"></sg-data-view>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { MyMixins } from '@/entry/devops/mixins'
import { FormRow, FormRef, TableColumn, TableRef } from '@/sharegood-ui'
import { dateFormat, getKPIDateRange } from '@/scripts/utils'
import { formatMoney, formatNumber } from 'icinfo-util'

@Component({
    name: 'AdminPageListSearch',
    components: {},
})
export default class AdminPageListSearch extends MyMixins {
    @Ref('formRef')
    formRef!: FormRef
    @Ref('tableRef')
    tableRef!: TableRef
    handleSearch(val = {}) {
        this.tableRef.onLoad({ page: 1 })
    }
    tabsFormSchema = [
        {
            name: 'all',
            label: '全部',
            value: '1000',
        },
        {
            name: 'todo',
            label: '待审案件',
            value: '300',
        },
        {
            name: 'done',
            label: '已审案件',
            value: '300',
        },
    ]
    formModel = {
        status: 'all',
        时效: 'all',
    }

    getFormAttrs = {
        span: 8,
        size: 'small',
        fields: [
            {
                columns: [
                    {
                        tag: 'radio',
                        name: '时效',
                        span: 24,
                        itemAttrs: {
                            label: '时效',
                        },
                        attrs: {
                            type: 'button',
                            showNum: true,
                            options: [
                                {
                                    label: '全部',
                                    value: 'all',
                                    num: 0,
                                },
                                {
                                    label: '红',
                                    value: 'red',
                                    dot: 'red',
                                    num: 0,
                                },
                                {
                                    label: '橙',
                                    value: 'orange',
                                    dot: 'orange',
                                    num: 0,
                                },
                                {
                                    label: '黄',
                                    value: 'yellow',
                                    dot: ' yellow',
                                    num: 0,
                                },
                                {
                                    label: '绿',
                                    value: 'green',
                                    dot: 'green',
                                    num: 0,
                                },
                            ],
                        },
                    },
                    {
                        tag: 'input',
                        name: '处罚事项',
                        itemAttrs: {
                            label: '处罚事项',
                        },
                        attrs: {
                            inputPrependSlotRender: h => {
                                return h(
                                    'el-select',
                                    {
                                        style: 'width:120px',
                                        attrs: {
                                            placeholder: '请选择',
                                            value: '',
                                        },
                                        on: {
                                            input: (val: any) => {
                                                console.log('值', val)
                                                this.$set(this.formModel, '处罚事项', val)
                                            },
                                        },
                                    },
                                    [
                                        h('el-option', {
                                            attrs: {
                                                label: '水利',
                                                value: '水利',
                                            },
                                        }),
                                        h('el-option', {
                                            attrs: {
                                                label: '建设',
                                                value: '建设',
                                            },
                                        }),
                                    ],
                                )
                            },
                        },
                    },
                    {
                        tag: 'select',
                        name: '当事人类型',
                        itemAttrs: {
                            label: '当事人类型',
                        },
                        attrs: {
                            value: [],
                            filterable: true,
                            'value-key': 'label',
                            'default-first-option': true,
                            multiple: true,
                            collapseTags: true,
                            selectAllValue: '全选',
                            options: async () => {
                                return Promise.resolve([
                                    {
                                        label: '个人',
                                        value: '个人',
                                    },
                                    {
                                        label: '法人',
                                        value: '法人',
                                    },
                                    {
                                        label: '个体工商户',
                                        value: '个体工商户',
                                    },
                                    {
                                        label: '其他组织',
                                        value: '其他组织',
                                    },
                                ])
                            },
                            onChange: (evt: any) => {
                                console.log(33, evt)
                            },
                        },
                    },
                    {
                        tag: 'select',
                        name: 'reviewerName',
                        itemAttrs: {
                            label: '检查人',
                        },
                        attrs: {
                            filterable: true,
                            'value-key': 'label',
                            'default-first-option': true,
                            options: async () => {
                                return []
                            },
                        },
                    },
                    {
                        tag: 'input',
                        name: 'projectName',
                        itemAttrs: {
                            label: '项目名称',
                        },
                        attrs: {
                            placeholder: '支持模糊查询',
                        },
                    },
                    {
                        tag: 'select',
                        name: 'state',
                        itemAttrs: {
                            label: '状态',
                        },
                        attrs: {
                            options: [
                                {
                                    label: '已审核',
                                    value: 'merged',
                                },
                                {
                                    label: '待审核',
                                    value: 'opened',
                                },
                                {
                                    label: '已关闭',
                                    value: 'closed',
                                },
                            ],
                        },
                    },
                    {
                        tag: 'select',
                        name: 'result',
                        itemAttrs: {
                            label: '是否合格',
                        },
                        attrs: {
                            options: [
                                {
                                    label: '合格',
                                    value: '合格',
                                },
                                {
                                    label: '不合格',
                                    value: '不合格',
                                },
                            ],
                        },
                    },
                    {
                        tag: 'cascader',
                        name: '案件标签',
                        itemAttrs: {
                            label: '案件标签',
                        },
                        attrs: {
                            props: {
                                multiple: true,
                                emitPath: false,
                            },
                            filterable: true,
                            collapseTags: true,
                            showAllLevels: false,
                            value: [],
                            options: async () => {
                                const result = Promise.resolve([
                                    {
                                        value: 1,
                                        label: '东南',
                                        children: [
                                            {
                                                value: 2,
                                                label: '上海',
                                                children: [
                                                    { value: 3, label: '普陀' },
                                                    { value: 4, label: '黄埔' },
                                                    { value: 5, label: '徐汇' },
                                                ],
                                            },
                                            {
                                                value: 7,
                                                label: '江苏',
                                                children: [
                                                    { value: 8, label: '南京' },
                                                    { value: 9, label: '苏州' },
                                                    { value: 10, label: '无锡' },
                                                ],
                                            },
                                            {
                                                value: 12,
                                                label: '浙江',
                                                children: [
                                                    { value: 13, label: '杭州' },
                                                    { value: 14, label: '宁波' },
                                                    { value: 15, label: '嘉兴' },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        value: 17,
                                        label: '西北',
                                        children: [
                                            {
                                                value: 18,
                                                label: '陕西',
                                                children: [
                                                    { value: 19, label: '西安' },
                                                    { value: 20, label: '延安' },
                                                ],
                                            },
                                            {
                                                value: 21,
                                                label: '新疆维吾尔族自治区',
                                                children: [
                                                    { value: 22, label: '乌鲁木齐' },
                                                    { value: 23, label: '克拉玛依' },
                                                ],
                                            },
                                        ],
                                    },
                                ])
                                return result
                            },
                        },
                    },

                    {
                        tag: 'range',
                        name: '处罚金额',
                        itemAttrs: {
                            label: '处罚金额',
                        },
                        attrs: {
                            value: [],
                        },
                    },

                    {
                        tag: 'select',
                        name: '人员(多选)',
                        itemAttrs: {
                            label: '人员(多选)',
                        },

                        attrs: {
                            value: [],
                            multiple: true,
                            'collapse-tags': true,
                            options: [
                                {
                                    label: '张三',
                                    value: '张三',
                                },
                                {
                                    label: '李四',
                                    value: '李四',
                                },
                                {
                                    label: '李四1',
                                    value: '李四1',
                                },
                                {
                                    label: '李四22',
                                    value: '李四22',
                                },
                                {
                                    label: '李四33',
                                    value: '李四33',
                                },
                                {
                                    label: '李四44',
                                    value: '李四44',
                                },
                            ],
                        },
                    },

                    {
                        tag: 'date',
                        name: '日期',
                        itemAttrs: {
                            label: '日期',
                        },
                        attrs: {
                            value: '',
                            format: 'yyyy/MM/dd',
                            'value-format': 'yyyy-MM-dd HH:mm:ss',
                            placeholder: '请选择',
                        },
                    },
                    {
                        tag: 'daterange',
                        name: '[timeStart,timeEnd]',
                        itemAttrs: {
                            label: '日期范围',
                        },
                        attrs: {
                            value: getKPIDateRange(),
                            'default-time': ['00:00:00', '23:59:59'],
                            //type: 'daterange',
                            format: 'yyyy/MM/dd',
                            'value-format': 'yyyy-MM-dd HH:mm:ss',
                            'start-placeholder': '开始时间',
                            'end-placeholder': '结束时间',
                        },
                    },
                    {
                        tag: 'input',
                        name: '测试',
                        itemAttrs: {
                            label: '测试',
                        },
                        visible: false,
                        attrs: {},
                    },

                    {
                        span: 24,
                        tag: 'action',
                        buttons: [
                            {
                                isSubmit: true,
                                type: 'primary',
                                text: '查询',
                                size: 'small',
                                svgIcon: 'icon-search',
                            },
                            {
                                isReset: true,
                                text: '重置',
                                size: 'small',
                                svgIcon: 'icon-reset',
                            },
                            {
                                isMore: true,
                                text: '展开',
                                size: 'small',
                                svgIcon: 'icon-expand',
                            },
                        ],
                    },
                ],
            },
        ] as FormRow[],
    }
    getTableAttrs = {
        height: '100%',
        //dataSourcePath: 'data',
        pageActionLayout: [
            {
                key: 'exportAll',
                label: '导出全部',
            },
        ],
        load: async (params: any = {}) => {
            const formRef = this.$refs.formRef as FormRef
            const state = formRef.getState()

            return {
                result: [
                    {
                        id: 'a1',
                        时效: 1,
                        任务名称: '啊圣克鲁斯打开了打了卡到啦',
                        任务编号: '浙市监抽查〔2022〕29号',
                        标签: '标签文字11',
                        color: 'cyan',
                        状态: 'a',
                        任务类型: 'sasda',
                        检查对象数量: 23453,
                        问题检出率: 23.2,
                        createdAt: new Date().valueOf(),
                    },
                    {
                        id: 'a2',
                        时效: 2,
                        任务名称: '啊圣克鲁斯打开了打了卡到啦上课了大多拉点萨达',
                        任务编号: '浙市',
                        标签: '标签文字2',
                        color: 'orange',
                        状态: 'b',
                        任务类型: 'sasda',
                        检查对象数量: 23453,
                        问题检出率: 23.2,
                        createdAt: new Date().valueOf(),
                    },
                    {
                        id: 'a3',
                        时效: 3,
                        任务名称: '啊圣克鲁斯打开了打了卡到啦',
                        任务编号: '浙市监',
                        标签: '标签文字11',
                        color: 'blue',
                        状态: 'c',
                        任务类型: 'sasda',
                        检查对象数量: 23453,
                        问题检出率: 23.2,
                        createdAt: new Date().valueOf(),
                    },
                ],
                total: 899,
            }
        },
        columns: [
            {
                label: '序号',
                type: 'index',
                prop: 'index',
                fixed: 'left',
            },
            {
                align: 'left',
                label: '时效',
                prop: '时效',
                width: '100px',
                fixed: 'left',
                render: (h, { row }) => {
                    const { 时效 } = row
                    const val = new Map([
                        [
                            1,
                            {
                                label: '紧急',
                                class: 'sg-dot red',
                            },
                        ],
                        [
                            2,
                            {
                                label: '延期',
                                class: 'sg-dot orange',
                            },
                        ],
                        [
                            3,
                            {
                                label: '正常',
                                class: 'sg-dot green',
                            },
                        ],
                    ]).get(时效)

                    return [
                        h(
                            'span',
                            {
                                class: val?.class,
                            },
                            [''],
                        ),
                    ]
                },
            },
            {
                align: 'left',
                label: '任务名称',
                prop: '任务名称',
                width: '240px',
                fixed: 'left',
                render: (h, { row }) => {
                    const { id, 任务名称 } = row

                    return [
                        h(
                            'router-link',
                            {
                                class: 'ic-link',
                                attrs: {
                                    to: {
                                        path: `/admin/page/desc/basic`,
                                        query: {
                                            id,
                                        },
                                    },
                                },
                            },
                            [任务名称],
                        ),
                    ]
                },
            },
            {
                align: 'left',
                label: '任务编号',
                prop: '任务编号',
                width: '200px',
                render: (h, { row }) => {
                    const { color, 标签, 任务编号 } = row

                    return [
                        h(
                            'span',
                            {
                                attrs: {},
                            },
                            [任务编号],
                        ),
                        h(
                            'span',
                            {
                                class: `sg-tag ${color}`,
                                attrs: {},
                            },
                            [标签],
                        ),
                    ]
                },
            },
            {
                align: 'left',
                label: '状态',
                prop: '状态',
                width: '100px',
                render: (h, { row }) => {
                    const { 状态 } = row
                    const val = new Map([
                        [
                            'a',
                            {
                                label: '更新',
                                class: 'sg-dot blue',
                            },
                        ],
                        [
                            'b',
                            {
                                label: '作废',
                                class: 'sg-dot red',
                            },
                        ],
                        [
                            'c',
                            {
                                label: '无更新',
                                class: 'sg-dot gray',
                            },
                        ],
                    ]).get(状态)

                    return [
                        h(
                            'span',
                            {
                                class: val?.class,
                            },
                            [val?.label],
                        ),
                    ]
                },
            },
            {
                align: 'left',
                label: '任务类型',
                prop: '任务类型',
                minWidth: '150px',
            },
            {
                align: 'left',
                label: '检查对象数量',
                prop: '检查对象数量',
                width: '105px',
                render: (h, { row }) => {
                    const { 检查对象数量 } = row

                    return [
                        h(
                            'div',
                            {
                                style: 'text-align:right;',
                            },
                            [formatMoney(检查对象数量 + '', ',')],
                        ),
                    ]
                },
            },
            {
                align: 'left',
                label: '问题检出率',
                prop: '问题检出率',
                width: '95px',
                render: (h, { row }) => {
                    const { 问题检出率 } = row

                    return [
                        h(
                            'div',
                            {
                                style: 'text-align:right;',
                            },
                            [formatNumber(+问题检出率) + '%'],
                        ),
                    ]
                },
            },
            {
                align: 'left',
                label: '创建时间',
                prop: 'createdAt',
                width: '180px',
                render: (h, { row }) => {
                    return dateFormat(new Date(row.createdAt), 'YYYY-MM-DD HH:mm:ss')
                },
            },

            // 函数模式
            {
                align: 'left',
                label: '操作',
                prop: 'action',
                width: '130px',
                fixed: 'right',
                render(h, { row }) {
                    return [
                        h(
                            'a',
                            {
                                class: 'ic-link',
                                props: {
                                    type: 'text',
                                },
                                on: {
                                    click: () => {
                                        //this.handleDelete(row)
                                    },
                                },
                            },
                            '查看',
                        ),
                        h(
                            'a',
                            {
                                class: 'ic-link',
                                props: {
                                    type: 'text',
                                },
                                on: {
                                    click: () => {
                                        //this.handleDelete(row)
                                    },
                                },
                            },
                            '评审',
                        ),
                        h(
                            'a',
                            {
                                class: 'ic-link danger',
                                props: {
                                    type: 'text',
                                },
                                on: {
                                    click: () => {
                                        //this.handleDelete(row)
                                    },
                                },
                            },
                            '删除',
                        ),
                    ]
                },
            },
        ] as TableColumn[],
    }

    mounted() {}
}
</script>

<style lang="less"></style>
