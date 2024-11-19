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
                        name: 'allNumber',
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
                        name: 'allNumberCondition',
                        itemAttrs: {
                            label: '限定条件',
                            //rules: [{ required: true, message: '请选择限定条件' }],
                        },
                        attrs: {
                            placeholder: '请选择',
                            options: [
                                { label: '格式不可编辑且不自动续编', value: '1' },
                                { label: '格式不可编辑且自动续编', value: '2' },
                                { label: '格式可编辑且不自动续编', value: '3' },
                                { label: '格式可编辑且自动续编', value: '4' },
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
                        name: 'catalogNumberCondition',
                        itemAttrs: {
                            label: '限定条件',
                            //rules: [{ required: true, message: '请选择限定条件' }],
                        },
                        attrs: {
                            placeholder: '请选择',
                            options: [
                                { label: '格式不可编辑且不自动续编', value: '1' },
                                { label: '格式不可编辑且自动续编', value: '2' },
                                { label: '格式可编辑且不自动续编', value: '3' },
                                { label: '格式可编辑且自动续编', value: '4' },
                                { label: '格式可编辑且自动续编（默认值）', value: '5' },
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
                        name: 'caseNumberCondition',
                        itemAttrs: {
                            label: '限定条件',
                            //rules: [{ required: true, message: '请选择限定条件' }],
                        },
                        attrs: {
                            placeholder: '请选择',
                            options: [{ label: '自动获取决定书编号', value: '1' }],
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

    created() {
        this.formModel = { ...this.data }
    }

    async handleSubmit() {
        try {
            this.loading = true
            await this.formRef.validate()
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
