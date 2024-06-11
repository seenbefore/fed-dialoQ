<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import qrCode from 'qrcode'

@Component({
    name: 'UtilsZlbQrCode',
})
export default class UtilsZlbQrCode extends Vue {
    public readonly zlbPreUrl = 'http://portal.zjzwfw.gov.cn/download/?_aaid=4&preferredContainer=zlb&goto=zwfw://webview?h5Url='

    public url = ''

    public qrCodeBase64 = ''

    public preQrCodeUrl = ''

    public get qrCodeUrl(): string {
        return `${this.zlbPreUrl}${decodeURIComponent(this.url)}`
    }

    public async generateQrCode(): Promise<void> {
        if (!this.url) {
            this.$message.error('请先输入链接')
            return
        }
        this.qrCodeBase64 = await qrCode.toDataURL(this.qrCodeUrl)
        this.preQrCodeUrl = this.url
    }
}
</script>

<template>
    <div class="zlb-qr-code__container sg-page sg-p-0">
        <div class="zlb-qr-code__container">
            <div class="zlb-qr-code__content">
                <p>请输入需要在浙里办内调试的网站地址（如：http://localhost:8081）</p>
                <el-input placeholder="请输入调试地址" v-model="url" clearable>
                    <template slot="append">
                        <el-button type="primary" @click="generateQrCode">生成调试二维码</el-button>
                    </template>
                </el-input>

                <div v-if="qrCodeBase64" class="zlb-qr-code__image">
                    <img :src="qrCodeBase64" alt="二维码" />
                    <p>
                        通过浙里办扫一扫即可打开{{ preQrCodeUrl }}地址。注意：
                        <span>如果是本地启动的项目需要连接公司的内网Wi-Fi（hx-office）</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.zlb-qr-code {
    &__container {
        display: flex;
        justify-content: center;
    }

    &__content {
        width: 800px;

        p {
            color: #333;
        }

        ::v-deep {
            .el-input-group__append {
                background-color: #158dff;
                color: #fff;
                border: 1px solid #158dff;
            }
        }
    }

    &__image {
        text-align: center;
        margin-top: 20px;

        p {
            color: #333;

            span {
                color: #999;
            }
        }
    }
}
</style>
