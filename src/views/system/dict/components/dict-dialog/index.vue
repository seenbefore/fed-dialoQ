<template>
    <el-dialog class="icinfo-ai DictDialog" :title="title" :visible="true" width="600px" @close="cancel">
        <sg-base-form ref="form" v-model="formModel" v-bind="getFormAttrs"></sg-base-form>
        <template v-slot:footer>
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="submit" :loading="loading">确定</el-button>
        </template>
    </el-dialog>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { FormColumn, FormRef } from '@/sharegood-ui'
import { save, detail } from '../../api'

@Component({
    name: 'DictDialog',
    components: {},
})
export default class DictDialog extends Vue {
    @Prop({ default: () => ({}) }) row!: any
    @Prop({ default: () => ({}) }) parentRow!: any
    @Prop() id!: string
    @Prop({ default: 'create' }) action!: 'create' | 'modify'

    @Ref('form')
    formRef!: FormRef

    loading = false
    formModel: Record<string, any> = {}

    get title() {
        return this.action === 'create' ? '新增字典' : '编辑字典'
    }

    get getFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'input',
                name: 'parentId',
                itemAttrs: {
                    label: '父级节点',
                },
                attrs: {
                    disabled: this.action === 'create',
                    value: this.parentRow.name || '根',
                },
                ifRender: () => {
                    return this.action === 'create'
                },
            },
            {
                tag: 'input',
                name: 'name',
                itemAttrs: {
                    label: '名称',
                    rules: [
                        { required: true, message: '请输入名称' },
                        { max: 50, message: '最多输入50个字符' },
                    ],
                },
                attrs: {
                    placeholder: '请输入',
                    maxlength: 50,
                },
            },
            {
                tag: 'input',
                name: 'code',
                itemAttrs: {
                    label: '代码值',
                    rules: [
                        { required: true, message: '请输入代码值' },
                        { max: 50, message: '最多输入50个字符' },
                    ],
                },
                attrs: {
                    placeholder: '请输入',
                    maxlength: 50,
                    disabled: this.action === 'modify',
                },
            },
            {
                tag: 'select',
                name: 'type',
                itemAttrs: {
                    label: '类型',
                    rules: [{ required: true, message: '请选择类型' }],
                },
                attrs: {
                    placeholder: '请选择',
                    options: [
                        { label: '系统', value: '系统' },
                        { label: '新闻', value: '新闻' },
                    ],
                },
            },
            {
                tag: 'input',
                name: 'sort',
                itemAttrs: {
                    label: '排序',
                    rules: [{ required: true, message: '请输入排序' }],
                },
                attrs: {
                    placeholder: '请输入',
                    type: 'number',
                },
            },
            {
                tag: 'input',
                name: 'value',
                itemAttrs: {
                    label: '值',
                },
                attrs: {
                    placeholder: '请输入',
                    maxlength: 200,
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
            this.loading = true
            await save(this.formModel)
            this.$message.success('保存成功')
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
        this.$options.confirm?.(true)
    }

    async mounted() {
        if (this.action === 'modify') {
            if (this.row) {
                this.$set(this, 'formModel', this.row)
            } else {
                const { data } = await detail({ id: this.id })
                this.$set(this, 'formModel', data)
            }
        }
    }
}
</script>

<style lang="less" scoped>
.DictDialog ::v-deep {
    .el-dialog__body {
        padding: 15px 20px;
    }
}
</style>
