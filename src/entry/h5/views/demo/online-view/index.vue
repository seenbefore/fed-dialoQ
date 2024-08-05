<template>
    <div class="sg-page DemoOnlineView">
        <van-tabs v-model="tabActive" @change="tabEvent">
            <van-tab title="无跨域URL" name="tab1"></van-tab>
            <van-tab title="需代理URL" name="tab2"></van-tab>
            <van-tab title="文件流" name="tab3"></van-tab>
            <van-tab title="字节数组" name="tab4"></van-tab>
        </van-tabs>

        <div class="main-scroll">
            <PdfPreview :proxy-prefix="proxyPrefix" :data-type="dataType" :data="pdfData" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PdfPreview from '@h5/components/pdf-preview/index.vue'
// 示例常量
const PDFSRC1 = 'https://csoss-test.oss-cn-shanghai.aliyuncs.com/xfjdzf/2022/1110/6129212ddc3a4443846a16fd7549b35a.pdf'
const PDFSRC2 = 'https://csoss-test.oss-cn-shanghai.aliyuncs.com/xfjdzf/2022/1110/2176f011f4fe41278a9abbc1d93cb2e5.pdf'

@Component({
    name: 'DemoOnlineView',
    components: { PdfPreview },
})
export default class DemoOnlineView extends Vue {
    public tabActive = 'tab1'
    /** 组件参数 */
    public proxyPrefix = '/@API_PDF'
    public dataType = 'url' //'url'：pdf文件地址，'stream'：文件流对象，'bytes'：文件流字节数组
    public pdfData: any = ''

    created() {}
    mounted() {
        this.tabEvent('tab1')
    }

    /** 切换 */
    tabEvent(tabKey: string) {
        switch (tabKey) {
            case 'tab1': //预览同域名，端口下的pdf
                this.proxyPrefix = ''
                this.pdfData = `${process.env.BASE_URL}static/assets/docs/test.pdf`
                this.dataType = 'url'
                break
            case 'tab2': //需要配置代理服务的
                this.proxyPrefix = '/@API_PDF'
                this.pdfData = PDFSRC1
                this.dataType = 'url'
                break
            case 'tab3': //需要后台配合，接口返回文件流形式的
                const api1 = `${process.env.BASE_URL}static/assets/docs/test-2.pdf` //此处模拟请求接口
                const config: any = { responseType: 'blob' }
                this.$http.get(api1, config).then((res: any) => {
                    if (res && res.data) {
                        this.proxyPrefix = ''
                        this.pdfData = res.data
                        this.dataType = 'stream'
                    }
                })
                break
            case 'tab4': //需要后台配合，后台先将下载文件流并转换为字节数组，通过接口返回前端
                const sendData = { fileUrl: PDFSRC2 }
                const api = 'http://192.168.1.197:9092/actscode-search/api/oss/prvData' //测试示例-处罚行为码
                this.$http.post(api, sendData).then((res: any) => {
                    const { data } = res
                    if (data && data.fileData) {
                        this.proxyPrefix = ''
                        this.pdfData = data.fileData
                        this.dataType = 'bytes'
                    }
                })
                break
            default:
                return
        }
    }
}
</script>

<style lang="less" scoped>
.DemoOnlineView {
    .main-scroll {
        height: calc(100vh - 50px);
        overflow: hidden;
        overflow-y: auto;
    }
    ::v-deep {
        .van-tabs {
            margin-bottom: 10px;
        }
        .van-tabs--line .van-tabs__wrap {
            height: 40px;
        }
        .van-tabs__nav {
            background-color: #3f97f0;
        }
        .van-tab {
            color: #ccc;
            font-size: 14px;
        }
        .van-tab--active {
            color: #fff;
        }
        .van-tabs__line {
            background-color: #fa6400;
        }
        .pdfjs .pdfViewer .pageContainer {
            margin: 0 auto;
            height: 100%;
        }
        .pinch-zoom-container {
            height: 100% !important;
        }
    }
}
</style>
