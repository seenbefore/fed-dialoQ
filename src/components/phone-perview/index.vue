<!-- 移动端预览 -->
<template>
    <div class="PhonePreview phone-preview">
        <el-scrollbar style="height: 100%">
            <div class="phone-perview-inner">
                <div class="left-tool">
                    <!-- <div class="view-choose">
                        <button class="">4.7寸屏</button>
                        <button class="">5.0寸屏</button>
                        <button class="active">5.5寸屏</button>
                    </div>
                    <div class="view-dark">
                        <input type="checkbox" id="DarkInputBtn" />
                        <label for="DarkInputBtn">深色模式</label>
                    </div> -->
                    <div class="qrcode-view">
                        <div class="qrcode-view-title">
                            <p>扫码查看手机效果</p>
                            <p>与实际手机显示效果</p>
                            <p>有微小差异, 请扫码查看</p>
                        </div>
                        <div class="qrcode-view-qrcode"><canvas width="120" height="120" id="canvas"></canvas></div>
                        <a :href="previewUrl" target="_blank">PC端查看</a>
                    </div>
                </div>
                <div data-type="ffType" class="right-view">
                    <div class="preview-title" title="点击复制" @click="handleCopy">{{ previewUrl }}</div>
                    <div class="preview-body mpa-color_scheme_dark">
                        <!-- <h2 class="title" style="-webkit-user-select:none;">此处为标题</h2>
                        <div class="info" style="-webkit-user-select:none;">
                            <span>2024-02-20</span>
                            <span>此处为作者</span>
                        </div>
                        <section style="overflow: hidden;">
                            <section data-role="outer" label="Powered by 365editor" style="font-size:16px;">
                                <table>
                                    <tbody>
                                        <tr class="firstRow">
                                            <td id="artContent" style="max-width: 656px; margin: 5px 10px;">
                                                <p>管理的核心八个字是：</p>
                                                <p class="" data-tools-id="29931">计划、组织、指挥、协调、控制、决策、沟通、激励。</p>
                                                <p class="" data-tools-id="73307">这八个字概括了管理的基本要素和职能，是管理过程中的核心要点。简要地解释如下：</p>
                                                <p class="" data-tools-id="78972">1. 计划：制定目标、明确任务、规划资源和行动步骤，为实现组织目标而做出安排。</p>
                                                <p>2. 组织：建立组织结构、分配职责、构建团队，以实现协同工作和资源的合理利用。</p>
                                                <p>3. 指挥：领导和指导员工，激发员工的积极性和创造力，实现工作任务的落实。</p>
                                                <p class="" data-tools-id="51810">4. 协调：协调组织内外部各种资源、利益和关系，解决冲突，达到整体和谐运作。</p>
                                                <p class="" data-tools-id="78461">5. 控制：设定标准、制定指标、监控执行情况，实现预期目标，并进行必要的调整和纠正。</p>
                                                <p>6. 决策：做出明智的决策，权衡利益，选择最佳的方案，推动组织向前发展。</p>
                                                <p class="" data-tools-id="22260">7. 沟通：建立良好的沟通渠道，促进信息流动，确保信息传递准确和及时。</p>
                                                <p>8. 激励：采用合适的激励方式，激发员工的工作积极性和创造性，提高员工的工作动力和满意度。</p>
                                                <p class="" data-tools-id="68880">这八个字反映了管理的综合性和多层次性，是管理者在组织和管理活动中需要关注和运用的核心要素</p>
                                                <p><br /></p>
                                                <center>
                                                    <img
                                                        src="http://image109.360doc.com/DownloadImg/2023/04/2405/264867666_1_20230424052321865.jpeg"
                                                        alt=""
                                                        class="z-i_"
                                                        style="max-width: 100%; height: auto;"
                                                    />
                                                </center>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </section>
                        </section> -->
                        <iframe :src="previewUrl" frameborder="0" class="preview_iframe"></iframe>
                    </div>
                </div>
                <!---->
                <div class="close-btn el-icon-circle-close-outline el-icon-circle-close" @click="close"></div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Ref, Watch } from 'vue-property-decorator'
var QRCode = require('qrcode')

/**
 * 复制文字
 * @param {String} value
 * @return {Boolean}
 */
export function clipboard(value: string) {
    let result = false
    if (document.execCommand) {
        const input = document.createElement('input')
        document.body.appendChild(input)
        input.setAttribute('value', value)
        input.select()

        document.execCommand('copy')
        document.body.removeChild(input)

        result = true
    }

    return result
}

@Component({
    name: 'PhonePreview',
    components: {},
})
export default class PhonePreview extends Vue {
    /**
     * 文章地址
     */
    @Prop({ default: 'https://element.eleme.cn/#/zh-CN/component/icon#tu-biao-ji-he' }) url!: string
    async mounted() {
        await this.$nextTick()
        this.qrFunction(this.url)
    }
    get previewUrl() {
        console.log(234, this.url)
        this.qrFunction(this.url)
        return this.url
    }
    handleCopy() {
        const result = clipboard(this.url)
        if (result) {
            this.$message.success('复制成功')
        }
    }

    // 生成二维码方法（核心方法）
    qrFunction(url = '') {
        let opts = {
            errorCorrectionLevel: 'H', //容错级别
            type: 'image/png', //生成的二维码类型
            quality: 1, //二维码质量
            margin: 2, //二维码留白边距
            width: 120, //宽
            height: 120, //高
            text: '', //二维码内容
            color: {
                dark: '#333333', //前景色
                light: '#fff', //背景色
            },
        }

        let msg = document.getElementById('canvas')
        // 将获取到的数据（val）画到msg（canvas）上
        QRCode.toCanvas(msg, url, opts, (error: any) => {
            console.log('二维码生成出错', msg, url, error)
            // this.getBase64Image(id)
        })
    }
    close() {
        this.$options.cancel && this.$options.cancel()
    }
}
</script>

<style lang="less" scoped>
.PhonePreview ::v-deep {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
}
.phone-preview .phone-perview-inner {
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    padding: 10px 0;
    box-sizing: border-box;
    justify-content: center;
}

.phone-preview .phone-perview-inner .left-tool {
    margin-right: 30px;
    margin-top: 80px;
}

.phone-preview .phone-perview-inner .left-tool .view-choose {
    width: 176px;
    background-color: #fff;
    border-radius: 3px;
    margin-bottom: 30px;
    overflow: hidden;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -moz-align-items: center;
    align-items: center;
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    -ms-flex-direction: column;
    -o-flex-direction: column;
    flex-direction: column;
    padding: 18px 0 3px;
}

.phone-preview .phone-perview-inner .left-tool .view-choose button {
    width: 120px;
    height: 30px;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -moz-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    -moz-justify-content: center;
    -ms-justify-content: center;
    -o-justify-content: center;
    justify-content: center;
    transition: all 0.2s;
    color: #303133;
    outline: none;
    border-radius: 3px;
    border: 1px solid #f1f4f6;
    margin-bottom: 15px;
    color: #88c3fd;
    background-color: #fff;
}

.phone-preview .phone-perview-inner .left-tool .view-choose button.active {
    background: #88c3fd;
    color: #fff;
    border: 1px solid #88c3fd;
}

.phone-preview .phone-perview-inner .left-tool .view-dark {
    width: 176px;
    background: #fff;
    text-align: center;
    margin-bottom: 30px;
    border-radius: 3px;
    padding: 8px;
    box-sizing: border-box;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -moz-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    -moz-justify-content: center;
    -ms-justify-content: center;
    -o-justify-content: center;
    justify-content: center;
}

.phone-preview .phone-perview-inner .left-tool .view-dark input {
    cursor: pointer;
}

.phone-preview .phone-perview-inner .left-tool .view-dark label {
    margin-left: 5px;
    cursor: pointer;
}

.phone-preview .phone-perview-inner .left-tool .qrcode-view {
    width: 176px;
    height: 280px;
    background-color: #fff;
    border-radius: 3px;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -moz-align-items: center;
    align-items: center;
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    -ms-flex-direction: column;
    -o-flex-direction: column;
    flex-direction: column;
    -webkit-justify-content: center;
    -moz-justify-content: center;
    -ms-justify-content: center;
    -o-justify-content: center;
    justify-content: center;
}

.phone-preview .phone-perview-inner .left-tool .qrcode-view .qrcode-view-title {
    text-align: center;
}

.phone-preview .phone-perview-inner .left-tool .qrcode-view .qrcode-view-title p {
    font-size: 12px;
    color: #909399;
    margin: 0;
}

.phone-preview .phone-perview-inner .left-tool .qrcode-view .qrcode-view-title p:nth-child(1) {
    color: #3f9eff;
    font-size: 14px;
    margin-bottom: 9px;
}

.phone-preview .phone-perview-inner .left-tool .qrcode-view .qrcode-view-qrcode {
    margin-top: 12px;
    margin-bottom: 14px;
    width: 120px;
    height: 120px;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -moz-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    -moz-justify-content: center;
    -ms-justify-content: center;
    -o-justify-content: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.2);
}

.phone-preview .phone-perview-inner .left-tool .qrcode-view > a {
    width: 120px;
    height: 36px;
    border: 1px solid #3f9eff;
    background-color: #fff;
    border-radius: 4px;
    display: inline-block;
    text-align: center;
    line-height: 36px;
    color: #3f9eff;
    transition: all 0.2s;
}

.phone-preview .phone-perview-inner .left-tool .qrcode-view > a:hover {
    color: #fff;
    background-color: #3f9eff;
}

.phone-preview .phone-perview-inner .preview-title {
    height: 40px;
    line-height: 40px;
    background-color: #88c3fd;
    font-size: 14px;
    color: #fff;
    text-align: center;
    padding: 0px 12px;
    overflow-y: auto;
    width: 100%;
    white-space: nowrap;
    cursor: pointer;
}

.phone-preview .phone-perview-inner .preview-body {
    padding-top: 10px;
    background-color: #fff;
    box-sizing: border-box;
    padding: 10px 5px;
}

.phone-preview .phone-perview-inner .preview-body ul {
    padding-left: 21px !important;
}

.phone-preview .phone-perview-inner .preview-body ol {
    padding-left: 17px !important;
}

.phone-preview .phone-perview-inner .preview-body img {
    max-width: 100%;
    margin: 0 auto;
    height: auto !important;
}

.phone-preview .phone-perview-inner .preview-body .title {
    font-size: 22px;
    font-weight: 400;
    margin-bottom: 5px;
}

.phone-preview .phone-perview-inner .preview-body .info {
    margin-bottom: 15px;
    line-height: 20px;
    font-size: 16px;
    color: #909399;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -moz-align-items: center;
    align-items: center;
}

.phone-preview .phone-perview-inner .preview-body .info span {
    margin-right: 8px;
}

.phone-preview .phone-perview-inner .dark-mode .preview-title,
.phone-preview .phone-perview-inner .dark-mode .preview-body {
    background-color: #232323 !important;
    color: #fff !important;
}

.phone-preview .phone-perview-inner .right-view {
    transform: scale(0.88);
    -webkit-transform: scale(0.88);
    -moz-transform: scale(0.88);
    -ms-transform: scale(0.88);
    -o-transform: scale(0.88);
}

.phone-preview .phone-perview-inner .right-view[data-type='fsType'] {
    width: 372px;
    box-sizing: border-box;
    height: 772px;
    background-image: url('./assets/47.png');
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: left top;
    padding-top: 91px;
    padding-left: 22px;
}

.phone-preview .phone-perview-inner .right-view[data-type='fsType'] div.preview-title {
    width: 326px;
    margin-left: 1px;
}

.phone-preview .phone-perview-inner .right-view[data-type='fsType'] iframe.preview_iframe,
.phone-preview .phone-perview-inner .right-view[data-type='fsType'] .preview-body {
    width: 328px;
    height: 536px;
    overflow-x: hidden;
    overflow-y: auto;
}

.phone-preview .phone-perview-inner .right-view[data-type='fzType'] {
    width: 405px;
    box-sizing: border-box;
    height: 788px;
    background-image: url('./assets/50.png');
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: left top;
    padding-top: 75px;
    padding-left: 20px;
}

.phone-preview .phone-perview-inner .right-view[data-type='fzType'] div.preview-title {
    width: 363px;
}

.phone-preview .phone-perview-inner .right-view[data-type='fzType'] iframe.preview_iframe,
.phone-preview .phone-perview-inner .right-view[data-type='fzType'] .preview-body {
    width: 363px;
    height: 602px;
    overflow-x: hidden;
    overflow-y: auto;
}

.phone-preview .phone-perview-inner .right-view[data-type='ffType'] {
    width: 408px;
    box-sizing: border-box;
    height: 826px;
    //background-image: url(https://www.365editor.com/dist/images/51.png);
    background-image: url('./assets/51.png');
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: left top;
    padding-top: 100px;
    padding-left: 24px;
}

.phone-preview .phone-perview-inner .right-view[data-type='ffType'] div.preview-title {
    width: 360px;
    margin-left: 0px;
    margin-top: -1px;
}

.phone-preview .phone-perview-inner .right-view[data-type='ffType'] iframe.preview_iframe,
.phone-preview .phone-perview-inner .right-view[data-type='ffType'] .preview-body {
    width: 360px;
    height: 595px;
    overflow-x: hidden;
    overflow-y: auto;
}

.phone-preview .phone-perview-inner .right-info {
    margin-top: 80px;
    margin-left: 30px;
}

.phone-preview .phone-perview-inner .right-info .content {
    width: 176px;
    background-color: #fff;
    border-radius: 3px;
    margin-bottom: 30px;
    overflow: hidden;
    padding: 18px 0 3px;
}

.phone-preview .phone-perview-inner .right-info .content p {
    font-size: 12px;
    color: #909399;
}

.phone-preview .phone-perview-inner .right-info .content .text {
    padding-left: 20px;
}

.phone-preview .phone-perview-inner .right-info .content .btn {
    margin-top: 10px;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -moz-align-items: center;
    align-items: center;
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    -ms-flex-direction: column;
    -o-flex-direction: column;
    flex-direction: column;
}

.phone-preview .phone-perview-inner .right-info .content button {
    width: 120px;
    height: 30px;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -moz-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    -moz-justify-content: center;
    -ms-justify-content: center;
    -o-justify-content: center;
    justify-content: center;
    transition: all 0.2s;
    color: #303133;
    outline: none;
    border-radius: 3px;
    border: 1px solid #f1f4f6;
    margin-bottom: 15px;
    color: #88c3fd;
    background-color: #fff;
}

.phone-preview .phone-perview-inner .right-info .content button:hover {
    background: #88c3fd;
    color: #fff;
    border: 1px solid #88c3fd;
}

.phone-preview .phone-perview-inner .close-btn {
    margin-left: 10px;
    margin-top: 10px;
    color: #fff;
    font-size: 38px;
    cursor: pointer;
}

.phone-perview-inner table {
    border-collapse: collapse;
    display: table;
    width: 100% !important;
}

.phone-perview-inner table.noBorderTable td,
.phone-perview-inner table.noBorderTable th,
.phone-perview-inner table.noBorderTable caption {
    border: 1px dashed #ddd;
}

.phone-perview-inner .table-noborder > thead > tr > th,
.phone-perview-inner .table-noborder > tbody > tr > th,
.phone-perview-inner .table-noborder > tbody > tr > td,
.phone-perview-inner .table-noborder > tfoot > tr > th,
.phone-perview-inner .table-noborder > tr > td,
.phone-perview-inner .table-noborder > thead > tr > td,
.phone-perview-inner .table-noborder > tbody > tr > td,
.phone-perview-inner .table-noborder > tfoot > tr > td {
    border: 0 none !important;
}

.phone-perview-inner td,
.phone-perview-inner th {
    word-wrap: break-word;
    word-break: break-all;
    padding: 5px 10px !important;
    border: 1px solid #ddd !important;
}

.phone-perview-inner .edui-default td,
.phone-perview-inner .edui-default th {
    border: 0 none;
    padding: 0 0 !important;
}

.phone-perview-inner caption {
    border: 1px dashed #ddd;
    border-bottom: 0;
    padding: 3px;
    text-align: center;
}

.phone-perview-inner th {
    border-top: 2px solid #bbb;
    background: #f7f7f7;
}

.phone-perview-inner .ue-table-interlace-color-single {
    background-color: #fcfcfc;
}

.phone-perview-inner .ue-table-interlace-color-double {
    background-color: #f7faff;
}
</style>
