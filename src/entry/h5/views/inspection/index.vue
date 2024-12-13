<template>
    <app-page class="inspection-form">
        <!-- 顶部案件信息 -->
        <template #header>
            <div class="case-info">
                <div class="info-item">
                    <label>案件名称：</label>
                    <span>{{ caseInfo.caseName }}</span>
                </div>
                <div class="info-item">
                    <label>处罚事项：</label>
                    <span>{{ caseInfo.punishmentItem }}</span>
                </div>
                <div class="info-item">
                    <label>当事人：</label>
                    <span>{{ caseInfo.party }}</span>
                </div>
            </div>
        </template>

        <!-- 默认插槽为主内容区域 -->
        <app-form ref="formRef" v-model="formData" :fields="groupFields" :show-foot-btns="false" />

        <!-- 底部按钮 -->
        <template #footer>
            <div class="footer">
                <van-row :gutter="16">
                    <van-col span="12">
                        <van-button block plain @click="handleCancel">暂存</van-button>
                    </van-col>
                    <van-col span="12">
                        <van-button block type="primary" :loading="submitting" loading-text="提交中" :disabled="submitting" @click="handleSubmit">
                            下一步
                        </van-button>
                    </van-col>
                </van-row>
            </div>
        </template>
    </app-page>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import { saveInspection, InspectionFormVO } from './api'
import AppPage from '@/components/h5/AppPage/index.vue'

@Component({
    name: 'InspectionForm',
    components: {
        AppPage,
    },
})
export default class InspectionForm extends Vue {
    private formRef: any = null
    private submitting = false

    private caseInfo = {
        caseName: '张三室外场所无照经营案',
        punishmentItem: '对室外场所无照经营案的行政处罚',
        party: '张三',
    }

    private formData: Partial<InspectionFormVO> = {
        inspectionAddress: '',
        inspectionTime: '',
        inspectors: [],
    }

    get groupFields() {
        return [
            {
                groupName: '勘察基本信息',
                groupId: 'basicInfo',
                children: [
                    {
                        tag: 'input',
                        name: 'inspectionAddress',
                        label: '勘察地址',
                        required: true,
                        props: {
                            placeholder: '请输入勘察地址',
                        },
                        rules: [{ required: true, message: '请输入勘察地址' }],
                    },
                    {
                        tag: 'date-picker',
                        name: 'inspectionTime',
                        label: '勘察时间',
                        required: true,
                        props: {
                            placeholder: '请选择勘察时间',
                            type: 'datetime',
                        },
                        rules: [{ required: true, message: '请选择勘察时间' }],
                    },
                    {
                        tag: 'select-picker',
                        name: 'inspectors',
                        label: '勘察人员',
                        required: true,
                        props: {
                            placeholder: '请选择勘察人员',
                            multiple: true,
                            options: [],
                        },
                        rules: [{ required: true, message: '请选择勘察人员' }],
                        LinkageWatcher: [
                            {
                                watch: [],
                                handler: async () => {
                                    return {
                                        props: {
                                            options: [
                                                { label: '张三', value: '1' },
                                                { label: '李四', value: '2' },
                                                { label: '王五', value: '3' },
                                            ],
                                        },
                                    }
                                },
                                options: { immediate: true },
                            },
                        ],
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
            this.submitting = true
            await saveInspection(this.formData as InspectionFormVO)
            this.$toast.success('提交成功')
            this.submitting = false
            this.$router.back()
        } catch (error) {
            console.error('提交失败:', error)
            this.$toast.fail('提交失败')
            this.submitting = false
        }
    }

    private handleCancel() {
        this.$toast.success('暂存成功')
        this.$router.back()
    }
}
</script>

<style lang="less" scoped>
.inspection-form::v-deep {
    .case-info {
        background: #4e7dff;
        color: #fff;
        padding: 16px;

        .info-item {
            margin-bottom: 8px;
            line-height: 1.5;
            font-size: 14px;

            &:last-child {
                margin-bottom: 0;
            }

            label {
                color: rgba(255, 255, 255, 0.8);
            }
        }
    }

    .footer {
        padding: 16px;
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

    .app-form {
        padding: 0;
    }
}
</style>
