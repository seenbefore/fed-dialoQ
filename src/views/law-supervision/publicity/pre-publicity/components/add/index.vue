<template>
    <div class="sg-page icinfo-ai PrePublicityAdd">
        <sg-base-form ref="form" v-model="formModel" v-bind="getFormAttrs"></sg-base-form>
        <div class="sg-button-group">
            <el-button type="primary" @click="handleSubmit">确定</el-button>
            <el-button @click="handleCancel">取消</el-button>
        </div>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { FormColumn, FormRef } from '@/sharegood-ui'
import { PublicityStatusEnum, PublicityStatusEnumMap } from '../../enum'
import { save } from '../../api'

@Component({
    name: 'PrePublicityAdd',
    components: {},
})
export default class PrePublicityAdd extends Vue {
    /** 公示类型 */
    @Prop() type!: string

    @Ref('form')
    formRef!: FormRef

    formModel: Record<string, any> = {
        status: PublicityStatusEnum.PUBLISHED,
        publicityInfo: ['businessLine', 'area', 'subjectName', 'subjectType', 'address', 'contact', 'basis'],
        basis: '',
    }

    get getFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'radio',
                name: 'status',
                itemAttrs: {
                    label: '公示状态：',
                },
                attrs: {
                    options: Object.values(PublicityStatusEnumMap),
                },
            },
            {
                tag: 'checkbox',
                name: 'publicityInfo',
                itemAttrs: {
                    label: '公示信息：',
                    rules: [{ required: true, message: '请至少选择一项公示信息' }],
                },
                attrs: {
                    options: [
                        { label: '所属条线领域', value: 'businessLine' },
                        { label: '行政区划', value: 'area' },
                        { label: '执法主体名称', value: 'subjectName' },
                        { label: '执法主体类型', value: 'subjectType' },
                        { label: '地址', value: 'address' },
                        { label: '联系方式', value: 'contact' },
                        { label: '设定依据', value: 'basis' },
                    ],
                },
            },
            {
                tag: 'input',
                name: 'basis',
                itemAttrs: {
                    label: '设定依据：',
                },
                attrs: {
                    type: 'textarea',
                    maxlength: 10000,
                    'show-word-limit': true,
                    rows: 4,
                    placeholder: '请输入设定依据',
                },
            },
        ]
        return {
            span: 24,
            fields,
        }
    }

    async handleSubmit() {
        try {
            await this.formRef.validate()
            await save({
                ...this.formModel,
                type: this.type,
            })
            this.$message.success('保存成功')
            this.$back()
        } catch (error) {
            console.error(error)
        }
    }

    handleCancel() {
        this.$back()
    }
}
</script>

<style lang="less" scoped>
.PrePublicityAdd ::v-deep {
    padding: 0px;
    .sg-button-group {
        margin-top: 20px;
        text-align: center;
    }
}
</style>
