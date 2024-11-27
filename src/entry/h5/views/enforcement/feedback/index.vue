<template>
    <div class="enforcement-feedback">
        <div class="content">
            <app-form ref="formRef" v-model="formData" :fields="groupFields" :show-foot-btns="false" />
        </div>
        <div class="footer">
            <van-button block type="primary" :loading="submitting" loading-text="提交中" :disabled="submitting" @click="handleSubmit">
                提交
            </van-button>
        </div>
    </div>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import { mockSubmitFeedback } from './api'

@Component({
    name: 'EnforcementFeedback',
})
export default class EnforcementFeedback extends Vue {
    private formRef: any = null
    private submitting = false

    private formData = {
        domain: '',
        caseType: '',
        enforcementDomain: '',
        enforcementType: '',
        enforcementItem: '',
        handleMethod: '',
        handleNote: '',
        attachments: [],
        proofFiles: [],
    }

    get groupFields() {
        return [
            {
                groupName: '案事件类型',
                groupId: 'caseInfo',
                children: [
                    {
                        tag: 'select-picker',
                        name: 'domain',
                        label: '所属领域',
                        props: {
                            placeholder: '请选择所属领域',
                        },
                    },
                    {
                        tag: 'select-picker',
                        name: 'caseType',
                        label: '所属类型',
                        props: {
                            placeholder: '请选择所属类型',
                        },
                    },
                ],
            },
            {
                groupName: '执法事项',
                groupId: 'enforcement',
                children: [
                    {
                        tag: 'select-picker',
                        name: 'enforcementDomain',
                        label: '所属领域',
                        props: {
                            placeholder: '请选择所属领域',
                        },
                    },
                    {
                        tag: 'select-picker',
                        name: 'enforcementType',
                        label: '所属类型',
                        props: {
                            placeholder: '请选择所属类型',
                        },
                    },
                    {
                        tag: 'select-picker',
                        name: 'enforcementItem',
                        label: '事项',
                        props: {
                            placeholder: '请选择事项',
                        },
                    },
                    {
                        tag: 'select-picker',
                        name: 'handleMethod',
                        label: '处置方式',
                        props: {
                            placeholder: '请选择处置方式',
                            value: '现场劝改/无需处置',
                            options: [
                                {
                                    label: '现场劝改/无需处置',
                                    value: '1',
                                },
                                {
                                    label: '立案',
                                    value: '2',
                                },
                            ],
                        },
                    },
                    {
                        tag: 'input',
                        name: 'caseCode',
                        label: '案件编号',
                        required: true,
                        props: {
                            placeholder: '请输入',
                        },
                        ifRender: (formData: any) => {
                            return formData.handleMethod === '2'
                        },
                    },
                    {
                        tag: 'input',
                        name: 'relatedAssets',
                        label: '关联罚没品',
                        props: {
                            placeholder: '请输入',
                        },
                        ifRender: (formData: any) => {
                            return formData.handleMethod === '2'
                        },
                    },
                    {
                        tag: 'textarea',
                        name: 'remark',
                        label: '备注',
                        props: {
                            rows: 4,
                            maxlength: 1000,
                            placeholder: '请输入',
                            showWordLimit: true,
                        },
                        ifRender: (formData: any) => {
                            return formData.handleMethod === '2'
                        },
                    },
                ],
            },
            {
                groupName: '',
                groupId: 'handleNote',
                children: [
                    {
                        tag: 'textarea',
                        name: 'handleNote',
                        label: '处置反馈',
                        required: true,
                        props: {
                            rows: 4,
                            maxlength: 1000,
                            placeholder: '请输入处置反馈',
                            showWordLimit: true,
                        },
                    },
                ],
            },
            // 企业信息
            {
                groupName: '',
                groupId: 'companyInfo',
                children: [
                    {
                        tag: 'input',
                        name: 'companyName',
                        label: '相关企业名称',
                        props: {
                            placeholder: '请输入',
                        },
                    },
                    {
                        tag: 'input',
                        name: 'creditCode',
                        label: '统一征信代码',
                        props: {
                            placeholder: '请输入',
                        },
                    },
                ],
            },

            {
                groupName: '',
                groupId: 'proofFiles',
                children: [
                    {
                        tag: 'custom',
                        name: 'proofFiles',
                        label: '图片/视频',
                        props: {
                            readonly: true,
                            class: 'block',
                            inputAlign: 'left',
                        },
                        inputRender: () => {
                            return (
                                <div>
                                    <span class="tip" style="color: #808080;">
                                        支持上传jpg /bmp /png/avi/wmy/mpeg /mov/dv格式
                                    </span>
                                    <van-uploader value={this.formData.proofFiles} multiple max-count={9} accept="image/*,video/*" afterRead={this.afterRead}></van-uploader>
                                </div>
                            )
                        },
                    },
                ],
            },
            {
                groupName: '',
                groupId: 'attachments',
                children: [
                    {
                        tag: 'custom',
                        name: 'attachments',
                        label: '附件',
                        props: {
                            readonly: true,
                            class: 'block',
                            inputAlign: 'left',
                        },
                        inputRender: () => {
                            return (
                                <div class="attachment-wrap">
                                    <span class="tip" style="color: #808080;line-height: 1.2;">
                                        上传相关文件，支持扩展名：
                                        <br />
                                        .rar .zip .doc .docx .pdf .xls .xlsx .csv
                                    </span>
                                    <van-uploader value={this.formData.attachments} multiple max-count={5} accept=".rar,.zip,.doc,.docx,.pdf,.xls,.xlsx,.csv" afterRead={this.afterRead}>
                                        {() => (
                                            <van-button plain type="primary" class="attachment-upload-btn">
                                                <span class="upload-icon"></span>
                                                <span class="upload-text">上传文件</span>
                                            </van-button>
                                        )}
                                    </van-uploader>
                                </div>
                            )
                        },
                    },
                ],
            },
        ]
    }

    mounted() {
        // 从路由参数获取初始数据
        const { query } = this.$route
        if (query) {
            Object.keys(query).forEach(key => {
                if (key in this.formData) {
                    this.formData[key] = query[key]
                }
            })
        }
    }

    private async afterRead(file: any) {
        // 处理文件上传
        console.log('上传文件:', file)
    }

    private async handleSubmit() {
        if (this.submitting) return
        try {
            await (this.$refs.formRef as any).validate()
            this.submitting = true
            await mockSubmitFeedback()
            this.$toast.success('提交成功')
            this.submitting = false
            this.$router.back()
        } catch (error) {
            console.error('提交失败:', error)
            this.$toast.fail('提交失败')
            this.submitting = false
        }
    }
}
</script>

<style lang="less" scoped>
.enforcement-feedback::v-deep {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .content {
        flex: 1;
        overflow-y: auto;
    }
    .van-form-cell-header {
        align-items: center;
        font-size: 16px;
        &::before {
            content: '';
            display: inline-block;
            width: 2px;
            height: 14px;
            background: #1676fe;
            margin-right: 8px;
            vertical-align: middle;
        }
    }
    .van-cell-group--inset {
        margin: 0;
        border-radius: 0;
    }
    .van-cell-group,
    .van-form-cell-header {
        background: transparent;
    }

    .footer {
        padding: 16px;
        border-top: 1px solid #e5e5e5;
        background: #fff;
    }
    .app-form {
        padding: 0;
    }

    .tip {
        display: block;
        margin-bottom: 8px;
        font-size: 12px;
    }

    .van-uploader {
        .van-button {
            width: 100px;
            height: 36px;
            margin: 8px 0;
        }
    }
    .attachment-upload-btn {
        border: 1px solid rgba(22, 118, 254, 1);
        border-radius: 20px;
        color: rgba(22, 118, 254, 1);
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        width: auto !important;
        padding: 0 16px !important;

        .upload-icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            vertical-align: middle;
            background: url('./assets/upload.svg') no-repeat center center;
        }
        .upload-text {
            margin-left: 5px;
            display: inline-block;
            vertical-align: middle;
        }
    }
    .my-custom {
        padding-top: 10px !important;
        padding-bottom: 10px !important;
    }
}
</style>
