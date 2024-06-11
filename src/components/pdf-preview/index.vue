<template>
    <div class="pdf-preview">
        <div id="pdf"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import Pdfh5 from 'pdfh5'
import 'pdfh5/css/pdfh5.css'
// 定义约束类型
type DateType = 'url' | 'stream' | 'bytes'

@Component({
    name: 'PdfPreview',
    components: {},
})
export default class PdfPreview extends Vue {
    // 组件通信参数
    /** 是否需要配置代理，代理前缀值，默认空（表示无需代理） */
    @Prop({ default: '' }) proxyPrefix?: string
    /** 数据类型，'url'：pdf文件地址，'stream'：文件流对象，'bytes'：文件流字节数组 */
    @Prop({ default: 'url' }) dataType!: DateType
    /** pdf文件数据 */
    @Prop({ default: '' }) data!: string | object

    @Watch('data')
    watchPdfData() {
        this.previewPdf()
    }

    created() {}
    mounted() {}

    /** 预览-pdf */
    previewPdf() {
        const { dataType, data } = this
        // 文件流形式
        if (dataType == 'stream') {
            this.turnFileStream(data)
            return
        }
        // 文件流字节数组
        if (dataType == 'bytes') {
            this.turnBytesFile(data as string)
            return
        }
        // pdf文件地址
        this.loadPdfToDom(data as string)
    }

    /** 文件流形式 */
    turnFileStream(fileData: any) {
        let blob = new Blob([fileData], { type: 'application/pdf' })
        let url = URL.createObjectURL(blob)
        this.loadPdfToDom(url)
    }
    /** 转换pdf文件流字节数组 */
    turnBytesFile(bytesData: string) {
        try {
            const fileName = `文件名-${new Date().getTime()}.pdf`
            // 将文件字节数组重新转换为文件对象
            const bstr = window.atob(bytesData)
            let len: number = bstr.length
            const u8arr = new Uint8Array(len)
            while (len--) {
                u8arr[len] = bstr.charCodeAt(len)
            }
            const file = new File([u8arr], fileName, {
                type: 'application/pdf',
            })
            const documentUrl = URL.createObjectURL(file) //转换为存储再前端的临时Blob文件流路径
            this.loadPdfToDom(documentUrl)
        } catch (err) {
            console.log('===err', err)
        }
    }
    /** 加载渲染pdfDOM */
    loadPdfToDom(url: string) {
        // 截掉域名，代理到指定地址
        if (this.proxyPrefix) {
            const splitArr = url.split('/')?.slice(3)
            url = `${this.proxyPrefix}/${splitArr.join('/')}`
        }

        const $pdfh5 = new Pdfh5('#pdf', {
            pdfurl: url,
            scrollEnable: true,
        })
        /** 监听完成事件 */
        $pdfh5.on('complete', function(status: string, msg: string, time: any) {
            // console.log(`状态：${status}，信息${msg}，耗时${time}毫秒`)
        })
        console.log('=======pdfUrl', url, $pdfh5)
    }
}
</script>

<style lang="less" scoped></style>
