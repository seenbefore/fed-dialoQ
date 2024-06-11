<template>
    <div class="">
        <el-divider content-position="left"><h3>基本用法</h3></el-divider>
        <div>
            <div v-text="tableFormModel"></div>
            <table-form style="margin-top: 10px;" ref="tableForm" v-model="tableFormModel" :fields="tableFormFields" :opera-type="operaType" foot-add-btn-text="新增被查询人"></table-form>
            <el-button type="primary" @click="switchOperaType">{{ operaType === 'edit' ? '切换为只读' : '切换为编辑' }}</el-button>
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button type="primary" @click="insertRow">插入行</el-button>
        </div>
        <br />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import TableForm from '@/components/table-form/index.vue'
import { OperaType, TableFormColumn } from '@/components/table-form/types'

@Component({
    components: { TableForm },
})
export default class BaseDemo extends Vue {
    created() {
        this.getData()
    }
    getContext() {
        return this
    }
    delay(time = 0) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true)
            }, time)
        })
    }

    @Ref('tableForm')
    tableFormRef!: TableForm
    tableFormModel: Record<string, any> = []
    tableFormFields: TableFormColumn[] = [
        { type: 'index', label: '序号', fixed: 'left' },
        {
            label: '授信业务种类',
            prop: 'sxywzl',
            tag: 'select',
            fixed: 'left',
            attrs: {
                placeholder: '请选择授信业务种类',
                options: async () => {
                    await this.delay(1 * 1000)
                    return [
                        { value: '1', label: '贷款' },
                        { value: '2', label: '承兑汇票(敞口)' },
                        { value: '3', label: '贸易融资(敞口)' },
                        { value: '4', label: '其他' },
                        {
                            value: '5',
                            label: '选我会将“抵押物名称”值设置为“房子”',
                        },
                        {
                            value: '6',
                            label: '选我会将“担保方式”的选项改变',
                        },
                    ]
                },
            },
            itemAttrs: {
                rules: [{ required: true, message: '请输入授信业务种类' }],
            },
        },
        {
            label: '金额',
            prop: 'bqje',
            tag: 'el-input-number',
            attrs: {
                placeholder: '请输入金额',
            },
            itemAttrs: {
                rules: [{ required: true, message: '请输入金额' }],
            },
        },
        {
            label: '担保方式',
            prop: 'bqdbfs',
            tag: 'select',
            minWidth: '200px',
            attrs: {
                label: '担保方式',
                placeholder: '请选择担保方式',
                multiple: true,
            },
            linkageRule: {
                watch: ['sxywzl'],
                handler: async ({ values, formItemRef }: any) => {
                    if (values['sxywzl'] === '6') {
                        return {
                            attrs: {
                                options: async () => {
                                    await this.delay(1 * 1000)
                                    return [
                                        { value: '1', label: '我变了抵押' },
                                        { value: '2', label: '我变了信用' },
                                        { value: '3', label: '我变了保证' },
                                    ]
                                },
                            },
                        }
                    }
                    return {
                        attrs: {
                            options: async () => {
                                await this.delay(1 * 1000)
                                return [
                                    { value: '1', label: '抵押' },
                                    { value: '2', label: '信用' },
                                    { value: '3', label: '保证' },
                                ]
                            },
                        },
                    }
                },
            },
        },
        {
            label: '抵押物名称',
            prop: 'bqbzrmc',
            minWidth: '200px',
            tag: 'input',
            attrs: {
                placeholder: '请输入抵押物名称',
                inputSuffixSlotRender: '元',
                inputPrefixSlotRender: '$',
            },
            linkageRule: {
                watch: ['sxywzl'],
                handler: ({ values, formItemRef }: any) => {
                    if (values['sxywzl'] === '5') {
                        return {
                            value: '房子',
                        }
                    }
                    return {
                        value: '',
                    }
                },
            },
        },
        {
            label: 'checkbox',
            prop: 'checkbox',
            tag: 'checkbox',
            minWidth: '300px',
            attrs: {
                placeholder: '请选择checkbox',
                options: async () => {
                    await this.delay(1 * 1000)
                    return [
                        { value: '1', label: 'checkbox1' },
                        { value: '2', label: 'checkbox2' },
                    ]
                },
            },
        },
        {
            label: 'radio',
            prop: 'radio',
            tag: 'radio',
            minWidth: '300px',
            attrs: {
                placeholder: '请选择radio',
                options: async () => {
                    await this.delay(1 * 1000)
                    return [
                        { value: '1', label: '合作伙伴' },
                        { value: '2', label: '政府集体组织' },
                    ]
                },
            },
        },
        {
            label: 'date',
            prop: 'date',
            tag: 'date',
            attrs: {
                valueFormat: 'yyyy-MM-dd',
                placeholder: '请选择',
            },
        },
        {
            label: 'dateRange(只读模式，自定义展示形式)',
            prop: 'dateRange',
            tag: 'date',
            minWidth: '270px',
            itemAttrs: {
                rules: [
                    {
                        required: true,
                        message: '必填',
                    },
                ],
            },
            attrs: {
                type: 'daterange',
                'value-format': 'yyyy-MM-dd',
                'start-placeholder': '开始时间',
                'end-placeholder': '结束时间',
            },
            render: (h: any, data: any) => {
                const value = data.row.dateRange
                return h('span', { style: 'color:red;' }, value ? value.join(' 至 ') : '-')
            },
        },
        {
            label: 'cascader',
            prop: 'cascader',
            tag: 'cascader',
            attrs: {
                placeholder: '请选择cascader',
                options: async () => {
                    await this.delay(1 * 1000)
                    return [
                        { value: '1', label: '合作伙伴' },
                        {
                            value: '2',
                            label: '政府集体组织',
                            children: [
                                {
                                    value: '2-1',
                                    label: '合作伙伴1',
                                },
                                {
                                    value: '2-2',
                                    label: '合作伙伴2',
                                },
                                {
                                    value: '2-3',
                                    label: '合作伙伴3',
                                },
                            ],
                        },
                    ]
                },
            },
        },
        {
            tag: 'el-switch',
            prop: 'switchAA',
            label: 'switchAA',
            attrs: {},
            render: (h: any, data: any) => {
                console.log(data)
                const value = data.row.switchAA
                return value ? '开启' : '未开启'
            },
        },
        {
            tag: 'range',
            prop: 'range',
            label: 'range',
            minWidth: '200px',
            attrs: {},
        },
        {
            label: '操作栏',
            type: 'action',
            width: '120px',
            fixed: 'right',
            ifRender: () => {
                const ctx = this.getContext()
                return ctx.operaType === 'edit'
            },
            render: (h: any, { row, index }: any) => {
                return [
                    {
                        name: '删除',
                        clickHandle: () => {
                            console.log('删除', index)
                            const ctx = this.getContext()
                            ctx.tableFormRef.deleteData(index)
                        },
                    },
                ].map(item =>
                    h(
                        'el-button',
                        {
                            props: { type: 'text' },
                            on: { click: item.clickHandle },
                        },
                        item.name,
                    ),
                )
            },
        },
    ]
    operaType: OperaType = 'edit'
    switchOperaType() {
        this.operaType = this.operaType === 'readonly' ? 'edit' : 'readonly'
    }
    async submit() {
        await this.tableFormRef.validate()
        console.log(this.tableFormModel)
    }
    insertRow() {
        this.tableFormRef.appendData({
            sxywzl: '',
            bqje: 0,
            bqdbfs: '',
            bqbzrmc: '',
            sqje: '',
            sqdbfs: '',
            sqbzrmc: '',
        })
    }
    getData() {
        setTimeout(() => {
            this.tableFormModel = [
                {
                    sxywzl: '1',
                    bqje: 1,
                    bqdbfs: ['1'],
                    bqbzrmc: 'qq',
                    sqje: 'qq',
                    sqdbfs: 'qq',
                    sqbzrmc: 'qq',
                    dateRange: ['2022-09-10', '2023-02-09'],
                    // 指定某一行为不可编辑
                    $$operaType: 'readonly',
                },
                {
                    // sxywzl: '2',
                    bqje: 5,
                    bqdbfs: ['2'],
                    bqbzrmc: 'qq',
                    sqje: 'qq',
                    sqdbfs: 'qq',
                    sqbzrmc: 'qq',
                },
                {
                    // sxywzl: '3',
                    bqje: 6,
                    bqdbfs: ['3'],
                    bqbzrmc: 'qq',
                    sqje: 'qq',
                    sqdbfs: 'qq',
                    sqbzrmc: 'qq',
                },
            ]
        }, 1000)
    }
}
</script>

<style lang="less" scoped>
p,
h3 {
    margin: 0;
}
</style>
