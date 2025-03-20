<template>
    <app-page class="activity-signup">
        <!-- 顶部Banner区域 -->
        <div class="banner">
            <van-image :src="activityDetail.posterUrl" fit="cover" class="poster" />
            <div class="info">
                <h1 class="title">{{ activityDetail.title }}</h1>
                <div class="meta">
                    <van-icon name="clock-o" />
                    <span>{{ activityDetail.startTime }} - {{ activityDetail.endTime }}</span>
                </div>
                <div class="meta">
                    <van-icon name="location-o" />
                    <span>{{ activityDetail.location }}</span>
                </div>
            </div>
        </div>

        <!-- 活动信息区域 -->
        <div class="section">
            <div class="section-title">活动详情</div>
            <div class="description" v-html="activityDetail.description"></div>
            <div class="info-item">
                <span class="label">活动费用：</span>
                <span class="value">¥{{ activityDetail.fee }}</span>
            </div>
            <div class="info-item">
                <span class="label">报名截止：</span>
                <span class="value">{{ activityDetail.signupEndTime }}</span>
            </div>
            <div class="info-item">
                <span class="label">剩余名额：</span>
                <span class="value">{{ activityDetail.remainingQuota }}/{{ activityDetail.quota }}</span>
            </div>
        </div>

        <!-- 报名状态提示 -->
        <div class="status-tip" :class="statusClass" v-if="activityDetail.signupStatus !== SignupStatus.IN_PROGRESS">
            {{ SignupStatusText[activityDetail.signupStatus] }}
        </div>

        <!-- 报名表单区域 -->
        <van-form @submit="onSubmit" v-if="activityDetail.signupStatus === SignupStatus.IN_PROGRESS">
            <van-cell-group inset>
                <van-field
                    v-model="formData.name"
                    name="name"
                    label="姓名"
                    placeholder="请输入您的真实姓名"
                    :rules="[
                        { required: true, message: '请输入姓名' },
                        { pattern: /^.{2,20}$/, message: '姓名长度为2-20个字符' },
                    ]"
                />
                <van-field
                    v-model="formData.mobile"
                    name="mobile"
                    label="手机号"
                    placeholder="请输入手机号码"
                    :rules="[
                        { required: true, message: '请输入手机号' },
                        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
                    ]"
                />
                <van-field
                    v-model="formData.idCard"
                    name="idCard"
                    label="身份证号"
                    placeholder="请输入身份证号码"
                    :rules="[
                        { required: true, message: '请输入身份证号' },
                        { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号' },
                    ]"
                />
                <van-field
                    v-model="formData.age"
                    name="age"
                    label="年龄"
                    type="number"
                    placeholder="请输入年龄"
                    :rules="[
                        { required: true, message: '请输入年龄' },
                        { pattern: /^(?:[1-9]|[1-9][0-9]|1[0-1][0-9]|120)$/, message: '请输入1-120的整数' },
                    ]"
                />
                <van-field name="gender" label="性别">
                    <template #input>
                        <van-radio-group v-model="formData.gender" direction="horizontal">
                            <van-radio v-for="option in GenderOptions" :key="option.value" :name="option.value">{{ option.text }}</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field
                    v-model="formData.emergencyContact"
                    name="emergencyContact"
                    label="紧急联系人"
                    placeholder="请输入紧急联系人姓名"
                    :rules="[{ required: true, message: '请输入紧急联系人' }]"
                />
                <van-field
                    v-model="formData.emergencyPhone"
                    name="emergencyPhone"
                    label="紧急联系人电话"
                    placeholder="请输入紧急联系人电话"
                    :rules="[
                        { required: true, message: '请输入紧急联系人电话' },
                        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
                    ]"
                />
            </van-cell-group>
        </van-form>

        <!-- 底部提交按钮 -->
        <template #footer>
            <van-button v-if="activityDetail.signupStatus === SignupStatus.IN_PROGRESS" type="primary" block :loading="submitting" @click="onSubmit">提交报名</van-button>
        </template>
    </app-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppPage from '@/components/h5/AppPage/index.vue'
import { getActivityDetail, submitSignup, SignupSubmitDTO } from './api'
import { SignupStatus, SignupStatusText, Gender, GenderOptions } from './enum'
import { Toast } from 'vant'

@Component({
    name: 'ActivitySignup',
    components: {
        AppPage,
    },
})
export default class ActivitySignup extends Vue {
    private SignupStatus = SignupStatus
    private SignupStatusText = SignupStatusText
    private GenderOptions = GenderOptions

    private activityDetail = {
        id: '',
        title: '',
        posterUrl: '',
        startTime: '',
        endTime: '',
        location: '',
        description: '',
        fee: 0,
        signupEndTime: '',
        quota: 0,
        remainingQuota: 0,
        signupStatus: SignupStatus.NOT_STARTED,
    }

    private formData: SignupSubmitDTO = {
        activityId: '',
        name: '',
        mobile: '',
        idCard: '',
        age: 0,
        gender: Gender.MALE,
        emergencyContact: '',
        emergencyPhone: '',
    }

    private submitting = false

    get statusClass() {
        const status = this.activityDetail.signupStatus
        return {
            'status-tip--not-started': status === SignupStatus.NOT_STARTED,
            'status-tip--ended': status === SignupStatus.ENDED,
            'status-tip--full': status === SignupStatus.FULL,
        }
    }

    async created() {
        await this.loadActivityDetail()
    }

    private async loadActivityDetail() {
        try {
            const activityId = this.$route.query.id as string
            console.log('activityId222', activityId)
            if (!activityId) {
                Toast('活动ID不能为空')
                return
            }
            const res = await getActivityDetail(activityId)

            this.activityDetail = res.data
            this.formData.activityId = activityId
        } catch (error) {
            Toast('获取活动详情失败')
        }
    }

    private async onSubmit() {
        if (this.submitting) return
        try {
            this.submitting = true
            const res = await submitSignup(this.formData)
            if (res.code === 0) {
                Toast.success('报名成功')
                // 跳转到报名成功页面
                this.$router.push({
                    path: '/activity/signup-success',
                    query: { id: this.formData.activityId },
                })
            } else {
                Toast(res.message)
            }
        } catch (error) {
            Toast('提交报名失败')
        } finally {
            this.submitting = false
        }
    }
}
</script>

<style lang="less" scoped>
.activity-signup {
    background-color: #f5f5f5;

    .banner {
        position: relative;
        width: 100%;
        height: 400px;

        .poster {
            width: 100%;
            height: 100%;
        }

        .info {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 20px;
            background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
            color: #fff;

            .title {
                font-size: 24px;
                font-weight: bold;
                margin: 0 0 10px;
            }

            .meta {
                display: flex;
                align-items: center;
                margin-top: 8px;
                font-size: 14px;

                .van-icon {
                    margin-right: 5px;
                }
            }
        }
    }

    .section {
        margin: 16px;
        padding: 16px;
        background: #fff;
        border-radius: 8px;

        .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #333;
            margin-bottom: 16px;
        }

        .description {
            margin-bottom: 16px;
            line-height: 1.6;
            color: #666;
        }

        .info-item {
            display: flex;
            margin-top: 8px;
            font-size: 14px;

            .label {
                color: #999;
                width: 80px;
            }

            .value {
                color: #333;
                flex: 1;
            }
        }
    }

    .status-tip {
        margin: 16px;
        padding: 12px;
        text-align: center;
        border-radius: 8px;
        font-size: 16px;

        &--not-started {
            background-color: #e6f7ff;
            color: #2979ff;
        }

        &--ended {
            background-color: #fff2f0;
            color: #ff4d4f;
        }

        &--full {
            background-color: #fff7e6;
            color: #faad14;
        }
    }

    :deep(.van-cell-group) {
        margin: 16px;
    }

    :deep(.van-button) {
        margin: 16px;
    }
}
</style>
