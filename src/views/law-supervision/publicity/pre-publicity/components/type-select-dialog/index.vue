<template>
    <el-dialog class="icinfo-ai TypeSelectDialog" title="选择公示类型" :visible="true" width="500px" @close="cancel">
        <sg-base-form ref="form" v-model="formModel" v-bind="getFormAttrs"></sg-base-form>
        <template v-slot:footer>
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="submit">确定</el-button>
        </template>
    </el-dialog>
</template>

<script lang="tsx">
import { Component, Vue, Ref } from 'vue-property-decorator'
import { FormColumn, FormRef } from '@/sharegood-ui'
import { PublicityTypeEnum, PublicityTypeEnumMap } from '../../enum'

@Component({
    name: 'TypeSelectDialog',
    components: {},
})
export default class TypeSelectDialog extends Vue {
    @Ref('form')
    formRef!: FormRef

    formModel: Record<string, any> = {
        type: '',
    }

    get getFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'select',
                name: 'type',
                itemAttrs: {
                    label: '公示类型：',
                    rules: [{ required: true, message: '请选择公示类型' }],
                },
                attrs: {
                    placeholder: '请选择',
                    options: Object.values(PublicityTypeEnumMap),
                },
            },
        ]
        return {
            span: 24,
            fields,
        }
    }

    async submit() {
        try {
            await this.formRef.validate()
            this.confirm()
        } catch (error) {
            console.error(error)
        }
    }

    cancel() {
        this.$options.cancel?.()
    }

    confirm() {
        this.$options.confirm?.(this.formModel.type)
    }
}
</script>

<style lang="less" scoped>
.TypeSelectDialog ::v-deep {
    .el-dialog__body {
        padding: 15px 20px;
    }
}
</style>
