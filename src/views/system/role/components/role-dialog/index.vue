<template>
    <el-dialog class="icinfo-ai RoleDialog" :title="title" :visible="true" width="600px" @close="cancel" v-loading="loading">
        <sg-base-form ref="form" v-model="formModel" v-bind="getFormAttrs"></sg-base-form>
        <template v-slot:footer>
            <el-button type="primary" @click="submit" :disabled="loading">确定</el-button>
            <el-button @click="cancel">取消</el-button>
        </template>
    </el-dialog>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { FormColumn, FormRef } from '@/sharegood-ui'
import { save, RoleVO } from '../../api'

@Component({
    name: 'RoleDialog',
    components: {},
})
export default class RoleDialog extends Vue {
    @Prop() id!: string
    @Prop() action!: 'modify' | 'create'
    @Prop({ default: () => ({}) }) row!: RoleVO

    @Ref('form')
    formRef!: FormRef

    loading = false
    formModel: Record<string, any> = {
        id: this.id,
        status: '1',
    }

    get title() {
        return this.action === 'modify' ? '编辑角色' : '新增角色'
    }

    get getFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'input',
                name: 'name',
                itemAttrs: {
                    label: '角色名称：',
                    rules: [{ required: true, message: '请输入角色名称' }],
                },
                attrs: {
                    placeholder: '请输入',
                    maxlength: 50,
                },
            },
            {
                tag: 'input',
                name: 'description',
                itemAttrs: {
                    label: '角色描述：',
                },
                attrs: {
                    type: 'textarea',
                    placeholder: '请输入',
                    maxlength: 200,
                    rows: 4,
                },
            },
            {
                tag: 'select',
                name: 'status',
                itemAttrs: {
                    label: '状态：',
                },
                attrs: {
                    placeholder: '请选择',
                    options: [
                        { label: '启用', value: '1' },
                        { label: '停用', value: '0' },
                    ],
                },
            },
        ]
        return {
            span: 24,
            fields,
        }
    }

    async mounted() {
        if (this.action === 'modify' && this.row) {
            this.$set(this, 'formModel', { ...this.row })
        }
    }

    async submit() {
        try {
            this.loading = true
            await this.formRef.validate()
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
}
</script>

<style lang="less" scoped>
.RoleDialog ::v-deep {
    .el-dialog__body {
        padding: 15px 20px;
    }
}
</style>
