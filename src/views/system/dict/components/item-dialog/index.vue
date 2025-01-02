<template>
    <el-dialog title="新增字典项" :visible="true" width="500px" :close-on-click-modal="false" :show-close="true" @close="handleClose">
        <sg-base-form ref="form" v-model="formModel" v-bind="getFormAttrs"></sg-base-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" :loading="loading" @click="handleSubmit">确定</el-button>
        </div>
    </el-dialog>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { FormRef, FormColumn } from '@/sharegood-ui'
import { save } from '../../api'

@Component
export default class ItemDialog extends Vue {
    @Prop({ type: String, default: 'create' }) readonly action!: string
    @Prop({ type: Object, default: () => ({}) }) readonly row!: any
    @Prop({ type: String, default: '' }) readonly dictType!: string

    @Ref('form')
    formRef!: FormRef

    loading = false
    formModel: Record<string, any> = {
        sort: 999,
        status: '1',
        color: 'blue',
    }

    get getFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'input',
                name: 'name',
                itemAttrs: {
                    label: '标签',
                    rules: [{ required: true, message: '请输入标签' }],
                },
                attrs: {
                    placeholder: '请输入标签',
                },
            },
            {
                tag: 'input',
                name: 'value',
                itemAttrs: {
                    label: '值',
                    rules: [{ required: true, message: '请输入值' }],
                },
                attrs: {
                    placeholder: '请输入值',
                },
            },
            {
                tag: 'input',
                name: 'color',
                itemAttrs: {
                    label: '标签颜色',
                },
                attrs: {
                    placeholder: 'blue',
                    class: 'sg-flexbox align-center',
                },
                appendRender: () => {
                    return (
                        <div class="sg-ml-3 sg-flexbox align-center">
                            <el-color-picker value={this.formModel.color} onChange={value => (this.formModel.color = value)} />
                        </div>
                    )
                },
            },
            {
                tag: 'input-number',
                name: 'sort',
                itemAttrs: {
                    label: '排序',
                },
                attrs: {
                    min: 0,
                    max: 999,
                    'controls-position': 'right',
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
            {
                tag: 'switch',
                name: 'status',
                itemAttrs: {
                    label: '状态',
                },
                attrs: {
                    'active-value': '1',
                    'inactive-value': '0',
                    'active-text': '启用',
                },
            },
        ]

        return {
            span: 24,
            fields,
        }
    }

    created() {
        this.formModel.dictType = this.dictType
        if (this.action === 'modify') {
            this.formModel = { ...this.formModel, ...this.row }
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
