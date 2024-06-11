<template>
    <div class="">
        <el-divider content-position="left"><h3>多级表头</h3></el-divider>
        <div>
            <div v-text="tableFormModel"></div>
            <table-form style="margin-top: 10px;" ref="tableForm" v-model="tableFormModel" :fields="tableFormFields" :opera-type="operaType"></table-form>
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
export default class MultiHeaderDemo extends Vue {
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
        { type: 'index', label: '序号' },
        {
            label: '授信业务种类',
            prop: 'sxywzl',
            tag: 'select',
            attrs: {
                placeholder: '请选择授信业务种类',
                options: () => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            console.log('调用option成功')
                            resolve([
                                { value: '1', label: '贷款' },
                                { value: '2', label: '承兑汇票(敞口)' },
                                { value: '3', label: '贸易融资(敞口)' },
                                { value: '4', label: '其他' },
                            ])
                        }, 1 * 1000)
                    })
                },
            },
            itemAttrs: {
                rules: [{ required: true, message: '请输入授信业务种类' }],
            },
        },
        {
            label: '本期授信方案',
            children: [
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
                    attrs: {
                        label: '担保方式',
                        placeholder: '请选择担保方式',
                        multiple: true,
                        options: () => {
                            return new Promise(resolve => {
                                setTimeout(() => {
                                    console.log('请选择担保方式,调用option')
                                    resolve([
                                        { value: '1', label: '抵押' },
                                        { value: '2', label: '信用' },
                                        { value: '3', label: '保证' },
                                    ])
                                }, 1 * 1000)
                            })
                        },
                    },
                    render: (h: any, { row, dataList, selecteds }: any) => {
                        console.log('render: extra,dataList')
                        console.log(dataList)
                        console.log(selecteds)
                        return h('span', { style: 'color:red;' }, selecteds.map((item: any) => item.label).join())
                    },

                    linkageRule: {
                        watch: ['sxywzl'],
                        handler: ({ values, formItemRef }: any) => {
                            if (values['sxywzl'] === '1') {
                                return {
                                    value: [],
                                    attrs: {
                                        options: [{ value: '1', label: '111抵押' }],
                                    },
                                }
                            }
                            return {
                                value: ['2'],
                                attrs: {
                                    options: [
                                        { value: '1', label: '抵押' },
                                        { value: '2', label: '信用' },
                                        { value: '3', label: '保证' },
                                    ],
                                },
                            }
                        },
                    },
                },
                {
                    label: '保证人/抵押物名称',
                    prop: 'bqbzrmc',
                    tag: 'input',
                    headerColspan: 2,
                    attrs: {
                        placeholder: '请输入授信业务种类',
                    },
                },
                {
                    label: 'checkbox',
                    prop: 'checkbox',
                    tag: 'checkbox',
                    attrs: {
                        placeholder: '请选择checkbox',
                        options: () => {
                            return new Promise(resolve => {
                                setTimeout(() => {
                                    resolve([
                                        { value: '1', label: 'checkbox1' },
                                        { value: '2', label: 'checkbox2' },
                                    ])
                                }, 1 * 1000)
                            })
                        },
                    },
                },
                {
                    label: 'radio',
                    prop: 'radio',
                    tag: 'radio',
                    attrs: {
                        placeholder: '请选择radio',
                        options: () => {
                            return new Promise(resolve => {
                                setTimeout(() => {
                                    resolve([
                                        { value: '1', label: '合作伙伴' },
                                        { value: '2', label: '政府集体组织' },
                                    ])
                                }, 1 * 1000)
                            })
                        },
                    },
                },
                {
                    label: 'date',
                    prop: 'date',
                    tag: 'date',
                    attrs: {
                        valueFormat: 'yyyy-MM-dd',
                        placeholder: '请选择date',
                    },
                },
                {
                    label: 'cascader',
                    prop: 'cascader',
                    tag: 'cascader',
                    attrs: {
                        placeholder: '请选择cascader',
                        options: () => {
                            return new Promise(resolve => {
                                setTimeout(() => {
                                    resolve([
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
                                    ])
                                }, 1 * 1000)
                            })
                        },
                    },
                },
            ],
        },
        {
            label: '上期授信方案',
            ifRender: () => {
                const ctx = this.getContext()
                return ctx.operaType === 'readonly'
            },
            children: [
                {
                    label: '金额',
                    prop: 'sqje',
                    ifRender: () => {
                        const ctx = this.getContext()
                        return ctx.operaType === 'readonly'
                    },
                },
                {
                    label: '担保方式',
                    prop: 'sqdbfs',
                },
                {
                    label: '保证人/抵押物名称',
                    prop: 'sqbzrmc',
                },
            ],
        },
        {
            label: '操作栏',
            prop: 'action',
            width: '90px',
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
                    sxywzl: '2',
                    bqje: 5,
                    bqdbfs: ['2'],
                    bqbzrmc: 'qq',
                    sqje: 'qq',
                    sqdbfs: 'qq',
                    sqbzrmc: 'qq',
                },
                {
                    sxywzl: '3',
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
