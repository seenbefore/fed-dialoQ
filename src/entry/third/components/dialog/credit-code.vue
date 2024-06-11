<!-- 征信授权码 -->
<template>
    <div class="credit-code">
        <el-dialog class="sg-dialog" visible width="50%" title="征信授权码" :close-on-click-modal="false" @close="cancel" v-loading="loading">
            <div class="dialog-body">
                <div class="auth-success" v-if="authSuccess">
                    <svg-icon icon="mt-success" class="icon-success"></svg-icon>
                    <div class="success">授权成功</div>
                </div>
                <template v-else>
                    <div class="content">
                        <div class="weChat-title">微信扫码授权</div>
                        <div class="code">
                            <img class="code-img" :src="codeImg" alt="" />
                        </div>
                    </div>
                    <div class="tips">
                        <div>
                            <i class="el-icon-info"></i>
                            <span class="text">本业务需要通过人脸识别验证企业法定代表人的身份，由法定代表人完成签字授权，请务必发送给企业法定代表人本人。</span>
                        </div>
                    </div>
                    <div class="btn-container">
                        <div v-if="canRefresh" class="refresh" @click="refreshAuth">
                            刷新授权结果
                        </div>
                        <div v-else class="invalid">授权申请已失效（{{ count }}s）</div>
                    </div>
                </template>
                <!-- <div class="btn-container">
                <el-link
                    class="apply-record"
                    type="primary"
                    :underline="false"
                    @click="applyAuth"
                    >申请授权记录>></el-link
                >
            </div> -->
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'EditUser',
    props: {},
    data() {
        return {
            loading: false,
            canRefresh: true, // 是否可以刷新授权
            count: 5,
            authSuccess: false, // 是否授权成功
            codeImg: '', // 授权二维码
        }
    },
    computed: {},
    created() {
        // 获取授权详情
        this.getAuthDetail()
    },
    mounted() {},
    methods: {
        cancel() {
            this.$options.cancel()
        },
        async getAuthDetail() {
            // const res = await API
        },
        // 刷新授权结果
        refreshAuth() {
            this.canRefresh = false
            const timer = setInterval(() => {
                this.count -= 1
                if (this.count <= 0) {
                    this.canRefresh = true
                    this.count = 5
                    clearInterval(timer)
                }
            }, 1000)
            this.getAuthDetail()
        },
        // 申请授权记录
        // applyAuth() {
        //     this.$options.confirm()
        // },
    },
}
</script>
<style lang="less" scoped>
.credit-code {
    .dialog-body {
        .content {
            display: flex;
            flex-direction: column;
            align-items: center;
            .weChat-title {
                margin-bottom: 35px;
                font-family: PingFangSC-Semibold;
                font-size: 24px;
                color: #333333;
            }
            .code {
                position: relative;
                width: 462px;
                height: 246px;
                background: url('../../assets/share-auth.png');
                .code-img {
                    position: absolute;
                    bottom: 28px;
                    left: 0;
                    width: 193px;
                    height: 186px;
                }
            }
        }
        .tips {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 35px 0 60px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            line-height: 24px;
            color: #ff0000;
            .text {
                margin-left: 10px;
            }
        }
        .auth-success {
            display: flex;
            flex-direction: column;
            align-items: center;
            .icon-success {
                width: 52px;
                height: 52px;
            }
            .success {
                font-family: PingFangSC-Semibold;
                font-size: 24px;
                color: #333333;
                line-height: 18px;
                margin: 25px 0 30px;
            }
        }
        .btn-container {
            display: flex;
            justify-content: center;
            .refresh {
                width: 150px;
                background: #04be88;
                border-radius: 17.5px;
                text-align: center;
                line-height: 35px;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #ffffff;
                margin-bottom: 33px;
                cursor: pointer;
            }
            .invalid {
                width: 150px;
                background: #ccc;
                border-radius: 17.5px;
                text-align: center;
                line-height: 35px;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #ffffff;
                margin-bottom: 33px;
                cursor: pointer;
            }
            .apply-record {
                margin-bottom: 32px;
            }
        }
    }
}
</style>
