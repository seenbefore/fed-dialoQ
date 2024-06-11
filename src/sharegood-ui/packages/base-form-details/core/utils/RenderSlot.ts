import { CreateElement } from 'vue'

/**
 * 渲染插槽
 */
export const RenderSlot = {
    name: 'RenderSlot',
    props: {
        /**
         * 渲染回调
         */
        renderCallBack: {
            type: [Function, String, Number],
        },
        /**
         * 传递给渲染的数据
         */
        data: Object,
    },
    render(h: CreateElement) {
        if (typeof this.renderCallBack === 'function') {
            const result = this.renderCallBack(h, this.data)
            return typeof result === 'object' ? result : h('span', result)
        }
        return this.$slots.default
    },
}
