<template>
    <el-dialog class="icinfo-ai ModifyDialog" title="修改" :visible="true" width="500px" @close="cancel">
        <sg-base-form ref="formRef" v-model="formModel" v-bind="getFormAttrs"></sg-base-form>
        <template v-slot:footer>
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="submit" :loading="loading">确定</el-button>
        </template>
    </el-dialog>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { FormRow, FormRef } from '@/sharegood-ui'

@Component({
    name: 'ModifyDialog',
    components: {},
})
export default class ModifyDialog extends Vue {
    @Ref('formRef')
    formRef!: FormRef

    loading = false
    formModel: Record<string, any> = {}

    get getFormAttrs() {
        const fields: FormRow[] = [
            {
                columns: [
                    {
                        tag: 'input',
                        name: 'modifyContent',
                        itemAttrs: {
                            label: '',
                            rules: [
                                {
                                    required: true,
                                    message: '请输入修改电子卷宗的内容',
                                },
                            ],
                        },
                        attrs: {
                            type: 'textarea',
                            placeholder: '请输入修改电子卷宗的内容，供档案管理员审批',
                            maxlength: 1000,
                            rows: 4,
                            'show-word-limit': true,
                        },
                    },
                ],
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
            this.loading = true
            this.confirm()
        } catch (error) {
            console.error(error)
        } finally {
            this.loading = false
        }
    }

    cancel() {
        this.$options.cancel?.()
    }

    confirm() {
        this.$options.confirm?.(this.formModel)
    }
}
</script>

<style lang="less" scoped>
.ModifyDialog ::v-deep {
    .el-dialog__body {
        padding: 15px 20px;
    }
}
</style>
