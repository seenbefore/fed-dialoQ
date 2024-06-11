<!-- 图表详情 -->
<template>
    <div class="Chart_uuid">
        <div class="left">
            <div class="head">
                <el-button type="primary" @click="run">运行</el-button>

                <el-switch v-model="theme" active-text="深色背景" inactive-text="浅色背景" active-value="dark" inactive-value="light"></el-switch>
            </div>
            <CodeEditor v-model="code"></CodeEditor>
        </div>
        <div class="right" :class="theme">
            <iframe sandbox="allow-pointer-lock allow-scripts allow-downloads allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-modals" :srcdoc="srcdoc"></iframe>
        </div>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { ChartCaseService, DictService } from '@/entry/devops/api'
import CodeEditor from '@/components/CodeEditor.vue'
@Component({
    name: 'Chart_uuid',
    components: {
        CodeEditor,
    },
})
export default class Chart_uuid extends Vue {
    @Prop() uuid!: string
    async mounted() {
        const { data } = await ChartCaseService.get({
            id: this.uuid,
        })
        this.code = data.code
        this.run()
    }
    code = ''
    srcdoc = ''
    theme = 'dark'
    run() {
        this.srcdoc = this.getSrcdoc()
    }
    getSrcdoc() {
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
    async handlePreview() {
        // const { data } = await ChartCaseService.get({
        //     id: this.uuid,
        // })
        // await this.$modalDialog(() => import(/* webpackChunkName: "ChartPreviewDialog" */ '../../admin/chart/edit/components/ChartPreviewDialog/index.vue'), {
        //     code: data.code,
        //     fullscreen: true,
        // })
        //     .then(async () => {})
        //     .catch((err: any) => {
        //         console.log(err)
        //     })
    }
}
</script>

<style lang="less" scoped>
.Chart_uuid ::v-deep {
    height: 100vh;
    display: flex;
    overflow: hidden;

    .left {
        width: 40%;
        height: 100%;
        .head {
            padding: 5px;
            border-bottom: 1px solid #ccc;
        }
    }
    .right {
        width: 60%;
        height: 100%;
        &.dark {
            background-color: #060e33;
        }
        &.light {
            background: #f3f3f3;
        }
        padding-top: 50px;
    }
    iframe {
        width: 95%;
        height: 70%;
        border: none;
    }

    .ace-editor {
        // height: calc(100vh - 50px) !important;
    }
    // .ace_content {
    //     height: 100vh !important;
    // }
}
</style>
