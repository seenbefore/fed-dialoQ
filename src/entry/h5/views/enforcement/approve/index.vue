<template>
    <div class="enforcement-approve">
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
import { mockSubmitApprove } from './api'

@Component({
    name: 'EnforcementApprove',
})
export default class EnforcementApprove extends Vue {
    private formRef: any = null
    private submitting = false

    private formData = {
        handleMethod: '3', // 处置方式：1-流转至其他平台 2-答复 3-处置
        targetPlatform: '', // 流转平台
        handleNote: '', // 处置意见
        attachments: [], // 图片/视频
        proofFiles: [], // 附件
    }
    handleUsers: any[] = []

    get groupFields() {
        const redirectFields = [
            {
                groupName: '',
                groupId: 'targetPlatform',
                children: [
                    {
                        tag: 'select-picker',
                        name: 'targetPlatform',
                        label: '流转平台',
                        required: true,
                        props: {
                            placeholder: '请选择流转平台',
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
                        label: '处置意见',
                        required: true,
                        props: {
                            rows: 4,
                            maxlength: 1000,
                            placeholder: '请输入',
                            showWordLimit: true,
                        },
                    },
                ],
            },
        ]
        const replayFields = [
            {
                groupName: '',
                groupId: 'handleNote',
                children: [
                    {
                        tag: 'textarea',
                        name: 'handleNote',
                        label: '处置意见',
                        required: true,
                        props: {
                            rows: 4,
                            maxlength: 1000,
                            placeholder: '请输入',
                            showWordLimit: true,
                        },
                    },
                ],
            },
        ]
        const handleFields = [
            {
                groupName: '',
                groupId: 'handleDepartment',
                children: [
                    {
                        tag: 'select-picker',
                        name: 'handleDepartment',
                        label: '处置部门',
                        required: true,
                        props: {
                            placeholder: '请选择',
                            value: '',
                            options: [
                                {
                                    label: 'xx局',
                                    value: '1',
                                },
                                {
                                    label: 'xx局2',
                                    value: '2',
                                },
                            ],
                        },
                    },
                ],
            },
            {
                groupName: '',
                groupId: 'replyNote2',
                children: [
                    {
                        tag: 'textarea',
                        name: 'replyNote2',
                        label: '答复意见',
                        required: true,
                        props: {
                            rows: 4,
                            maxlength: 1000,
                            placeholder: '请输入',
                            showWordLimit: true,
                        },
                    },
                ],
            },
            {
                groupName: '',
                groupId: 'messageNotify',
                children: [
                    {
                        tag: 'checkbox',
                        name: 'messageNotify',
                        label: '消息通知',

                        required: true,
                        props: {
                            labelWidth: 60,
                            inputAlign: 'left',
                            value: ['1'],
                            isGroup: true,
                            options: [
                                { label: '钉消息', value: '1' },
                                { label: '短信息', value: '2' },
                            ],
                            class: 'block',
                        },
                    },
                ],
            },
            {
                groupName: '',
                groupId: 'messageNotifyUser',
                children: [
                    {
                        tag: 'select-checkbox',
                        name: 'messageNotifyUser$',
                        label: '通知人员',
                        required: true,
                        props: {
                            options: async () => {
                                const result = [
                                    {
                                        label: '张三',
                                        value: '1',
                                        phone: '13800000000',
                                    },
                                    {
                                        label: '张思',
                                        value: '2',
                                        phone: '13800000001',
                                    },
                                    {
                                        label: '李四',
                                        value: '3',
                                        phone: '13800000002',
                                    },
                                    {
                                        label: '王五',
                                        value: '4',
                                        phone: '13800000003',
                                    },
                                    {
                                        label: '赵六',
                                        value: '5',
                                        phone: '13800000004',
                                    },
                                    {
                                        label: '孙七',
                                        value: '6',
                                        phone: '13800000005',
                                    },
                                    {
                                        label: '周八',
                                        value: '7',
                                        phone: '13800000006',
                                    },
                                    {
                                        label: '吴九',
                                        value: '8',
                                        phone: '13800000007',
                                    },
                                    {
                                        label: '郑十',
                                        value: '9',
                                        phone: '13800000008',
                                    },
                                    {
                                        label: '陈十一',
                                        value: '10',
                                        phone: '13800000009',
                                    },
                                ]
                                return result
                            },
                        },
                        on: {
                            // 选择人员
                            change: (val: any) => {
                                const { value, options = [] } = val
                                console.log(value, '111value')
                                this.handleUsers = [...options]
                            },
                        },
                        inputRender: () => {
                            return <span style="color: #1676fe">选择人员</span>
                        },
                    },
                    {
                        tag: 'custom',
                        name: 'messageNotifyUser$$',
                        inputRender: () => {
                            return (
                                <div class="handle-users">
                                    <div class="user-list">
                                        {this.handleUsers.map((user: any, index: number) => (
                                            <div class="user-item" key={user.value}>
                                                <div class="user-info">
                                                    <span class="user-name">默认部门值班长</span>
                                                    <span class="user-phone">({user.phone})</span>
                                                </div>
                                                <div class="user-actions">
                                                    <span name="cross" class="delete-btn" onClick={() => this.removeUser(index, this.handleUsers)}>
                                                        删除
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        },
                    },
                ],
            },
        ]
        let fields = []
        if (this.formData.handleMethod === '1') {
            fields = redirectFields
        } else if (this.formData.handleMethod === '2') {
            fields = replayFields
        } else {
            fields = handleFields
        }
        return [
            {
                groupName: '',
                groupId: 'handleMethod',
                children: [
                    {
                        tag: 'radio',
                        name: 'handleMethod',
                        label: '处置方式',

                        required: true,
                        props: {
                            labelWidth: 60,
                            inputAlign: 'left',
                            options: [
                                { label: '流转至其他平台', value: '1' },
                                { label: '答复', value: '2' },
                                { label: '处置', value: '3' },
                            ],
                        },
                    },
                ],
            },
            ...fields,
        ]
    }

    private removeUser(index: number, users: any[]) {
        this.$dialog
            .confirm({
                message: '确定删除该人员吗？',
            })
            .then(() => {
                users.splice(index, 1)
                // 更新数据确保校验
                this.$set(this.formData, 'messageNotifyUser$', users)
            })
    }
    private async handleSubmit() {
        if (this.submitting) return
        try {
            await (this.$refs.formRef as any).validate()
            this.submitting = true
            await mockSubmitApprove()
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
.enforcement-approve::v-deep {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding-top: 10px;
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
        .my-radio {
            .van-radio--horizontal {
                margin-left: 7px !important;
            }
        }
        .messageNotify {
            .van-checkbox-group--horizontal {
                width: 100%;
                .van-checkbox {
                    flex: 1;
                    margin-left: 0;
                }
            }
        }
    }
}
</style>
