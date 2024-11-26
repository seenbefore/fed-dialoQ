<template>
    <div class="enforcement-handle">
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
import { mockSubmitHandle } from './api'

@Component({
    name: 'EnforcementHandle',
})
export default class EnforcementHandle extends Vue {
    private formRef: any = null
    private submitting = false

    private formData = {
        handleUsers: [
            {
                label: '张三',
                value: '1',
                phone: '13800138000',
                isLeader: false,
            },
            {
                label: '张三1',
                value: '2',
                phone: '13800138001',
                isLeader: true,
            },
        ], // 处置人员
        handleEquipment: '', // 处置装备
        handleNote: '', // 处置意见
        messageNotify: ['1'], // 消息通知方式：1-钉消息 2-短信
        notifyUsers: [
            {
                label: '张三',
                value: '1',
                phone: '13800138000',
            },
            {
                label: '张三1',
                value: '2',
                phone: '13800138001',
            },
        ], // 通知人员
    }

    get groupFields() {
        return [
            {
                groupName: '',
                groupId: 'handleUsers',
                children: [
                    {
                        tag: 'select-checkbox',
                        name: 'handleUsers$',
                        label: '处置人员',
                        required: true,
                        props: {
                            placeholder: '请选择',
                            value: [],
                            multiple: true,
                            options: [
                                {
                                    label: 'a',
                                    value: '1',
                                },
                                {
                                    label: 'b',
                                    value: '2',
                                },
                            ],
                        },
                        inputRender: () => {
                            return <span style="color: #1676fe">选派人员</span>
                        },
                    },
                    {
                        tag: 'input',
                        name: 'handleUsers',
                        label: '',
                        props: {
                            inputAlign: 'left',
                            class: 'custom',
                        },
                        inputRender: () => {
                            return (
                                <div class="handle-users">
                                    <div class="user-list">
                                        {this.formData.handleUsers.map((user: any) => (
                                            <div class="user-item" key={user.value}>
                                                <div class="user-info">
                                                    <span class="user-name">{user.label}</span>
                                                    <span class="user-phone">({user.phone})</span>
                                                </div>
                                                <div class="user-actions">
                                                    <van-button
                                                        plain={!user.isLeader}
                                                        type="primary"
                                                        size="mini"
                                                        class={user.isLeader ? 'leader-btn' : ''}
                                                        onClick={() => this.toggleLeader(user.value)}
                                                    >
                                                        {user.isLeader ? '已设为负责人' : '设为负责人'}
                                                    </van-button>
                                                    <span name="cross" class="delete-btn" onClick={() => this.removeUser(user.value)}>
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
            {
                groupName: '',
                groupId: 'handleEquipment',
                children: [
                    {
                        tag: 'select-picker',
                        name: 'handleEquipment',
                        label: '处置装备',
                        props: {
                            placeholder: '请选择',
                            value: '',
                            options: [],
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
                            placeholder: '请选择',
                            value: [],
                            multiple: true,
                            options: [
                                {
                                    label: 'a',
                                    value: '1',
                                },
                                {
                                    label: 'b',
                                    value: '2',
                                },
                            ],
                        },
                        inputRender: () => {
                            return <span style="color: #1676fe">选派人员</span>
                        },
                    },
                    {
                        tag: 'input',
                        name: 'notifyUsers',
                        label: '',
                        props: {
                            inputAlign: 'left',
                            class: 'custom',
                        },
                        inputRender: () => {
                            return (
                                <div class="handle-users">
                                    <div class="user-list">
                                        {this.formData.handleUsers.map((user: any) => (
                                            <div class="user-item" key={user.value}>
                                                <div class="user-info">
                                                    <span class="user-name">{user.label}</span>
                                                    <span class="user-phone">({user.phone})</span>
                                                </div>
                                                <div class="user-actions">
                                                    <span name="cross" class="delete-btn" onClick={() => this.removeUser(user.value)}>
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

    private toggleLeader(value: string) {
        this.formData.handleUsers = this.formData.handleUsers.map((user: any) => ({
            ...user,
            isLeader: user.value === value,
        }))
    }

    private removeUser(value: string) {
        this.formData.handleUsers = this.formData.handleUsers.filter((user: any) => user.value !== value)
    }

    private removeNotifyUser(value: string) {
        this.formData.notifyUsers = this.formData.notifyUsers.filter((user: any) => user.value !== value)
    }

    private clearNotifyUsers() {
        this.formData.notifyUsers = []
    }

    private selectUser() {
        // 打开选择处置人员弹窗
        console.log('选择处置人员')
    }

    private selectNotifyUser() {
        // 打开选择通知人员弹窗
        console.log('选择通知人员')
    }

    private async handleSubmit() {
        if (this.submitting) return
        try {
            await (this.$refs.formRef as any).validate()
            await mockSubmitHandle()
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
.enforcement-handle::v-deep {
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
        .custom {
            padding: 0 !important;
            .van-field__control {
                display: block;
            }
        }
    }

    .handle-users,
    .notify-users {
        .user-list {
            margin-bottom: 12px;
            .user-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 8px 12px;

                .user-info {
                    display: flex;
                    align-items: center;
                    .user-name {
                        font-weight: 500;
                    }
                    .user-phone {
                        color: #999;
                        margin-left: 8px;
                    }
                }

                .user-actions {
                    display: flex;
                    align-items: center;
                    .van-button {
                        border: 1px solid rgba(22, 118, 254, 1);
                        color: rgba(22, 118, 254, 1);
                        border-radius: 16px;
                        background: #fff;
                        margin-right: 12px;
                        height: 24px;
                        font-size: 12px;
                    }
                    .leader-btn {
                        background: #eeeeee;
                        border-radius: 16px;
                        color: #666666;
                        border: none;
                    }
                    .delete-btn {
                        color: #ff4d4f;
                    }
                }
            }
        }
        .select-user {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .delete-all {
                color: #ff4d4f;
                font-size: 14px;
            }
        }
    }
}
</style>
