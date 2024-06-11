<template>
    <div>
        {{ state }}
        <sg-base-form ref="formRef" :fields="formFields" v-model="formModel" @submit="handleSearch" @reset="handleSearch" @change="handleInput" :span="8" label-width="100px"></sg-base-form>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { FormRef, FormRow } from '@/sharegood-ui'

const provincesOptions = [
    {
        id: 'guangdong',
        label: '广东省',
        value: '1',
        key: '1',
    },
    {
        id: 'jiangsu',
        label: '江苏省',
        value: '2',
        key: '2',
    },
]
const citiesOptionsData = {
    guangdong: [
        {
            label: '珠海市',
            value: '1',
            key: '1',
        },
        {
            label: '深圳市',
            value: '2',
            key: '2',
        },
        {
            label: '广州市',
            value: '3',
            key: '3',
        },
    ],
    jiangsu: [
        {
            label: '南京市',
            value: '1',
            key: '1',
        },
        {
            label: '无锡市',
            value: '2',
            key: '2',
        },
        {
            label: '苏州市',
            value: '3',
            key: '3',
        },
    ],
}
@Component({
    components: {},
})
export default class Demo extends Vue {
    formModel = {
        autocomplete2: '',
    }
    state = {}
    handleInput(val: any) {
        this.state = val
    }

    @Ref('formRef')
    formRef!: FormRef
    formFields: FormRow[] = [
        {
            columns: [
                {
                    span: 24,
                    render: h => {
                        return h(
                            'el-divider',
                            {
                                props: {
                                    'content-position': 'left',
                                },
                            },
                            ['基础字段'],
                        )
                    },
                },
            ],
        },
        {
            columns: [
                {
                    tag: 'input',
                    name: 'input1',
                    itemAttrs: {
                        helpMessage: '这个是提示语',
                        label: 'input1',
                        rules: [
                            {
                                required: true,
                                message: '必填',
                            },
                        ],
                    },
                    attrs: {
                        placeholder: '自定义',
                    },
                },
                {
                    tag: 'input',
                    name: 'showLabelTooltip',
                    itemAttrs: {
                        label: '文字溢出提示-showLabelTooltip',
                        showLabelTooltip: true,
                    },
                    attrs: {
                        placeholder: '',
                        inputSuffixSlotRender: '元',
                        inputPrefixSlotRender: '$',
                    },
                },
                {
                    tag: 'input',
                    name: 'input3',
                    itemAttrs: {
                        label: 'input3',
                    },
                    attrs: {
                        placeholder: '请输入',
                        appendSlotRender: h => {
                            return h(
                                'el-button',
                                {
                                    props: {
                                        type: 'primary',
                                    },
                                    on: {
                                        click: () => {},
                                    },
                                },
                                ['好的'],
                            )
                        },
                    },
                },
                {
                    tag: 'select',
                    name: 'select单选',
                    itemAttrs: {
                        label: 'select单选',
                    },
                    attrs: {
                        value: '',
                        placeholder: '请选择',
                        options: [
                            {
                                label: '区域一',
                                value: '1',
                            },
                            {
                                label: '区域二',
                                value: '2',
                            },
                        ],
                    },
                },
                {
                    tag: 'select',
                    name: 'select多选',
                    itemAttrs: {
                        label: 'select多选',
                    },
                    attrs: {
                        value: [],
                        placeholder: '请选择',
                        multiple: true,
                        options: [
                            {
                                label: '区域一',
                                value: '1',
                            },
                            {
                                label: '区域二',
                                value: '2',
                            },
                        ],
                    },
                },
                {
                    tag: 'select',
                    name: 'select-template',
                    itemAttrs: {
                        label: 'select模板',
                        helpMessage: '这里需要调整下样式<br> popper-class：设置一个全局属性',
                    },
                    attrs: {
                        value: [],
                        placeholder: '自定义模板',
                        options: [
                            {
                                label: '区域一',
                                value: '1',
                            },
                            {
                                label: '区域二',
                                value: '2',
                            },
                        ],
                        'popper-class': 'select-demo',
                        defaultSlotRender(h, { row }) {
                            return h('div', {}, [h('div', [row.label]), h('div', [row.value])])
                        },
                    },
                },
                {
                    tag: 'date',
                    name: 'date',
                    itemAttrs: {
                        label: 'date',
                    },
                    attrs: {
                        value: '',
                        'value-format': 'yyyy-MM-dd',
                        'start-placeholder': '开始时间',
                        'end-placeholder': '结束时间',
                    },
                },
                {
                    tag: 'date',
                    name: '[timeStart,timeEnd]',
                    itemAttrs: {
                        label: 'date范围',
                        rules: [
                            {
                                required: true,
                                message: '必填',
                            },
                        ],
                    },
                    attrs: {
                        value: [],
                        type: 'daterange',
                        'value-format': 'yyyy-MM-dd',
                        'start-placeholder': '开始时间',
                        'end-placeholder': '结束时间',
                    },
                },
                {
                    tag: 'time',
                    name: 'time',
                    itemAttrs: {
                        label: 'time',
                    },
                    attrs: {
                        value: '',
                    },
                },
                {
                    tag: 'autocomplete',
                    name: 'autocomplete1',
                    itemAttrs: {
                        label: 'autocomplete',
                    },
                    attrs: {
                        value: '',
                        'value-key': 'address',
                        debounce: 500,
                        'highlight-first-item': true,
                        'trigger-on-focus': false,
                        placeholder: '请填写名称 然后选中查询结果',
                        onChange: (row, { formModel }) => {
                            console.log('onChange', row)
                            if (row.option && row.option.value) {
                                formModel.autocomplete2 = row.option.value
                            } else {
                                formModel.autocomplete2 = ''
                            }
                        },
                        // listeners: {
                        //     select: (val: any) => {
                        //         //this.formModel.keyword = val
                        //         console.log('select', val)
                        //     },
                        // },
                        load: async (queryString: any) => {
                            return await this.syncData(queryString)
                        },
                    },
                },
                {
                    tag: 'cascader',
                    name: 'cascader',
                    itemAttrs: {
                        label: 'cascader',
                    },
                    attrs: {
                        value: '',
                        options: [
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
                        ],
                    },
                },
                {
                    tag: 'switch',
                    name: 'switchAA',
                    itemAttrs: {
                        label: 'switchAA',
                    },
                    attrs: {
                        value: true,
                    },
                },
                {
                    span: 24,
                    tag: 'radio',
                    name: 'radio',
                    itemAttrs: {
                        label: 'radio',
                    },
                    attrs: {
                        value: '',
                        options: [
                            {
                                label: '男',
                                value: '1',
                            },
                            {
                                label: '女',
                                value: '2',
                            },
                            {
                                label: '未知',
                                value: '3',
                            },
                        ],
                    },
                },
                {
                    span: 24,
                    tag: 'checkbox',
                    name: 'checkbox',
                    itemAttrs: {
                        label: 'checkbox',
                    },
                    attrs: {
                        value: [],
                        options: [
                            {
                                label: '美食/餐厅线上活动',
                                value: '1',
                            },
                            {
                                label: '地推活动',
                                value: '2',
                            },
                            {
                                label: '线下主题活动',
                                value: '3',
                            },
                            {
                                label: '单纯品牌曝光',
                                value: '4',
                            },
                            {
                                label: '少时诵诗书萨达大所多',
                                value: '5',
                            },
                        ],
                    },
                },
            ],
        },
        {
            columns: [
                {
                    span: 8,
                    tag: 'range',
                    name: '[range1,range2]',
                    itemAttrs: {
                        label: 'range',
                    },
                    attrs: {
                        value: [],
                    },
                },
            ],
        },
        {
            columns: [
                {
                    span: 24,
                    render: h => {
                        return h(
                            'el-divider',
                            {
                                props: {
                                    'content-position': 'left',
                                },
                            },
                            ['远程数据'],
                        )
                    },
                },
            ],
        },
        {
            columns: [
                {
                    tag: 'select',
                    name: 'select远程',
                    itemAttrs: {
                        label: 'select远程',
                    },
                    attrs: {
                        value: '',
                        placeholder: '请选择',
                        filterable: true,
                        options: async () => {
                            const data = await this.syncData()
                            return data.map(item => {
                                return {
                                    label: item.value,
                                    value: item.value,
                                }
                            })
                        },
                    },
                },
            ],
        },
        {
            columns: [
                {
                    span: 24,
                    tag: 'radio',
                    name: 'radio远程',
                    itemAttrs: {
                        label: 'radio远程',
                    },
                    attrs: {
                        value: '',
                        options: async () => {
                            const data = await this.syncData()
                            return data
                                .map(item => {
                                    return {
                                        label: item.value,
                                        value: item.value,
                                    }
                                })
                                .slice(0, 3)
                        },
                    },
                },
            ],
        },
        {
            columns: [
                {
                    span: 24,
                    tag: 'checkbox',
                    name: 'checkbox远程',
                    itemAttrs: {
                        label: 'checkbox远程',
                    },
                    attrs: {
                        value: [],
                        options: async () => {
                            const data = await this.syncData()
                            return data
                                .map(item => {
                                    return {
                                        label: item.value,
                                        value: item.value,
                                    }
                                })
                                .slice(0, 3)
                        },
                    },
                },
            ],
        },
        {
            columns: [
                {
                    span: 24,
                    render: h => {
                        return h(
                            'el-divider',
                            {
                                props: {
                                    'content-position': 'left',
                                },
                            },
                            ['字段联动'],
                        )
                    },
                },
            ],
        },
        {
            columns: [
                {
                    tag: 'select',
                    name: '省份',
                    itemAttrs: {
                        label: '省份',
                    },
                    attrs: {
                        value: '',
                        placeholder: '请选择',
                        filterable: true,
                        options: provincesOptions,
                        onChange: (row, { formActionType: { updateSchema }, formModel }) => {
                            const { value, option } = row

                            let citiesOptions: any = []
                            if (value) {
                                const id = option.id as keyof typeof citiesOptionsData
                                citiesOptions = citiesOptionsData[id]
                            }
                            // 更新其他组件
                            updateSchema('城市', 'attrs.options', citiesOptions)
                            formModel['城市'] = ''
                        },
                    },
                },
                {
                    tag: 'select',
                    name: '城市',
                    itemAttrs: {
                        label: '城市',
                    },
                    attrs: {
                        value: '',
                        placeholder: '请选择',
                        filterable: true,
                        options: [],
                    },
                },
            ],
        },
        {
            columns: [
                {
                    tag: 'radio',
                    name: '设置内容',
                    itemAttrs: {
                        label: '设置内容',
                    },
                    attrs: {
                        value: '',
                        options: [
                            {
                                label: '设置',
                                value: '1',
                            },
                            {
                                label: '还原',
                                value: '2',
                            },
                        ],
                        appendSlotRender: h => {
                            return h(
                                'el-button',
                                {
                                    props: {
                                        type: 'primary',
                                    },
                                    on: {
                                        click: () => {},
                                    },
                                },
                                ['好的'],
                            )
                        },
                        onChange: ({ value }, { formModel, formActionType: { updateSchema } }) => {
                            if (value === '1') {
                                formModel['被设置内容'] = '111'
                                updateSchema('被设置内容', 'attrs.disabled', true)
                                updateSchema('被设置内容', 'itemAttrs.rules', [
                                    {
                                        required: true,
                                        message: '必填',
                                    },
                                ])
                            } else {
                                formModel['被设置内容'] = ''
                                updateSchema('被设置内容', 'attrs.disabled', false)
                                updateSchema('被设置内容', 'itemAttrs.rules', [])
                            }
                        },
                    },
                },
                {
                    tag: 'input',
                    name: '被设置内容',
                    itemAttrs: {
                        label: '被设置内容',
                        rules: [],
                    },
                    attrs: {
                        disabled: false,
                    },
                },
            ],
        },
        {
            columns: [
                {
                    tag: 'radio',
                    name: '控制显示',
                    itemAttrs: {
                        label: '控制显示',
                    },
                    attrs: {
                        value: '1',
                        options: [
                            {
                                label: '显示',
                                value: '1',
                            },
                            {
                                label: '隐藏',
                                value: '2',
                            },
                        ],
                    },
                },
                {
                    tag: 'input',
                    name: '被控制显示',
                    itemAttrs: {
                        label: '被控制显示',
                    },
                    attrs: {},
                    ifRender(formMdel) {
                        return formMdel['控制显示'] === '1'
                    },
                },
            ],
        },
        {
            columns: [
                {
                    tag: 'action',
                    buttons: [
                        {
                            isSubmit: true,
                            type: 'primary',
                            text: '提交',
                        },
                        {
                            isReset: true,
                            type: '',
                            text: '重置',
                        },
                    ],
                },
            ],
        },
    ]
    handleSearch() {
        this.formRef.validate(valid => {
            console.log(valid)
        })
    }
    async syncData(queryString?: any): Promise<any[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    {
                        value: '三全鲜食（北新泾店）',
                        address: '长宁区新渔路144号',
                    },
                    {
                        value: 'Hot honey 首尔炸鸡（仙霞路）',
                        address: '上海市长宁区淞虹路661号',
                    },
                    {
                        value: '新旺角茶餐厅',
                        address: '上海市普陀区真北路988号创邑金沙谷6号楼113',
                    },
                    {
                        value: '泷千家(天山西路店)',
                        address: '天山西路438号',
                    },
                    {
                        value: '胖仙女纸杯蛋糕（上海凌空店）',
                        address: '上海市长宁区金钟路968号1幢18号楼一层商铺18-101',
                    },
                    {
                        value: '贡茶',
                        address: '上海市长宁区金钟路633号',
                    },
                    {
                        value: '豪大大香鸡排超级奶爸',
                        address: '上海市嘉定区曹安公路曹安路1685号',
                    },
                    {
                        value: '茶芝兰（奶茶，手抓饼）',
                        address: '上海市普陀区同普路1435号',
                    },
                    {
                        value: '十二泷町',
                        address: '上海市北翟路1444弄81号B幢-107',
                    },
                    {
                        value: '星移浓缩咖啡',
                        address: '上海市嘉定区新郁路817号',
                    },
                ])
            }, 0)
        })
    }
    created() {}
    mounted() {}
}
</script>

<style lang="less">
// 因为这个是全局的 所以不能放在scoped里
.select-demo {
    .el-select-dropdown__item {
        height: auto;
    }
}
</style>
