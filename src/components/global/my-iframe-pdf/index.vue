<script lang="ts">
import { DomEvent, isFullScreen } from '@/utils/dom'
import { Component, Mixins, Prop, Ref, Watch } from 'vue-property-decorator'
import popupManager from 'element-ui/lib/utils/popup/popup-manager'
import { getNewUrl } from '@/utils/pdfAndImgUrl'
@Component({
    name: 'MyIframePdf',
})
export default class MyIframePdf extends Mixins(DomEvent) {
    /** pdf链接 */
    @Prop({ type: String, default: '' }) pdfSrc!: string
    /** 窗口宽 */
    @Prop({ type: String }) iframeWidth?: string
    /** 窗口高 */
    @Prop({ type: String }) iframeHeight?: string
    /** pdf缩放比例 */
    @Prop({ type: String, default: '82' }) zoom?: string

    @Ref('resizeRef')
    public resizeRef!: HTMLIFrameElement

    @Ref('fullScreenRef')
    public fullScreenRef!: HTMLElement

    public pdfSrcNew = ''
    @Watch('pdfSrc', { immediate: true })
    async watchPdfSrc(val) {
        this.pdfSrcNew = await getNewUrl(val)
    }

    public get iframeStyle() {
        return {
            width: this.iframeWidth ?? '',
            height: this.iframeHeight ?? '',
        }
    }

    /* 获取下一个z-index */
    public get nextZIndex() {
        return popupManager.nextZIndex()
    }

    public isFullScreen = false

    public fullScreenIframe() {
        if (!this.isFullScreen) {
            this.fullScreenRef.requestFullscreen()
        } else {
            document.exitFullscreen()
        }
    }

    public mounted() {
        this.on(this.fullScreenRef, 'fullscreenchange', () => {
            this.isFullScreen = isFullScreen(this.fullScreenRef)
        })
    }
}
</script>

<template>
    <div class="pdf-preview__container" ref="fullScreenRef" :style="iframeStyle">
        <iframe
            v-if="pdfSrcNew"
            v-bind="$attrs"
            ref="resizeRef"
            class="my-iframe-pdf"
            :src="`${pdfSrcNew}#zoom=${this.zoom || '82'}`"
            :width="iframeWidth"
            :height="iframeHeight"
            frameborder="0"
        ></iframe>
        <div :style="{ zIndex: nextZIndex }" class="pdf-preview__full-screen-btn" @click="fullScreenIframe">
            {{ !isFullScreen ? '全屏' : '退出' }}
        </div>
    </div>
</template>

<style scoped lang="less">
.pdf-preview {
    &__container {
        position: relative;
        width: 100%;
        height: 100%;
    }

    &__full-screen-btn {
        position: absolute;
        top: 60px;
        right: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.4);
        color: #fff;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
    }
}
.my-iframe-pdf {
    width: 100%;
    height: 100%;
    all: inherit;
}
</style>
