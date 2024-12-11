<template>
    <el-dialog class="icinfo-ai DepartmentDialog" component="DepartmentDialog" :title="title" :visible="true" width="600px" @close="cancel">
        <sg-base-form ref="form" v-model="formModel" v-bind="getFormAttrs" v-loading="loading"></sg-base-form>
        <template v-slot:footer>
            <el-button type="primary" @click="submit" :disabled="loading">确定</el-button>
            <el-button @click="cancel">取消</el-button>
        </template>
    </el-dialog>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import { FormColumn, FormRef, FormRow } from '@/sharegood-ui'
import { StatusEnum, StatusEnumMap } from '../../enum'
import { save, detail } from '../../api'

@Component({
    name: 'DepartmentDialog',
    components: {},
})
export default class DepartmentDialog extends Vue {
    /**
     * 数据唯一标识
     */
    @Prop() id!: string
    /**
     * 操作类型 modify 修改 create 新增
     */
    @Prop({ default: 'modify' }) action!: 'modify' | 'create'
    /**
     * 父级部门ID
     */
    @Prop() parentId!: string

    formModel: Record<string, any> = {}
    loading = false

    @Ref('form')
    formRef!: FormRef

    get title() {
        if (this.action === 'modify') {
            return '编辑部门'
        }
        return '新增部门'
    }

    get getFormAttrs() {
        const fields: FormRow[] = [
            {
                columns: [
                    {
                        span: 24,
                        name: 'name',
                        tag: 'input',
                        attrs: {
                            placeholder: '请输入',
                            maxlength: 50,
                        },
                        itemAttrs: {
                            label: '部门名称：',
                            rules: [
                                {
                                    required: true,
                                    message: '请填写部门名称',
                                },
                            ],
                        },
                    },
                    {
                        span: 24,
                        name: 'status',
                        tag: 'radio',
                        attrs: {
                            options: Object.values(StatusEnumMap),
                        },
                        itemAttrs: {
                            label: '状态：',
                            rules: [
                                {
                                    required: true,
                                    message: '请选择状态',
                                },
                            ],
                        },
                    },
                    {
                        span: 24,
                        name: 'description',
                        tag: 'input',
                        attrs: {
                            type: 'textarea',
                            placeholder: '请输入',
                            maxlength: 200,
                            rows: 4,
                            'show-word-limit': true,
                        },
                        itemAttrs: {
                            label: '描述：',
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

    async created() {
        if (this.id) {
            try {
                this.loading = true
                const { data } = await detail({ id: this.id })
                this.$set(this, 'formModel', data)
            } catch (error) {
                console.error(error)
            } finally {
                this.loading = false
            }
        } else {
            this.formModel.status = StatusEnum.ENABLED
            this.formModel.parentId = this.parentId
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

<style scoped lang="less">
.DepartmentDialog ::v-deep {
    .el-dialog__body {
        padding: 15px 20px;
    }
}
</style>
