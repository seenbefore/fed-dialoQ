<template>
    <div v-if="isDev" ref="dragRef" class="back-to-home" :style="position" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
        <div class="circle-button" @click="handleBackHome">
            <van-icon name="wap-home-o" />
        </div>
    </div>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'

@Component({
    name: 'BackToHome',
})
export default class BackToHome extends Vue {
    /** 是否是开发环境 */
    private isDev = process.env.NODE_ENV === 'development'

    /** 位置样式 */
    private position = {
        bottom: '20px',
        right: '20px',
    }

    /** 拖拽相关数据 */
    private dragData = {
        startX: 0,
        startY: 0,
        lastX: 0,
        lastY: 0,
        isDragging: false,
    }

    /** 返回首页 */
    private handleBackHome() {
        this.$router.push('/')
    }

    /** 开始拖拽 */
    private handleTouchStart(e: TouchEvent) {
        const touch = e.touches[0]
        this.dragData.startX = touch.clientX
        this.dragData.startY = touch.clientY
        this.dragData.isDragging = true

        // 获取当前位置
        const style = window.getComputedStyle(this.$refs.dragRef as HTMLElement)
        this.dragData.lastX = parseInt(style.right)
        this.dragData.lastY = parseInt(style.bottom)
    }

    /** 拖拽中 */
    private handleTouchMove(e: TouchEvent) {
        if (!this.dragData.isDragging) return

        const touch = e.touches[0]
        const deltaX = touch.clientX - this.dragData.startX
        const deltaY = touch.clientY - this.dragData.startY

        // 计算新位置
        const newRight = Math.max(0, this.dragData.lastX - deltaX)
        const newBottom = Math.max(0, this.dragData.lastY - deltaY)

        // 限制不超出屏幕
        const maxRight = window.innerWidth - (this.$refs.dragRef as HTMLElement).offsetWidth
        const maxBottom = window.innerHeight - (this.$refs.dragRef as HTMLElement).offsetHeight

        this.position = {
            right: `${Math.min(maxRight, newRight)}px`,
            bottom: `${Math.min(maxBottom, newBottom)}px`,
        }

        // 阻止页面滚动
        e.preventDefault()
    }

    /** 结束拖拽 */
    private handleTouchEnd() {
        this.dragData.isDragging = false
    }
}
</script>

<style lang="less" scoped>
.back-to-home {
    position: fixed;
    z-index: 999;
    touch-action: none;

    .circle-button {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

        .van-icon {
            font-size: 20px;
            color: #fff;
        }

        &:active {
            opacity: 0.8;
        }
    }
}
</style>
