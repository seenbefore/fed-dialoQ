<template>
    <div class="ellipsis-tooltip" @mouseenter="onmouseenter" @mouseleave="onmouseleave">
        <div class="ellipsis-tooltip__container" ref="container" :class="{ 'single-line': this.rowCount === 1 }" :style="{ '-webkit-line-clamp': this.rowCount }">
            <span class="ellipsis-tooltip__content" ref="content">
                <slot>
                    <span>
                        <ex-slot :render="$scopedSlots.default || (() => value)"></ex-slot>
                    </span>
                </slot>
            </span>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Ref, Emit } from 'vue-property-decorator'
import { ExSlot } from '../utils/ExSlot'
import { showTooltip, hiddenTooltip } from './service'

@Component({
    name: 'EllipsisTooltip',
    components: { ExSlot },
})
export default class EllipsisTooltip extends Vue {
    @Prop({ type: [String], default: '' })
    value!: string
    /**行数 */
    @Prop({ type: Number, default: 1 })
    rowCount!: number
    /**Tooltip 的出现位置 */
    @Prop({ type: String, default: 'top' })
    placement!: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
    /**鼠标是否可进入到 tooltip 中 */
    @Prop({ type: Boolean, default: true })
    enterable!: boolean
    /**禁用tooltip显示a */
    @Prop({ type: Boolean, default: false })
    disabledTooltip!: boolean

    @Emit('overflow')
    emitOverflow(overflow: boolean) {
        return overflow
    }

    created() {}
    mounted() {}

    @Ref('container')
    containerRef!: HTMLElement
    @Ref('content')
    contentRef!: HTMLElement

    onmouseenter() {
        if (this.rowCount === 1) {
            const boxWidth = this.containerRef?.offsetWidth ?? 0
            const textWidth = this.contentRef?.offsetWidth ?? 0
            const overflow = textWidth > boxWidth
            this.showTooltip(overflow)
            this.emitOverflow(overflow)
            return
        }
        /**获取文字大小 */
        const textStyle = getComputedStyle(this.contentRef)
        const textFontSize = parseFloat(textStyle.getPropertyValue('font-size'))
        const textLineHeight = parseFloat(textStyle.getPropertyValue('line-height'))
        /**获取计算出指定行的最大高度 */
        const maxHeight = Math.round(Math.max(textFontSize / 0.74, textLineHeight) * this.rowCount)
        /**获取文本实际占据的高度 */
        const textHeight = this.contentRef.offsetHeight
        const overflow = textHeight > maxHeight
        this.showTooltip(overflow)
        this.emitOverflow(overflow)
    }
    onmouseleave() {
        hiddenTooltip()
    }
    /**显示tooltip */
    showTooltip(overflow: boolean) {
        if (!overflow || this.disabledTooltip) return
        showTooltip(this.containerRef, {
            placement: this.placement,
            enterable: this.enterable,
            content: this.$slots.default || this.value,
            popperClass: 'ellipsis-tooltip__popper',
        })
    }
}
</script>
<style lang="less">
.el-tooltip__popper.ellipsis-tooltip__popper {
    max-width: 90vw;
    line-height: 20px !important;
}
.el-tooltip__popper.is-dark {
    background-color: rgba(0, 0, 0, 0.75);
}
</style>
<style lang="less" scoped>
.ellipsis-tooltip {
    width: 100%;
    .ellipsis-tooltip__container {
        width: 100%;
        &:not(.single-line) {
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
        }
        &.single-line {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
</style>
