<template>
    <div class="enforcement-handle">
        <div class="content">
            <app-form ref="formRef" v-model="formData" :fields="groupFields" :show-foot-btns="false" />
        </div>
        <div class="footer">
            <van-button block type="primary" :loading="submitting" loading-text="提交中" @click="handleSubmit" :disabled="submitting">
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
    // 处置人员
    private handleUsers = []
    // 通知人员
    private notifyUsers = [] // 通知人员
    private formData = {
        handleEquipment: '', // 处置装备
        handleNote: '', // 处置意见
        messageNotify: ['1'], // 消息通知方式：1-钉消息 2-短信
    }

    get groupFields() {
        return [
            {
                groupName: '',
                groupId: 'handleUsers',
                children: [
                    {
                        tag: 'select-checkbox',
                        name: 'handleUser$',
                        label: '处置人员',
                        required: true,
                        props: {
                            options: async () => {
                                const result = [
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
                                        isLeader: false,
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
                            return <span style="color: var(--color-primary)">选派人员</span>
                        },
                    },
                    {
                        tag: 'custom',
                        name: 'handleUsers$$',
                        inputRender: () => {
                            return (
                                <div class="handle-users">
                                    <div class="user-list">
                                        {this.handleUsers.map((user: any, index: number) => (
                                            <div class="user-item" key={user.value}>
                                                <div class="user-info">
                                                    <span class="user-name">{user.label}</span>
                                                    <span class="user-phone">({user.phone})</span>
                                                </div>
                                                <div class="user-actions">
                                                    <span
                                                        plain={!user.isLeader}
                                                        type="primary"
                                                        size="mini"
                                                        class={`btn ${user.isLeader ? 'leader-btn' : ''}`}
                                                        onClick={() => this.toggleLeader(user.value)}
                                                    >
                                                        {user.isLeader ? '已设为负责人' : '设为负责人'}
                                                    </span>
                                                    <span name="cross" class="delete-btn" onClick={() => this.removeHandleUser(index, this.handleUsers)}>
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
                            options: async () => {
                                const result = [
                                    { label: 'a', value: '1' },
                                    { label: 'b', value: '2' },
                                ]
                                return result
                            },
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
                            options: [
                                {
                                    label: '默认所有处置人员和负责人',
                                    value: '1',
                                    phone: '13800138000',
                                },
                                {
                                    label: 'b',
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

    mounted() {
        // 从路由参数获取初始数据
        const { query } = this.$route
    }

    private toggleLeader(value: string) {
        this.handleUsers = this.handleUsers.map((user: any) => ({
            ...user,
            isLeader: user.value === value,
        }))
    }
    private removeHandleUser(index: number, users: any[]) {
        this.$dialog
            .confirm({
                message: '确定删除该人员吗？',
            })
            .then(() => {
                users.splice(index, 1)
                // 更新数据确保校验
                this.$set(this.formData, 'handleUsers$', users)
            })
    }
    private removeUser(index: number, users: any[]) {
        this.$dialog
            .confirm({
                message: '确定删除该人员吗？',
            })
            .then(() => {
                users.splice(index, 1)
                // 更新数据确保校验
                this.$set(this.formData, 'notifyUsers$', users)
            })
    }

    private async handleSubmit() {
        if (this.submitting) return
        try {
            await (this.$refs.formRef as any).validate()
            this.submitting = true
            await mockSubmitHandle()
            this.$toast.success('提交成功')
            // this.$router.back()
            this.submitting = false
        } catch (error) {
            console.error('提交失败:', error)
            this.$toast.fail('提交失败')
            this.submitting = false
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
}
</style>
