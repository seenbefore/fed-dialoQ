import Vue from 'vue'
import ResizeObserver from 'resize-observer-polyfill'

/**
 * 1、查询条件不超过一行的(查询条件只有1个或2个)，定宽显示，宽度：280，查询、重置按钮和查询条件并排显示
 * 2、弹窗的查询条件都是定宽
 * 3、查询条件的文本宽度以列为维度，单列最长文本宽度作为实际宽度
 * 4、查询条件超过一行的，自适应显示
 */

interface QueryFormLayoutConfig {
    /**禁用 */
    disabled?: boolean
    /**多少列 */
    columnCount?: number
    /**间隙 */
    gap?: number
    /**表单content内容的宽度 (设置为auto时，会铺满剩余空间，设置为数字时，为固定宽度) */
    contentWidth?: number | 'auto'
}
interface OnResizeWeakMapValue {
    /**resize监听者 */
    resizeObserver: ResizeObserver
    /**resize时触发的句柄 */
    handlers: (() => void)[]
}
export const useQueryFormLayout = () => {
    const onResizeWeakMap = new WeakMap<HTMLElement, OnResizeWeakMapValue>()

    /**
     * 监听resize事件
     * @param el
     * @param handler
     */
    function watchResize(el: HTMLElement, handler: () => void) {
        if (!onResizeWeakMap.has(el)) {
            // 监听元素尺寸变化
            const resizeObserver = new ResizeObserver(() => {
                const resizeHandlers = onResizeWeakMap.get(el)
                if (!resizeHandlers) return
                resizeHandlers.handlers.forEach(handler => handler())
            })
            // 开始观察
            resizeObserver.observe(el)
            onResizeWeakMap.set(el, {
                resizeObserver,
                handlers: [],
            })
        }
        const onResizeInfo = onResizeWeakMap.get(el)
        if (!onResizeInfo) return
        onResizeInfo.handlers.push(handler)
    }

    /**
     * 更新布局
     * @param el
     * @param config
     * @returns
     */
    function updateLayout(el: HTMLElement, config?: QueryFormLayoutConfig) {
        const { columnCount = 3, gap = 40, contentWidth = 250, disabled } = config ?? {}
        if (disabled) return
        const formContainerPaddingLeft = parseInt(window.getComputedStyle(el).paddingLeft)
        const formContainerPaddingRight = parseInt(window.getComputedStyle(el).paddingRight)
        const formContainerWidth = el.getBoundingClientRect().width - formContainerPaddingLeft - formContainerPaddingRight

        // 设置label宽度
        const labels = el.querySelectorAll('.sg-data-form>.sg-form-row>.el-col>.el-form-item>.el-form-item__label')
        // 将 label 宽度设置为 auto，让 label 宽度自适应内容
        labels.forEach(label => {
            ;(label as HTMLElement).style.width = 'auto'
        })
        /**每列label宽 */
        let labelWidthPerColumn: number[] = []
        Array.from(labels).forEach((label, index) => {
            const columnIndex = index % columnCount
            const labelWidth = label.getBoundingClientRect().width
            labelWidthPerColumn[columnIndex] = Math.max(labelWidthPerColumn[columnIndex] ?? 0, Math.ceil(labelWidth))
        })
        // 追加间隙宽度
        labelWidthPerColumn = labelWidthPerColumn.map((maxWidth, index) => (index === 0 ? maxWidth : maxWidth + gap))
        labels.forEach((label, index) => {
            const columnIndex = index % columnCount
            ;(label as HTMLElement).style.width = `${labelWidthPerColumn[columnIndex]}px`
        })

        // 设置content宽度
        const contents = el.querySelectorAll('.sg-data-form>.sg-form-row>.el-col>.el-form-item')
        /**每列content宽 */
        let contentWidthPerColumn = (formContainerWidth - labelWidthPerColumn.reduce((pre, cur) => pre + cur)) / columnCount
        if (contentWidth !== 'auto') {
            contentWidthPerColumn = Math.min(contentWidth, contentWidthPerColumn)
        } else if (contentWidth === 'auto' && contents.length < columnCount) {
            // 当contentWidth为auto，且formItem个数少于3个时，将content宽度设置为定宽
            contentWidthPerColumn = Math.min(280, contentWidthPerColumn)
        }
        contents.forEach((content, index) => {
            const parent = content.parentNode as HTMLElement
            parent.style.width = `auto`
            const _content = content.querySelector('.sg-data-form>.sg-form-row>.el-col>.el-form-item>.el-form-item__content') as HTMLElement
            _content.style.width = `${contentWidthPerColumn}px`
        })

        const formActionBox = el.querySelector('.sg-data-form>.sg-form-row>.el-col>.sg-data-form-action') as HTMLElement
        const formActionWidth = labels.length < columnCount ? formActionBox?.getBoundingClientRect()?.width ?? 0 : 0

        // 设置表单宽度
        const formWidth = labelWidthPerColumn.reduce((pre, cur) => pre + cur + contentWidthPerColumn, 0) + formActionWidth
        const form = el.querySelector('.sg-data-form') as HTMLElement
        form.style.maxWidth = `${formWidth}px`
        form.style.margin = `0 auto`
    }

    /**
     * 销毁
     * @param el
     */
    function destroy(el: HTMLElement) {
        if (!onResizeWeakMap.has(el)) return
        const onResizeInfo = onResizeWeakMap.get(el)
        if (!onResizeInfo) return
        const { resizeObserver, handlers } = onResizeInfo
        handlers.pop()
        if (handlers.length) return
        resizeObserver.unobserve(el)
    }

    /**
     * 初始化
     * @param el
     * @param config
     */
    function init(el: HTMLElement, config?: QueryFormLayoutConfig) {
        watchResize(el, () => {
            updateLayout(el, config)
        })
        updateLayout(el, config)
    }
    return {
        init,
        updateLayout,
        destroy,
    }
}

const queryFormLayout = useQueryFormLayout()

Vue.directive('query-form-layout', {
    inserted: (el, binding) => {
        const { ...restConfig } = binding.value ?? {}
        queryFormLayout.init(el, restConfig)
    },
    componentUpdated: (el, binding) => {
        const { ...restConfig } = binding.value ?? {}
        setTimeout(() => {
            queryFormLayout.updateLayout(el, restConfig)
        })
    },
    unbind: el => {
        queryFormLayout.destroy(el)
    },
})
