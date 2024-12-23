<template>
    <div v-show="disabled">
        <slot></slot>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component({
    name: 'Teleport',
})
export default class Teleport extends Vue {
    @Prop({ type: String, required: true }) to!: string
    @Prop({ type: Boolean, default: false }) disabled!: boolean

    private target: Element | null = null

    @Watch('to')
    onToChange() {
        this.moveDom()
    }
    @Watch('disabled', { immediate: true })
    async onDisabledChange() {
        await this.$nextTick()
        if (this.disabled) {
            this.moveBack()
        } else {
            this.moveDom()
        }
    }

    /**判断dom是否被移动 */
    private isMoved = false
    /** 移动dom */
    private moveDom() {
        if (this.disabled) return
        const target = document.querySelector(this.to)
        if (!target) {
            console.warn(`[Teleport] Target element "${this.to}" not found.`)
            return
        }

        // 直接将slot内容移动到目标元素
        const content = this.$slots.default
        if (content) {
            content.forEach(vnode => {
                if (!vnode.elm) return
                // 如果元素已经在目标位置则不需要移动
                if (vnode.elm.parentElement === target) return
                target.appendChild(vnode.elm)
            })
        }

        this.target = target
        this.isMoved = true
    }
    /** 还原dom */
    private moveBack() {
        if (!this.isMoved) return
        // 组件销毁时将内容移回原位置
        const content = this.$slots.default
        if (content) {
            content.forEach(vnode => {
                if (vnode.elm && vnode.elm.parentElement === this.target) {
                    this.$el.appendChild(vnode.elm)
                }
            })
        }
        this.target = null
        this.isMoved = false
    }
    /** 销毁时还原dom */
    beforeDestroy() {
        this.moveBack()
    }
    /** 内容更新时重新移动 */
    updated() {
        this.$nextTick(this.moveDom)
    }
}
</script>

<style scoped>
.v-teleport-wrapper {
    /* 避免影响原有样式 */
    all: unset;
}
</style>
