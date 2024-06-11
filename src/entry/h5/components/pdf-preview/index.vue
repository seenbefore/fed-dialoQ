<script lang="ts">
import { Toast } from 'vant'
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import Pdfh5 from 'pdfh5'
import 'pdfh5/css/pdfh5.css'

@Component({
    name: 'PdfPreview',
})
export default class PdfPreview extends Vue {
    @Prop({ type: String })
    public url!: string

    @Ref('pdfRef')
    public pdfRef!: HTMLDivElement

    public mounted(): void {
        const loadingInstance = Toast.loading({
            duration: 0,
            forbidClick: true,
            message: '加载中...',
        })
        const pdfH5Instance = new Pdfh5(this.pdfRef, {
            pdfurl: this.url,
            scrollEnable: true,
        })
        pdfH5Instance.on('complete', () => {
            console.log('pdf 加载成功')
        })

        /* 当pdf开时渲染的时候就可以关闭loading泐 */
        pdfH5Instance.on('render', () => {
            loadingInstance.clear()
        })

        pdfH5Instance.on('error', () => {
            this.$toast('pdf加载失败')
        })
    }
}
</script>

<template>
    <div class="pdf-preview__container">
        <div ref="pdfRef" class="pdfjs"></div>
    </div>
</template>

<style scoped lang="less">
.pdf-preview {
    &__container {
        height: 100%;
        width: 100%;
    }
}
</style>
