<template>
    <el-dialog class="icinfo-ai MenuDialog" :title="title" :visible="true" width="600px" @close="cancel" v-loading="loading">
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
import { save, MenuVO } from '../../api'

@Component({
    name: 'MenuDialog',
    components: {},
})
export default class MenuDialog extends Vue {
    @Prop() id!: string
    @Prop() action!: 'modify' | 'create'
    @Prop({ default: () => ({}) }) row!: MenuVO
    @Prop({ default: () => ({}) }) parentRow!: MenuVO

    @Ref('form')
    formRef!: FormRef

    loading = false
    formModel: Record<string, any> = {
        id: this.id,
        parentId: this.parentRow?.id,
        status: '1',
    }

    get title() {
        return this.action === 'modify' ? '编辑菜单' : '新增菜单'
    }

    get getFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'input',
                name: 'name',
                itemAttrs: {
                    label: '菜单名称：',
                    rules: [{ required: true, message: '请输入菜单名称' }],
                },
                attrs: {
                    placeholder: '请输入',
                    maxlength: 50,
                },
            },
            {
                tag: 'custom',
                name: 'icon',
                itemAttrs: {
                    label: '图标：',
                },
                appendRender: (h, { row }) => {
                    const onChange = (icon: string) => {
                        this.formModel.icon = icon
                    }
                    return (
                        <div class="icon-select">
                            <el-input value={this.formModel.icon} placeholder="请选择图标" maxlength={50}>
                                <i slot="suffix" class={'el-icon-plus'} style="font-size: 16px"></i>
                            </el-input>
                            <el-popover placement="bottom" width="400" trigger="click">
                                <div class="icon-list">
                                    {[
                                        'el-icon-edit',
                                        'el-icon-share',
                                        'el-icon-delete',
                                        'el-icon-setting',
                                        'el-icon-user',
                                        'el-icon-phone',
                                        'el-icon-star-on',
                                        'el-icon-message',
                                        'el-icon-location',
                                    ].map(icon => (
                                        <el-button
                                            type="text"
                                            info={icon !== this.formModel.icon}
                                            icon={icon}
                                            style="font-size: 18px; margin: 4px; cursor: pointer"
                                            onClick={() => onChange(icon)}
                                        ></el-button>
                                    ))}
                                </div>
                                <el-button slot="reference" type="text">
                                    选择图标
                                </el-button>
                            </el-popover>
                        </div>
                    )
                },
            },
            {
                tag: 'input',
                name: 'uri',
                itemAttrs: {
                    label: '路由地址：',
                    rules: [{ required: true, message: '请输入路由地址' }],
                },
                attrs: {
                    placeholder: '请输入',
                    maxlength: 100,
                },
            },
            {
                tag: 'input-number',

                name: 'sort',
                itemAttrs: {
                    label: '排序：',
                },
                attrs: {
                    placeholder: '请输入',
                    min: 1,
                    'controls-position': 'right',
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
                        { label: '显示', value: '1' },
                        { label: '隐藏', value: '0' },
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
.MenuDialog ::v-deep {
    .el-dialog__body {
        padding: 15px 20px;
    }
}
</style>
