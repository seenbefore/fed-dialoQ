<template>
    <el-dialog class="EditDialog" :visible="true" :title="title" width="600px" @close="handleClose" append-to-body>
        <div class="dialog-content">
            <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel"></sg-base-form>
        </div>
        <template #footer>
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" @click="handleSubmit" :loading="loading">确定</el-button>
        </template>
    </el-dialog>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { FormRow, FormRef } from '@/sharegood-ui'
import { save } from './api'

@Component({
    name: 'EditDialog',
})
export default class EditDialog extends Vue {
    @Prop({ type: Object, default: () => ({}) })
    data!: Record<string, any>

    @Ref('formRef')
    formRef!: FormRef

    loading = false
    formModel: Record<string, any> = {}

    get title() {
        return this.data.id ? '编辑' : '新增'
    }

    get getFormAttrs() {
        const fields: FormRow[] = [
            {
                columns: [
                    {
                        tag: 'input',
                        name: 'fondNumber',
                        itemAttrs: {
                            label: '全宗号',
                            //rules: [{ required: true, message: '请输入全宗号' }],
                        },
                        attrs: {
                            placeholder: '请输入',
                            maxlength: 20,
                        },
                    },
                    {
                        tag: 'select',
                        name: 'fondNumberLimit',
                        itemAttrs: {
                            label: '限定条件',
                            //rules: [{ required: true, message: '请选择限定条件' }],
                        },
                        attrs: {
                            placeholder: '请选择',
                            value: '1',
                            options: [
                                { label: '格式不可编辑', value: '1' },
                                { label: '格式可编辑', value: '2' },
                            ],
                        },
                    },
                ],
            },

            {
                columns: [
                    {
                        tag: 'input',
                        name: 'catalogNumber',
                        itemAttrs: {
                            label: '目录号',
                            //rules: [{ required: true, message: '请输入目录号' }],
                        },
                        attrs: {
                            placeholder: '请输入',
                            maxlength: 20,
                        },
                    },
                    {
                        tag: 'select',
                        name: 'catalogNumberLimit',
                        itemAttrs: {
                            label: '限定条件',
                            //rules: [{ required: true, message: '请选择限定条件' }],
                        },
                        attrs: {
                            placeholder: '请选择',
                            value: '1',
                            options: [
                                { label: '格式不可编辑', value: '1' },
                                { label: '格式可编辑', value: '2' },
                            ],
                        },
                    },
                ],
            },

            {
                columns: [
                    {
                        tag: 'input',
                        name: 'caseNumber',
                        itemAttrs: {
                            label: '案卷号',
                            //rules: [{ required: true, message: '请输入案卷号' }],
                        },
                        attrs: {
                            placeholder: '请输入',
                            maxlength: 20,
                        },
                    },
                    {
                        tag: 'select',
                        name: 'caseNumberLimit',
                        itemAttrs: {
                            label: '限定条件',
                            //rules: [{ required: true, message: '请选择限定条件' }],
                        },
                        attrs: {
                            placeholder: '请选择',
                            value: '1',
                            options: [
                                { label: '自动获取决定书编号', value: '1' },
                                { label: '自动获取立案编号', value: '2' },
                            ],
                        },
                    },
                ],
            },
        ]
        return {
            span: 12,
            labelWidth: 'auto',
            gutter: 20,
            fields,
        }
    }

    mounted() {
        this.$set(this, 'formModel', this.data)
    }

    async handleSubmit() {
        try {
            this.loading = true
            await this.formRef.validate()
            const payload: any = { ...this.formModel }
            await save(payload)
            this.$message.success('保存成功')
            this.$options.confirm?.(this.formModel)
        } catch (error) {
            console.error(error)
        } finally {
            this.loading = false
        }
    }

    handleClose() {
        this.$options.cancel?.()
    }
}
</script>

<style lang="less" scoped>
.EditDialog {
    .dialog-content {
        padding: 20px 0;
    }
}
</style>
