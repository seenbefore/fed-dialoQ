<template>
    <el-dialog
        ref="dialog"
        :title="'预览'"
        visible
        class="ChartPreviewDialog"
        :fullscreen="fullscreen"
        :append-to-body="false"
        :close-on-click-modal="false"
        width="850px"
        v-bind="$attrs"
        :show-close="false"
        @close="cancel"
        :close-on-press-escape="false"
    >
        <div class="pre-deploy-dialog__content">
            <iframe sandbox="allow-pointer-lock allow-scripts allow-downloads allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-modals" :srcdoc="srcdoc"></iframe>
        </div>
        <span slot="footer" class="dialog-footer" v-if="!fullscreen">
            <el-button @click="cancel">确 定</el-button>
            <!-- <el-button type="primary" @click="handleSubmit">保 存</el-button> -->
        </span>
    </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'ChartPreviewDialog',
    components: {},
})
export default class ChartPreviewDialog extends Vue {
    @Prop({ type: String }) code!: string
    @Prop({ type: Boolean, default: false }) fullscreen!: boolean

    get srcdoc() {
        const code = this.code
        const baseUrl = process.env.BASE_URL
        const { echartsUrl, echartsGlUrl, echartsLiquidfill } = {
            // http://vgl.icinfo.fat1.icinfo.co/lib/echarts.min.js
            echartsUrl: `${baseUrl}static/assets/npm/echarts/5.3.2/echarts.min.js`,
            // http://vgl.icinfo.fat1.icinfo.co/lib/echarts-gl.min.js
            echartsGlUrl: `${baseUrl}static/assets/npm/echarts-gl/echarts-gl.min.js`,
            // http://vgl.icinfo.fat1.icinfo.co/lib/echarts-liquidfill.min.js
            echartsLiquidfill: `${baseUrl}static/assets/npm/echarts/5.3.2/echarts-liquidfill.min.js`,
        }
        const completeCode = `var chartDom = document.getElementById('main');
                                var myChart = echarts.init(chartDom);
                                var option;
                                ${code}
                                option && myChart.setOption(option);
                                window.onresize=()=>{
                                myChart.resize()
    }`
        const html = `<html lang="zh-CN">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="Content-Security-Policy" content="">
        <style>
            * {
                margin: 0;
                padding: 0
            }
            #main {
                width:100vw;
                height:100vh
            }
        </style>
        <style id="chart-styles"></style>
        <style>
       
        </style>
    </head>
    <body>
        <div id="main"></div>
        <script src="${echartsUrl}"><\/script>
        <script src="${echartsGlUrl}"><\/script>
        <script src="${echartsLiquidfill}"><\/script>
        <script>
        ${completeCode}
        <\/script>
    </body>
</html>`
        return html
    }

    cancel() {
        const $options: any = this.$options
        $options.cancel('取消/关闭')
    }
    confirm() {
        const $options: any = this.$options
        $options.confirm('确定')
    }
    async mounted() {}
}
</script>

<style lang="less" scoped>
.ChartPreviewDialog ::v-deep {
    .el-dialog__body {
        padding: 0 10px;
        background: #f7f9fa;
        background: #060e33;
    }
    .el-dialog__footer {
        height: 45px;
    }
    iframe {
        width: 100%;
        height: 460px;
        border: none;
    }
}
</style>
