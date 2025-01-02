<template>
    <el-dialog title="新增字典类型" :visible="true" width="500px" :close-on-click-modal="false" :show-close="true" @close="handleClose">
        <sg-base-form ref="form" v-model="formModel" v-bind="getFormAttrs"></sg-base-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" :loading="loading" @click="handleSubmit">确定</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { FormRef, FormColumn } from '@/sharegood-ui'
import { save } from '../../api'

@Component
export default class TypeDialog extends Vue {
    @Prop({ type: String, default: 'create' }) readonly action!: string
    @Prop({ type: Object, default: () => ({}) }) readonly row!: any

    @Ref('form')
    formRef!: FormRef

    loading = false
    formModel: Record<string, any> = {}

    get getFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'input',
                name: 'name',
                itemAttrs: {
                    label: '名称',
                    rules: [{ required: true, message: '请输入名称' }],
                },
                attrs: {
                    placeholder: '请输入名称',
                },
            },
            {
                tag: 'input',
                name: 'code',
                itemAttrs: {
                    label: '编码',
                    rules: [
                        { required: true, message: '请输入编码' },
                        { pattern: /^[a-z_]+$/, message: '编码只能包含小写字母和下划线' },
                    ],
                },
                attrs: {
                    placeholder: '请输入编码',
                },
            },
            {
                tag: 'input',
                name: 'description',
                itemAttrs: {
                    label: '描述',
                },
                attrs: {
                    type: 'textarea',
                    rows: 3,
                    placeholder: '请输入描述',
                },
            },
        ]

        return {
            span: 24,
            fields,
        }
    }

    created() {
        if (this.action === 'modify') {
            this.formModel = { ...this.row }
        }
    }

    async handleSubmit() {
        try {
            await this.formRef.validate()
            this.loading = true

            await save(this.formModel)
            this.$message.success('保存成功')
            this.$options.confirm?.(true)
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
.el-dialog {
    ::v-deep {
        .el-dialog__header {
            padding: 15px 20px;
            margin: 0;
            border-bottom: 1px solid #e8e8e8;
        }

        .el-dialog__body {
            padding: 20px;
        }

        .el-dialog__footer {
            padding: 15px 20px;
            border-top: 1px solid #e8e8e8;
        }
    }
}
</style>
