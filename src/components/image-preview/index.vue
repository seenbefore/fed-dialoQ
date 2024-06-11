<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import { on, off, isFirefox, rafThrottle } from './utils'

/* 图片的展示模式 */
const Mode = {
    CONTAIN: 'contain',
    ORIGINAL: 'original',
}

/* 图片的操作：缩小，放大，向左旋转90度，向右旋转90度 */
type IAction = 'zoomIn' | 'zoomOut' | 'rotateLeft' | 'rotateRight'

/* 火狐鼠标滚动事件需要区分 */
const mousewheelEventName = isFirefox() ? 'DOMMouseScroll' : 'mousewheel'

interface IActionOptions {
    zoomRate: number
    rotateDeg: number
    enableTransition: boolean
}

@Component({
    name: 'ImagePreview',
})
export default class ImagePreview extends Vue {
    /* 展示的图片地址索引 */
    @Prop({ default: 0 }) start!: number
    @Prop({
        type: [Array, String],
        default: () => [],
    })
    public url!: Array<string> | string

    /* 是否添加到body上 */
    @Prop({ type: Boolean, default: true })
    public appendToBody!: boolean

    /* 是否循环 */
    @Prop({ type: Boolean, default: true })
    public loop!: boolean

    /* 是否通过点击遮罩关闭弹框 */
    @Prop({ type: Boolean, default: true })
    public closeOnClickModal!: boolean

    @Ref('imgContainerRef')
    public imgContainerRef!: HTMLDivElement

    public visible = false

    public mode = Mode.CONTAIN

    public loading = true

    /* 展示的图片索引 */
    public index = 0

    public transform = {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false,
    }
    created() {
        this.index = this.start
    }
    public get urlList() {
        return Array.isArray(this.url) ? this.url : [this.url]
    }
    public get isSingle(): boolean {
        return this.urlList.length <= 1
    }
    public get isFirst(): boolean {
        return this.index === 0
    }
    public get isLast(): boolean {
        return this.index === this.urlList.length - 1
    }

    /* 获取img的样式 */
    public get imgStyle() {
        const { scale, deg, offsetX, offsetY, enableTransition } = this.transform
        const style: Record<string, any> = {
            transform: `scale(${scale}) rotate(${deg}deg)`,
            transition: enableTransition ? 'transform .3s' : '',
            /* 修复图片移动的时候，margin移动的距离不对 */
            'margin-left': `${offsetX * 2}px`,
            'margin-top': `${offsetY * 2}px`,
        }
        if (this.mode === Mode.CONTAIN) {
            style.maxWidth = style.maxHeight = '100%'
        }
        return style
    }

    public get currentUrl() {
        return this.urlList[this.index]
    }

    /* 按键点击事件 */
    private keyDownHandler = rafThrottle((e: KeyboardEvent): void => {
        e.stopPropagation()
        const keyCode = e.keyCode
        switch (keyCode) {
            // ESC
            case 27:
                this.hide()
                break
            // SPACE
            case 32:
                this.toggleMode()
                break
            // LEFT_ARROW
            case 37:
                this.prev()
                break
            // UP_ARROW
            case 38:
                this.handleActions('zoomIn')
                break
            // RIGHT_ARROW
            case 39:
                this.next()
                break
            // DOWN_ARROW
            case 40:
                this.handleActions('zoomOut')
                break
        }
    })

    /* 鼠标滚动事件 */
    private mouseWheelHandler = rafThrottle((e: WheelEvent & { wheelDelta?: number }): void => {
        const delta = e.wheelDelta ? e.wheelDelta : -e.detail
        if (delta > 0) {
            this.handleActions('zoomIn', {
                zoomRate: 0.015,
                enableTransition: false,
            })
        } else {
            this.handleActions('zoomOut', {
                zoomRate: 0.015,
                enableTransition: false,
            })
        }
    })

    /**
     * 执行对图片进行的对应的操作
     * @param action
     * @param options
     */
    public handleActions(action: IAction, options?: Partial<IActionOptions>): void {
        if (this.loading) return
        const { zoomRate, rotateDeg, enableTransition } = {
            zoomRate: 0.2,
            rotateDeg: 90,
            enableTransition: true,
            ...(options ?? {}),
        } as IActionOptions

        const { transform } = this
        switch (action) {
            case 'zoomOut':
                if (transform.scale > 0.2) {
                    transform.scale = parseFloat((transform.scale - zoomRate).toFixed(3))
                }
                break
            case 'zoomIn':
                transform.scale = parseFloat((transform.scale + zoomRate).toFixed(3))
                break
            case 'rotateLeft':
                transform.deg += rotateDeg
                break
            case 'rotateRight':
                transform.deg -= rotateDeg
                break
        }
        transform.enableTransition = enableTransition
    }

    /* 恢复 */
    public reset(): void {
        this.transform = {
            scale: 1,
            deg: 0,
            offsetX: 0,
            offsetY: 0,
            enableTransition: false,
        }
    }

    public modelClick(): void {
        if (this.closeOnClickModal) {
            this.hide()
        }
    }

    /* 隐藏 */
    public hide(): void {
        this.visible = false
        this.$emit('hide')
    }

    /* 打开弹框 */
    public open(): void {
        this.visible = true
    }

    /* 切换mode */
    public toggleMode(): void {
        if (this.loading) return
        const modeNames = Object.keys(Mode) as Array<keyof typeof Mode>
        const modeValues = Object.values(Mode)
        const index = modeValues.indexOf(this.mode)
        const nextIndex = (index + 1) % modeNames.length
        this.mode = Mode[modeNames[nextIndex]]
        this.reset()
    }

    /* 上一张 */
    public prev(): void {
        if (this.isFirst) {
            if (this.loop) {
                this.index = this.urlList.length - 1
            }
        } else {
            this.index--
        }
    }

    /* 下一张 */
    public next(): void {
        if (this.isLast) {
            if (this.loop) {
                this.index = 0
            }
        } else {
            this.index++
        }
    }

    public handleImgLoad(): void {
        this.loading = false
    }

    public handleImgError(e: Event): void {
        this.loading = false
        const target = e.target as HTMLImageElement
        target.alt = '加载失败'
    }

    /* 图片移动事件 */
    public handleMouseDown(e: MouseEvent): void {
        if (this.loading || e.button !== 0) return
        const { offsetX, offsetY } = this.transform
        const startX = e.pageX
        const startY = e.pageY
        const dragHandler = rafThrottle(ev => {
            this.transform.offsetX = offsetX + ev.pageX - startX
            this.transform.offsetY = offsetY + ev.pageY - startY
        })
        on(document, 'mousemove', dragHandler)
        on(document, 'mouseup', _ => {
            off(document, 'mousemove', dragHandler)
        })
        e.preventDefault()
    }

    /* 初始化事件 */
    public deviceSupportInstall(): void {
        on(document, 'keydown', this.keyDownHandler)
        on(document, mousewheelEventName, this.mouseWheelHandler)
    }

    /* 卸载事件 */
    public deviceSupportUninstall(): void {
        off(document, 'keydown', this.keyDownHandler)
        off(document, mousewheelEventName, this.mouseWheelHandler)
        Reflect.set(this, 'keyDownHandler', null)
        Reflect.set(this, 'mouseWheelHandler', null)
    }

    public mounted(): void {
        this.deviceSupportInstall()
        if (this.appendToBody) {
            document.body.appendChild(this.$el)
        }
        this.imgContainerRef.focus()
    }

    public destroyed() {
        this.deviceSupportUninstall()
        if (this.appendToBody && this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el)
        }
    }
}
</script>

<template>
    <div v-show="visible" ref="imgContainerRef" class="image-preview__container">
        <div class="image-preview__model" @click="modelClick"></div>
        <div class="image-preview__btn image-preview__close" @click="hide">
            <i class="close-icon"></i>
        </div>
        <template v-if="urlList.length > 1">
            <div v-if="!loop ? !isFirst : true" class="image-preview__btn image-preview__prev" @click="prev">
                <i class="prev-icon"></i>
            </div>
            <div class="image-preview__btn image-preview__next" @click="next">
                <i class="next-icon"></i>
            </div>
        </template>
        <div class="image-preview__btn image-preview__actions" :class="mode === 'original' ? 'image-preview__actions__original' : ''">
            <div class="image-preview__inner">
                <div class="image-preview__zoom-out" @click="handleActions('zoomOut')"></div>
                <div class="image-preview__zoom-in" @click="handleActions('zoomIn')"></div>
                <div class="image-preview__actions__divider"></div>
                <div class="image-preview__full-screen" @click="toggleMode"></div>
                <div class="image-preview__actions__divider"></div>
                <div class="image-preview__rotate-right" @click="handleActions('rotateRight')"></div>
                <div class="image-preview__rotate-left" @click="handleActions('rotateLeft')"></div>
            </div>
        </div>
        <div class="image-preview__image-container">
            <img :style="imgStyle" @load="handleImgLoad" @error="handleImgError" @mousedown="handleMouseDown" :src="currentUrl" alt="1" />
        </div>
    </div>
</template>

<style scoped lang="less">
.image-preview {
    &__container {
        position: fixed;
        z-index: 99999;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        .close-icon {
            position: relative;
            width: 20px;
            height: 20px;
            cursor: pointer;
        }

        .close-icon::before,
        .close-icon::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 1.5px;
            height: 20px;
            background-color: #fff;
            transform: translate(-50%, -50%) rotate(45deg);
        }

        .close-icon::before {
            transform: translate(-50%, -50%) rotate(-45deg);
        }

        .prev-icon,
        .next-icon {
            position: relative;
            width: 20px;
            height: 20px;
            cursor: pointer;
            transform-origin: center;
            transform: translateX(-1px) rotate(-90deg);
        }

        .next-icon {
            transform: translateX(1px) rotate(90deg);
        }

        .prev-icon::before,
        .next-icon::before,
        .prev-icon::after,
        .next-icon::after {
            content: '';
            position: absolute;
            top: 50%;
            width: 12px;
            height: 2px;
            background-color: #fff;
        }

        .prev-icon::before,
        .next-icon::before {
            left: 8px;
            transform: translate(0, -50%) rotate(45deg);
        }

        .prev-icon::after,
        .next-icon::after {
            right: 8px;
            transform: translate(0, -50%) rotate(-45deg);
        }
    }

    &__model {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.5;
        background-color: #000;
    }

    &__btn {
        position: absolute;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        opacity: 0.8;
        cursor: pointer;
        box-sizing: border-box;
        user-select: none;
    }

    &__close {
        top: 40px;
        right: 40px;
        width: 40px;
        height: 40px;
        font-size: 24px;
        color: #fff;
        background-color: #606266;
    }

    &__prev,
    &__next {
        top: 50%;
        transform: translateY(-50%);
        width: 44px;
        height: 44px;
        font-size: 24px;
        color: #fff;
        background-color: #606266;
        border-color: #fff;
    }

    &__prev {
        left: 40px;
    }

    &__next {
        right: 40px;
        text-indent: 2px;
    }

    &__actions {
        left: 50%;
        bottom: 30px;
        transform: translateX(-50%);
        width: 282px;
        height: 44px;
        padding: 0 23px;
        border-color: #fff;
        border-radius: 22px;
        background-color: #606266;
        background-image: url('./assets/icon-contain.png');
        background-repeat: no-repeat;
        background-position: left;
        background-size: contain;

        &__original {
            background-image: url('./assets/icon-original.png');
        }
    }

    &__inner {
        width: 100%;
        height: 100%;
        text-align: justify;
        cursor: default;
        font-size: 23px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-around;

        & > div {
            cursor: pointer;
            &:not(.image-preview__actions__divider) {
                width: 23px;
                height: 23px;
            }
        }
    }

    &__image-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
