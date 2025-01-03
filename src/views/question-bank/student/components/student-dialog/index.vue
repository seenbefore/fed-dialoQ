<template>
    <el-dialog class="icinfo-ai StudentDialog" component="StudentDialog" :title="title" :visible="true" width="600px" @close="cancel" v-loading="loading">
        <sg-base-form ref="form" v-model="formModel" v-bind="getFormAttrs"></sg-base-form>
        <template v-slot:footer>
            <el-button type="primary" @click="submit" :disabled="loading">确定</el-button>
            <el-button @click="cancel">取消</el-button>
        </template>
    </el-dialog>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import { FormColumn, FormRef, FormRow } from '@/sharegood-ui'
import { save, detail } from '../../api'

@Component({
    name: 'StudentDialog',
    components: {},
})
export default class StudentDialog extends Vue {
    /**
     * 数据唯一标识
     */
    @Prop() id!: string
    /**
     * 操作类型 modify 修改 create 新增
     */
    @Prop({ default: 'modify' }) action!: 'modify' | 'create'

    formModel: Record<string, any> = {}
    loading = false

    @Ref('form')
    formRef!: FormRef

    get title() {
        if (this.action === 'modify') {
            return '编辑考生'
        }
        return '新增考生'
    }

    get getFormAttrs() {
        const fields: FormRow[] = [
            {
                columns: [
                    {
                        span: 24,
                        name: 'area',
                        tag: 'select',
                        attrs: {
                            placeholder: '请选择',
                            value: '浙江省 > 杭州市',
                            disabled: true,
                        },
                        itemAttrs: {
                            label: '地市：',
                            rules: [
                                {
                                    required: true,
                                    message: '请选择地市',
                                },
                            ],
                        },
                    },
                    {
                        span: 24,
                        name: 'examType',
                        tag: 'select',
                        attrs: {
                            placeholder: '请选择',
                            value: '',
                        },
                        itemAttrs: {
                            label: '考试类型：',
                        },
                    },
                    {
                        span: 24,
                        name: 'name',
                        tag: 'input',
                        attrs: {
                            placeholder: '请输入',
                            maxlength: 50,
                        },
                        itemAttrs: {
                            label: '姓名：',
                            rules: [
                                {
                                    required: true,
                                    message: '请填写姓名',
                                },
                            ],
                        },
                    },
                    {
                        span: 24,
                        name: 'phone',
                        tag: 'input',
                        attrs: {
                            placeholder: '请输入',
                            maxlength: 11,
                        },
                        itemAttrs: {
                            label: '手机号码：',
                            rules: [
                                {
                                    required: true,
                                    message: '请填写手机号码',
                                },
                                {
                                    pattern: /^1[3-9]\d{9}$/,
                                    message: '请输入正确的手机号码',
                                },
                            ],
                        },
                    },
                    {
                        span: 24,
                        name: 'idCard',
                        tag: 'input',
                        attrs: {
                            placeholder: '请输入',
                            maxlength: 18,
                        },
                        itemAttrs: {
                            label: '身份证号：',
                            rules: [
                                {
                                    required: true,
                                    message: '请填写身份证号',
                                },
                                {
                                    pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                                    message: '请输入正确的身份证号',
                                },
                            ],
                        },
                    },
                    {
                        span: 24,
                        name: 'nation',
                        tag: 'select',
                        attrs: {
                            placeholder: '请选择',
                            value: '汉族',
                            disabled: true,
                        },
                        itemAttrs: {
                            label: '民族：',
                            rules: [
                                {
                                    required: true,
                                    message: '请选择民族',
                                },
                            ],
                        },
                    },
                    {
                        span: 24,
                        name: 'political',
                        tag: 'radio',
                        attrs: {
                            options: [
                                { label: '中共党员', value: '1' },
                                { label: '共青团员', value: '2' },
                                { label: '民主党派', value: '3' },
                                { label: '其他', value: '4' },
                            ],
                        },
                        itemAttrs: {
                            label: '政治面貌：',
                            rules: [
                                {
                                    required: true,
                                    message: '请选择政治面貌',
                                },
                            ],
                        },
                    },
                    {
                        span: 24,
                        name: 'education',
                        tag: 'radio',
                        attrs: {
                            options: [
                                { label: '高中以下', value: '1' },
                                { label: '高中', value: '2' },
                                { label: '大专', value: '3' },
                                { label: '研究生以上', value: '4' },
                                { label: '本科', value: '5' },
                            ],
                        },
                        itemAttrs: {
                            label: '学历：',
                            rules: [
                                {
                                    required: true,
                                    message: '请选择学历',
                                },
                            ],
                        },
                    },
                    {
                        span: 24,
                        name: 'school',
                        tag: 'input',
                        attrs: {
                            placeholder: '请输入',
                            maxlength: 100,
                        },
                        itemAttrs: {
                            label: '毕业院校：',
                            rules: [
                                {
                                    required: true,
                                    message: '请填写毕业院校',
                                },
                            ],
                        },
                    },
                    {
                        span: 24,
                        name: 'major',
                        tag: 'input',
                        attrs: {
                            placeholder: '请输入',
                            maxlength: 100,
                        },
                        itemAttrs: {
                            label: '所学专业：',
                            rules: [
                                {
                                    required: true,
                                    message: '请填写所学专业',
                                },
                            ],
                        },
                    },
                    {
                        span: 24,
                        name: 'duty',
                        tag: 'input',
                        attrs: {
                            placeholder: '请输入',
                            maxlength: 100,
                        },
                        itemAttrs: {
                            label: '职务：',
                            rules: [
                                {
                                    required: true,
                                    message: '请填写职务',
                                },
                            ],
                        },
                    },
                    {
                        span: 24,
                        name: 'company',
                        tag: 'input',
                        attrs: {
                            placeholder: '请输入',
                            maxlength: 100,
                        },
                        itemAttrs: {
                            label: '工作单位：',
                            rules: [
                                {
                                    required: true,
                                    message: '请填写工作单位',
                                },
                            ],
                        },
                    },
                    {
                        span: 24,
                        name: 'isFireman',
                        tag: 'switch',
                        attrs: {
                            value: '0',
                            'active-value': '1',
                            'inactive-value': '0',
                            'active-text': '是',
                            'inactive-text': '否',
                        },
                        itemAttrs: {
                            label: '消防人员：',
                        },
                    },
                    {
                        span: 24,
                        name: 'workDate',
                        tag: 'date',
                        attrs: {
                            placeholder: 'yyyy-MM-dd',
                            type: 'date',
                            'value-format': 'yyyy-MM-dd',
                        },
                        itemAttrs: {
                            label: '参加工作时间：',
                            rules: [
                                {
                                    required: true,
                                    message: '请选择参加工作时间',
                                },
                            ],
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
        }
    }

    async submit() {
        try {
            this.loading = true
            await this.formRef.validate(null, true)
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
.StudentDialog ::v-deep {
    .el-dialog__body {
        padding: 15px 20px;
    }
}
</style>
