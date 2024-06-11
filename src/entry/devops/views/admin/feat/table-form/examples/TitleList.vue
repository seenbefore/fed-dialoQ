<template>
    <div class="">
        <el-divider content-position="left"><h3>具有标题的表单列表</h3></el-divider>
        <div>
            <div v-text="tableFormModel"></div>
            <table-form style="margin-top: 10px;" ref="tableForm" theme-style="single-table" v-model="tableFormModel" :fields="tableFormFields" :opera-type="operaType"></table-form>
            <el-button type="primary" @click="switchOperaType">{{ operaType === 'edit' ? '切换为只读' : '切换为编辑' }}</el-button>
            <el-button type="primary" @click="submit">提交</el-button>
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
    created() {}
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
    tableFormModel: Record<string, any> = [
        {
            type: '1',
            baseSituation: '',
            propertyCostArea: '',
            propertyCost: '',
        },
        {
            type: '2',
            baseSituation: '',
            propertyCostArea: '',
            propertyCost: '',
        },
    ]
    tableFormFields: TableFormColumn[] = [
        {
            type: 'index',
            label: '贷款（企业）',
            headerColspan: 4,
            headerAlign: 'left',
            className: 'single-cell',
        },
        {
            label: '金额',
            prop: 'bqje',
            minWidth: '80px',
            tag: 'el-input-number',
            attrs: {
                placeholder: '请输入金额',
            },
            itemAttrs: {
                label: '金额',
                rules: [{ required: true, message: '请输入金额' }],
            },
        },
        {
            label: '担保方式',
            prop: 'bqdbfs',
            minWidth: '80px',
            tag: 'select',
            attrs: {
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
            itemAttrs: {
                label: '担保方式',
            },
            render: (h: any, { row, dataList, selecteds }: any) => {
                console.log('render: extra,dataList')
                console.log(dataList)
                console.log(selecteds)
                return h('span', { style: 'color:red;' }, selecteds.map((item: any) => item.label).join())
            },
        },
        {
            label: '保证人/抵押物名称',
            prop: 'bqbzrmc',
            minWidth: '80px',
            tag: 'input',
            attrs: {
                placeholder: '请输入授信业务种类',
            },
            itemAttrs: {
                label: '保证人/抵押物名称',
            },
        },
        {
            label: '操作栏',
            type: 'action',
            width: '90px',
            headerAlign: 'right',
            align: 'right',
            ifRender: () => {
                const ctx = this.getContext()
                return ctx.operaType === 'edit'
            },
            headerRender: (h: any, { column, index }: any) => {
                return [
                    {
                        name: '新增',
                        clickHandle: () => {
                            console.log('新增', index)
                            const ctx = this.getContext()
                            ctx.tableFormRef.appendData()
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
}
</script>

<style lang="less" scoped>
p,
h3 {
    margin: 0;
}
</style>
