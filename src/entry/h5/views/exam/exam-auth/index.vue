<template>
    <div class="exam-auth">
        <div class="form-container">
            <app-form ref="formRef" v-model="formData" :fields="formFields" @submit="onSubmit" :show-foot-btns="false"></app-form>
        </div>
        <div class="submit-btn">
            <van-button round block type="primary" native-type="submit" @click="handleSubmit">
                下一步，实名认证
            </van-button>
        </div>
    </div>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import { submitAuth } from './api'
import { Button } from 'vant'

@Component({
    name: 'ExamAuth',
    components: {
        [Button.name]: Button,
    },
})
export default class ExamAuth extends Vue {
    private formData = {
        userName: '',
        idCard: '',
        mobile: '',
        studentId: '',
        company: '',
    }

    private formFields = [
        {
            tag: 'input',
            name: 'userName',
            label: '姓名：',
            required: true,
            props: {
                placeholder: '请输入',
                type: 'input',
                class: 'my-input',
                'input-align': 'left',
            },
            rules: [{ required: true, message: '请输入姓名' }],
        },
        {
            tag: 'input',
            name: 'idCard',
            label: '身份证号：',
            required: true,
            props: {
                placeholder: '请输入',
                'input-align': 'left',
            },
            rules: [{ required: true, message: '请输入身份证号' }],
        },
        {
            tag: 'input',
            name: 'mobile',
            label: '手机号码：',
            required: true,
            props: {
                placeholder: '请输入',
                type: 'tel',
                maxlength: 11,
                'input-align': 'left',
            },
            rules: [
                { required: true, message: '请输入手机号码' },
                { pattern: /^\d{11}$/, message: '请输入正确的手机号码' },
            ],
        },
        {
            tag: 'input',
            name: 'studentId',
            label: '学号：',
            required: true,
            props: {
                placeholder: '请输入',
                'input-align': 'left',
            },
            rules: [{ required: true, message: '请输入学号' }],
        },
        {
            tag: 'input',
            name: 'company',
            label: '单位名称（全称）：',
            required: true,
            props: {
                placeholder: '请输入',
                'input-align': 'left',
            },
            rules: [{ required: true, message: '请输入单位名称' }],
        },
    ]

    private async handleSubmit() {
        try {
            await (this.$refs.formRef as any).validate()
            await this.onSubmit()
        } catch (error) {
            console.error(error)
        }
    }

    private async onSubmit() {
        try {
            await submitAuth(this.formData)
            // this.$router.push({
            //     path: `/exam/list`,
            // })
        } catch (error) {
            this.$toast.fail('认证失败')
        }
    }
}
</script>

<style lang="less" scoped>
.exam-auth {
    min-height: 100vh;
    background: #f5f5f5;
    display: flex;
    flex-direction: column;

    .form-container {
        flex: 1;
        overflow-y: auto;
        padding-bottom: 80px; // 为底部按钮留出空间
    }

    &::v-deep {
        .app-form {
            padding-top: 0;
        }
        .van-cell-group {
            padding-bottom: 20px;
        }
        .van-cell-group--inset {
            margin: 0;
            border-radius: 0;
        }
        .van-cell {
            display: block !important;
            &::after {
                display: none;
            }
        }
        .van-cell-group {
            &::after {
                display: none;
            }
        }

        .app-form {
            .form-item {
                margin-bottom: 20px;

                .form-label {
                    font-size: 14px;
                    color: #333;
                    margin-bottom: 8px;

                    .required {
                        color: #ee0a24;
                        margin-right: 2px;
                        vertical-align: middle;
                    }
                }

                .van-field {
                    padding: 0;
                    background: #f7f8fa;
                    border-radius: 4px;

                    .van-field__control {
                        min-height: 44px;
                        padding: 11px 12px;
                        font-size: 14px;
                        color: #333;

                        &::placeholder {
                            color: #999;
                        }
                    }

                    &::after {
                        display: none;
                    }
                }
            }
        }
        .my-input {
            .van-field__control {
                background: #eff3f8;
                border-radius: 4px;
                padding: 5px 12px;
            }
        }
        .van-cell__value {
            margin: 0 -10px;
        }
        .van-field__label {
            width: auto;
        }
    }

    .submit-btn {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 16px;
        background: #fff;
        box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);

        .van-button {
            height: 44px;
            font-size: 16px;
        }
    }
}
</style>
