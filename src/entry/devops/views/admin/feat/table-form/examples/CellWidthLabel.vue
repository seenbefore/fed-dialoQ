<template>
    <div class="">
        <el-divider content-position="left"><h3>单元格里具有label</h3></el-divider>
        <div>
            <div v-text="tableFormModel"></div>
            <table-form style="margin-top: 10px;" ref="tableForm" v-model="tableFormModel" :fields="tableFormFields" :opera-type="operaType"></table-form>
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
        { type: 'index', label: '序号' },
        {
            label: '类型',
            prop: 'type',
            minWidth: '100px',
            tag: 'select',
            attrs: {
                placeholder: '请选择类型',
                options: () => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            resolve([
                                { value: '1', label: '厂方' },
                                { value: '2', label: '车辆' },
                                { value: '3', label: '设备' },
                                { value: '4', label: '知识产权' },
                            ])
                        }, 1 * 1000)
                    })
                },
            },
            itemAttrs: {
                rules: [{ required: true, message: '请输入类型' }],
            },
        },
        {
            label: '基本情况',
            prop: 'baseSituation',
            minWidth: '150px',
            tag: 'input',
            attrs: {
                placeholder: '请输入基本情况',
            },
        },
        {
            label: '资产价值（填写估值）合并表头',
            prop: 'propertyCostArea',
            tag: 'el-input-number',
            width: '250px',
            headerColspan: 2,
            attrs: {
                placeholder: '请输入面积',
            },
            itemAttrs: {
                label: '面积',
                rules: [{ required: true, message: '请输入面积' }],
            },
        },
        {
            label: '资产价值（填写估值）',
            prop: 'propertyCost',
            tag: 'el-input-number',
            width: '280px',
            attrs: {
                placeholder: '请输入现值',
            },
            itemAttrs: {
                label: '现值 (万元)',
                rules: [{ required: true, message: '请输入现值' }],
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
