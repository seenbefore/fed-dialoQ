<template>
    <div class="enforcement-continue">
        <div class="content">
            <app-form ref="formRef" v-model="formData" :fields="groupFields" :show-foot-btns="false" />
        </div>
        <div class="footer">
            <van-button block type="primary" :loading="submitting" @click="handleSubmit">
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
        notifyUsers: [], // 通知人员
    }

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
                        tag: 'select-picker',
                        name: 'notifyUsers',
                        label: '通知人员',
                        required: true,
                        props: {
                            placeholder: '请选择',
                            value: [],
                            multiple: true,
                            options: [
                                {
                                    label: '张三',
                                    value: '1',
                                },
                                {
                                    label: '李四',
                                    value: '2',
                                },
                            ],
                        },
                        render: () => {
                            return (
                                <div class="notify-users">
                                    <div class="user-list">
                                        {this.formData.notifyUsers.map((user: any) => (
                                            <div class="user-item" key={user.value}>
                                                <span class="user-name">{user.label}</span>
                                                <span class="user-phone">{user.phone}</span>
                                                <van-icon name="cross" class="delete-icon" onClick={() => this.removeUser(user.value)} />
                                            </div>
                                        ))}
                                    </div>
                                    <van-button plain type="primary" size="small" icon="plus" onClick={this.selectUser}>
                                        选择人员
                                    </van-button>
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

    private removeUser(value: string) {
        this.formData.notifyUsers = this.formData.notifyUsers.filter((user: any) => user.value !== value)
    }

    private selectUser() {
        // 打开选择人员弹窗
        console.log('选择人员')
    }

    private async handleSubmit() {
        if (this.submitting) return
        try {
            await (this.$refs.formRef as any).validate()
            await mockSubmitContinue()
            this.$toast.success('提交成功')
            this.$router.back()
        } catch (error) {
            console.error('提交失败:', error)
            this.$toast.fail('提交失败')
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
