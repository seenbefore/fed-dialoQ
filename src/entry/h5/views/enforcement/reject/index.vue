<template>
    <div class="enforcement-reject">
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
import { mockSubmitReject } from './api'

@Component({
    name: 'EnforcementReject',
})
export default class EnforcementReject extends Vue {
    private formRef: any = null
    private submitting = false

    private formData = {
        rejectReason: '', // 退回原因
    }

    get groupFields() {
        return [
            {
                groupName: '',
                groupId: 'rejectReason',
                children: [
                    {
                        tag: 'textarea',
                        name: 'rejectReason',
                        label: '退回原因',
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

    private async handleSubmit() {
        if (this.submitting) return
        try {
            await (this.$refs.formRef as any).validate()
            await mockSubmitReject()
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
.enforcement-reject::v-deep {
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
    }
}
</style>
