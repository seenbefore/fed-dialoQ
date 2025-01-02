<template>
    <div class="watermark-container">
        <div class="watermark-content">
            <slot></slot>
        </div>
        <div ref="watermarkRef" class="watermark-layer"></div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

const rate = 350
let lastClick = Date.now() - rate
const BaseSize = 2
const FontGap = 3

const getPixelRatio = () => window.devicePixelRatio || 1
const toLowercaseSeparator = (key: string) => key.replace(/([A-Z])/g, '-$1').toLowerCase()
const getStyleStr = (style: Record<string, any>) =>
    Object.keys(style)
        .map(key => `${toLowercaseSeparator(key)}: ${style[key]};`)
        .join(' ')

function reRendering(mutation: MutationRecord, watermarkElement: HTMLElement | null) {
    let flag = false
    // 是否删除水印节点
    if (mutation.removedNodes.length) {
        flag = Array.from(mutation.removedNodes).some(node => node === watermarkElement)
    }
    // 是否修改过水印dom属性值
    if (mutation.type === 'attributes' && mutation.target === watermarkElement) {
        flag = true
    }
    return flag
}

interface IFont {
    fontSize: number
    fontFamily: string
    fontStyle: string
    fontWeight: string
    color: string
}

@Component({
    name: 'Watermark',
})
export default class Watermark extends Vue {
    @Prop({ type: Number, default: 9999 }) readonly zIndex!: number
    @Prop({ type: Number, default: -30 }) readonly rotate!: number
    @Prop({ type: [String, Number], default: 400 }) readonly width!: string | number
    @Prop({ type: [String, Number], default: 200 }) readonly height!: string | number
    @Prop({ type: String, default: '' }) readonly image!: string
    @Prop({ type: [String, Array], default: '' }) readonly content!: string | string[]
    @Prop({
        type: Object,
        default: () => ({
            fontSize: 24,
            fontFamily: 'Arial',
            fontStyle: 'normal',
            fontWeight: 'bold',
            color: 'rgba(0, 0, 0, 0.08)',
        }),
    })
    readonly font!: IFont

    @Prop({ type: Boolean, default: true }) readonly clockwise!: boolean
    @Prop({ type: Number, default: 1 }) readonly opacity!: number
    @Prop({ type: String, default: '' }) readonly rootClassName!: string
    @Prop({ type: Array, default: () => [80, 80] }) readonly gap!: [number, number]
    @Prop({ type: Array, default: () => [0, 0] }) readonly offset!: [number, number]

    private watermarkRef: HTMLElement | null = null

    mounted() {
        this.watermarkRef = this.$refs.watermarkRef as HTMLElement
        this.renderWatermark()
    }

    private renderWatermark() {
        if (!this.watermarkRef) return

        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // 设置canvas尺寸
        const ratio = getPixelRatio()
        canvas.width = Number(this.width) * ratio
        canvas.height = Number(this.height) * ratio

        // 设置文字样式
        const fontSize = this.font.fontSize * ratio
        ctx.font = `${this.font.fontWeight} ${fontSize}px ${this.font.fontFamily}`
        ctx.fillStyle = this.font.color
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        // 旋转画布
        ctx.translate(canvas.width / 2, canvas.height / 2)
        ctx.rotate((this.rotate * Math.PI) / 180)
        ctx.translate(-canvas.width / 2, -canvas.height / 2)

        // 绘制文字
        const content = Array.isArray(this.content) ? this.content : [this.content]
        content.forEach((text, index) => {
            const y = canvas.height / 2 + index * (fontSize + FontGap)
            ctx.fillText(text, canvas.width / 2, y)
        })

        // 设置水印样式
        const base64Url = canvas.toDataURL()
        this.watermarkRef.style.backgroundImage = `url('${base64Url}')`
        this.watermarkRef.style.backgroundRepeat = 'repeat'
        this.watermarkRef.style.backgroundSize = `${this.width}px ${this.height}px`
        this.watermarkRef.style.opacity = String(this.opacity)
        this.watermarkRef.style.zIndex = String(this.zIndex)
    }

    @Watch('$props', { deep: true })
    onPropsChange() {
        this.renderWatermark()
    }
}
</script>

<style lang="less" scoped>
.watermark-container {
    position: relative;

    .watermark-content {
        position: relative;
        z-index: 1;
    }

    .watermark-layer {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        background-position: 0 0;
    }
}
</style>
