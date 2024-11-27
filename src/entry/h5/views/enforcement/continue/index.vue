<template>
    <div class="enforcement-continue">
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
import { mockSubmitContinue } from './api'

@Component({
    name: 'EnforcementContinue',
})
export default class EnforcementContinue extends Vue {
    private formRef: any = null
    private submitting = false

    private formData = {
        handleNote: '', // 处置意见
        messageNotify: ['1'], // 消息通知方式：1-钉消息 2-短信
    }
    private notifyUsers: any[] = []

    get groupFields() {
        return [
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
                                { label: '短信', value: '2' },
                            ],
                            class: 'block',
                        },
                    },
                ],
            },
            {
                groupName: '',
                groupId: 'notifyUsers',
                children: [
                    {
                        tag: 'select-checkbox',
                        name: 'notifyUsers$',
                        label: '通知人员',
                        required: true,
                        props: {
                            options: [
                                {
                                    label: '默认退回的人',
                                    value: '1',
                                    phone: '13800138000',
                                },
                                {
                                    label: '李四',
                                    value: '2',
                                    phone: '13800138001',
                                },
                            ],
                        },
                        on: {
                            // 选择人员
                            change: (val: any) => {
                                const { value, options = [] } = val
                                console.log(value, '111value')
                                this.notifyUsers = [...options]
                            },
                        },
                        inputRender: () => {
                            return <span style="color: var(--color-primary)">选择人员</span>
                        },
                    },
                    {
                        tag: 'custom',
                        name: 'notifyUsers',
                        inputRender: () => {
                            return (
                                <div class="handle-users">
                                    <div class="user-list">
                                        {this.notifyUsers.map((user: any, index: number) => (
                                            <div class="user-item" key={user.value}>
                                                <div class="user-info">
                                                    <span class="user-name">{user.label}</span>
                                                    <span class="user-phone">({user.phone})</span>
                                                </div>
                                                <div class="user-actions">
                                                    <span name="cross" class="delete-btn" onClick={() => this.removeUser(index, this.notifyUsers)}>
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
    }

    removeUser(index: number, users: any[]) {
        users.splice(index, 1)
        this.$set(this.formData, 'notifyUsers$', users)
    }
    private async handleSubmit() {
        if (this.submitting) return
        try {
            await (this.$refs.formRef as any).validate()
            this.submitting = true
            await mockSubmitContinue()
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
.enforcement-continue::v-deep {
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

    .notify-users {
        padding: 12px 16px;
        .user-list {
            margin-bottom: 12px;
            .user-item {
                display: flex;
                align-items: center;
                padding: 8px 12px;
                background: #f7f8fa;
                border-radius: 4px;
                margin-bottom: 8px;
                .user-name {
                    margin-right: 8px;
                    font-weight: 500;
                }
                .user-phone {
                    color: #999;
                    flex: 1;
                }
                .delete-icon {
                    color: #999;
                    font-size: 16px;
                }
            }
        }
    }
}
</style>
