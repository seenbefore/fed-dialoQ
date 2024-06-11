<!--  -->
<template>
    <el-dialog
        ref="dialog"
        :title="myTitle"
        visible
        class="AuditDialog sg-dialog"
        :fullscreen="false"
        :append-to-body="false"
        :close-on-click-modal="false"
        width="1000px"
        v-bind="$attrs"
        @close="cancel"
    >
        <div class="AuditDialog__content">
            {{ formModel }}
            <sg-base-form ref="formRef" v-model="formModel" v-bind="formAttrs"></sg-base-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleSubmit" :loading="View.loading">提交</el-button>
            <el-button type="" @click="cancel">取消</el-button>
        </div>
    </el-dialog>
</template>
<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { FormRef, FormRow } from '@/sharegood-ui'

interface FormModel {
    name?: string
}
@Component({
    name: 'AuditDialog',
    components: {},
})
export default class AuditDialog extends Vue {
    formModel = {}

    async created() {}
    /**
     * 通过 pass 退回 back 否决 reject
     */
    @Prop({ type: String, default: '' }) action!: 'pass' | 'back' | 'reject'
    @Prop({ type: String }) title!: string
    @Prop({ type: Object }) row: any
    @Prop({ default: false }) isEdit!: boolean

    get myTitle() {
        if (this.isEdit) {
            return '修改'
        }
        return '创建'
    }
    View = {
        loading: false,
    }
    get formAttrs() {
        let fields = [] as FormRow[]
        const passFields = [
            {
                columns: [
                    {
                        span: 24,
                        render: () => {
                            return (
                                <div class="ic-row">
                                    <div class="ic-headline ic-col-flex-1">
                                        <div class="ic-line success"></div>
                                        <div class="title">
                                            <span class=" ic-font-16">正在通过</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        span: 24,
                        tag: 'radio',
                        name: '是否短信通知申请人',
                        itemAttrs: {
                            label: '是否短信通知申请人',
                            labelWidth: '200px',
                            rules: [
                                {
                                    required: true,
                                    message: '必填',
                                },
                            ],
                        },
                        attrs: {
                            options: [
                                {
                                    label: '是',
                                    value: '是',
                                },
                                {
                                    label: '否',
                                    value: '否',
                                },
                            ],
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        span: 24,
                        tag: 'input',
                        name: '审批意见',
                        itemAttrs: {
                            label: '审批意见',
                            rules: [
                                {
                                    required: true,
                                    message: '必填',
                                },
                            ],
                        },
                        attrs: {
                            type: 'textarea',
                            rows: 3,
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        span: 24,
                        tag: () => import('./rules-field.vue'),
                        name: '授信落实条件',
                        itemAttrs: {
                            autoTriggerSubComponentValidate: true,
                            label: '',
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        span: 24,
                        tag: 'input',
                        name: '其他',
                        itemAttrs: {
                            label: '其他',
                        },
                        attrs: {
                            type: 'textarea',
                            rows: 3,
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        span: 24,
                        render: () => {
                            return (
                                <div class="ic-row middle" style={{ background: '#F4F8FC', 'border-radius': '4px', height: '40px', padding: '0 15px' }}>
                                    <div class="ic-col-flex-1">
                                        <span>审批人：</span>
                                        <span>张三三</span>
                                    </div>
                                    <div class="ic-col-flex-1" style={{ 'text-align': 'center' }}>
                                        <span>大卡萨丁林科大</span>
                                    </div>
                                    <div class="ic-col-flex-1" style={{ 'text-align': 'right' }}>
                                        <span>审批日期：</span>
                                        <span>张三222三</span>
                                    </div>
                                </div>
                            )
                        },
                    },
                ],
            },
        ] as FormRow[]
        const backFields = [
            {
                columns: [
                    {
                        span: 24,
                        render: () => {
                            return (
                                <div class="ic-row">
                                    <div class="ic-headline ic-col-flex-1">
                                        <div class="ic-line "></div>
                                        <div class="title">
                                            <span class=" ic-font-16">正在退回</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        span: 24,
                        tag: 'radio',
                        name: '是否短信通知申请人',
                        itemAttrs: {
                            label: '是否短信通知申请人',
                            labelWidth: '200px',
                            rules: [
                                {
                                    required: true,
                                    message: '必填',
                                },
                            ],
                        },
                        attrs: {
                            options: [
                                {
                                    label: '是',
                                    value: '是',
                                },
                                {
                                    label: '否',
                                    value: '否',
                                },
                            ],
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        span: 24,
                        tag: 'input',
                        name: '审批意见',
                        itemAttrs: {
                            label: '审批意见',
                            rules: [
                                {
                                    required: true,
                                    message: '必填',
                                },
                            ],
                        },
                        attrs: {
                            type: 'textarea',
                            rows: 3,
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        span: 24,
                        render: () => {
                            return (
                                <div class="ic-row middle" style={{ background: '#F4F8FC', 'border-radius': '4px', height: '40px', padding: '0 15px' }}>
                                    <div class="ic-col-flex-1">
                                        <span>审批人：</span>
                                        <span>张三三</span>
                                    </div>
                                    <div class="ic-col-flex-1" style={{ 'text-align': 'center' }}>
                                        <span>大卡萨丁林科大</span>
                                    </div>
                                    <div class="ic-col-flex-1" style={{ 'text-align': 'right' }}>
                                        <span>审批日期：</span>
                                        <span>张三222三</span>
                                    </div>
                                </div>
                            )
                        },
                    },
                ],
            },
        ] as FormRow[]
        const rejectFields = [
            {
                columns: [
                    {
                        span: 24,
                        render: () => {
                            return (
                                <div class="ic-row">
                                    <div class="ic-headline ic-col-flex-1">
                                        <div class="ic-line danger"></div>
                                        <div class="title">
                                            <span class=" ic-font-16">正在否决</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        span: 24,
                        tag: 'radio',
                        name: '是否短信通知申请人',
                        itemAttrs: {
                            label: '是否短信通知申请人',
                            labelWidth: '200px',
                            rules: [
                                {
                                    required: true,
                                    message: '必填',
                                },
                            ],
                        },
                        attrs: {
                            options: [
                                {
                                    label: '是',
                                    value: '是',
                                },
                                {
                                    label: '否',
                                    value: '否',
                                },
                            ],
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        span: 24,
                        tag: 'input',
                        name: '审批意见',
                        itemAttrs: {
                            label: '审批意见',
                            rules: [
                                {
                                    required: true,
                                    message: '必填',
                                },
                            ],
                        },
                        attrs: {
                            type: 'textarea',
                            rows: 3,
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        span: 24,
                        render: () => {
                            return (
                                <div class="ic-row middle" style={{ background: '#F4F8FC', 'border-radius': '4px', height: '40px', padding: '0 15px' }}>
                                    <div class="ic-col-flex-1">
                                        <span>审批人：</span>
                                        <span>张三三</span>
                                    </div>
                                    <div class="ic-col-flex-1" style={{ 'text-align': 'center' }}>
                                        <span>大卡萨丁林科大</span>
                                    </div>
                                    <div class="ic-col-flex-1" style={{ 'text-align': 'right' }}>
                                        <span>审批日期：</span>
                                        <span>张三222三</span>
                                    </div>
                                </div>
                            )
                        },
                    },
                ],
            },
        ] as FormRow[]
        // 根据三种操作返回不同的表单域
        if (this.action === 'back') {
            fields = [...backFields]
        } else if (this.action === 'reject') {
            fields = [...rejectFields]
        } else if (this.action === 'pass') {
            fields = [...passFields]
        }
        return {
            span: 24,
            labelWidth: '120px',
            fields: [...fields],
        }
    }

    cancel() {
        const $options: any = this.$options
        $options.cancel('取消/关闭')
    }
    confirm() {
        const $options: any = this.$options
        $options.confirm('确定')
    }
    handleSubmit() {
        this.handleUpdate()
    }
    async handleUpdate() {
        const ref = this.$refs.formRef as FormRef

        ref.validate(async valid => {
            if (valid) {
                try {
                    this.View.loading = true

                    this.View.loading = false
                    this.$message.success('修改成功')
                    //this.confirm()
                } catch (err) {
                } finally {
                    this.View.loading = false
                }
            } else {
                this.$message.warning('数据有误')
            }
        })
    }

    public formatData(data: any = {}) {
        const result = { ...data }

        return result
    }
    public parseData(data: any = {}) {
        const result = { ...data }

        return result
    }
}
</script>

<style lang="less" scoped>
.AuditDialog ::v-deep {
    .el-dialog__body {
        padding: 10px 20px;
    }
}
</style>
