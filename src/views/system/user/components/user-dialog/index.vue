<template>
    <el-dialog class="icinfo-ai UserDialog" :title="title" :visible="true" width="600px" @close="cancel" v-loading="loading">
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
import { save, UserVO } from '../../api'

@Component({
    name: 'UserDialog',
    components: {},
})
export default class UserDialog extends Vue {
    @Prop() id!: string
    @Prop() action!: 'modify' | 'create'
    @Prop({ default: () => ({}) }) row!: UserVO

    @Ref('form')
    formRef!: FormRef

    loading = false
    formModel: Record<string, any> = {
        id: this.id,
        status: '1',
    }

    get title() {
        return this.action === 'modify' ? '编辑用户' : '新增用户'
    }

    get getFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'cascader',
                name: 'area',
                itemAttrs: {
                    label: '区划：',
                    rules: [{ required: true, message: '请选择区划' }],
                },
                attrs: {
                    placeholder: '请选择',
                    options: [
                        {
                            value: 'zhejiang',
                            label: '浙江省',
                            children: [
                                {
                                    value: 'shaoxing',
                                    label: '绍兴市',
                                },
                            ],
                        },
                    ],
                    props: {
                        value: 'value',
                        label: 'label',
                        emitPath: false,
                    },
                },
            },
            {
                tag: 'input',
                name: 'name',
                itemAttrs: {
                    label: '姓名：',
                    rules: [{ required: true, message: '请输入姓名' }],
                },
                attrs: {
                    placeholder: '请输入',
                    maxlength: 50,
                },
            },
            {
                tag: 'input',
                name: 'mobile',
                itemAttrs: {
                    label: '手机号码：',
                    rules: [
                        { required: true, message: '请输入手机号码' },
                        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' },
                    ],
                },
                attrs: {
                    placeholder: '请输入',
                    maxlength: 11,
                },
            },
            {
                tag: 'select',
                name: 'role',
                itemAttrs: {
                    label: '角色：',
                    rules: [{ required: true, message: '请选择角色' }],
                },
                attrs: {
                    placeholder: '请选择',
                    options: [
                        { label: '系统管理员', value: '系统管理员' },
                        { label: '地市管理员', value: '地市管理员' },
                    ],
                },
            },
            {
                tag: 'input',
                name: 'remark',
                itemAttrs: {
                    label: '备注：',
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
        this.$emit('cancel')
    }

    confirm() {
        this.$emit('confirm', true)
    }
}
</script>

<style lang="less" scoped>
.UserDialog ::v-deep {
    .el-dialog__body {
        padding: 15px 20px;
    }
}
</style>
