import { debounce } from 'lodash'
import { Tooltip } from 'element-ui'
import Vue from 'vue'
import { VNode } from 'vue/types/umd'
import { TooltipEffect } from 'element-ui/types/tooltip'
import { PopoverPlacement } from 'element-ui/types/popover'

interface TooltipProps {
    /**主题 */
    effect?: TooltipEffect
    /**Tooltip内容 */
    content?: string | VNode | VNode[]
    /** Tooltip的位置 */
    placement?: PopoverPlacement
    /** Tooltip是否禁用 */
    disabled?: boolean
    /** Tooltip的偏移量 */
    offset?: number
    /** 动画名 */
    transition?: string
    /** 是否显示箭头 */
    visibleArrow?: boolean
    /** 显示延迟(ms) */
    openDelay?: number
    /** Tooltip的popper自定义类名 */
    popperClass?: string
    /** Whether to control Tooltip manually. mouseenter and mouseleave won't have effects if set to true */
    manual?: boolean
    /** 鼠标是否可以移入tooltip中	 */
    enterable?: boolean
    /** Timeout in milliseconds to hide tooltip */
    hideAfter?: string
    /** Tooltip tabindex */
    tabindex?: number
}

let tooltip!: any
export const activateTooltip = debounce((tooltipRef?: any) => {
    tooltipRef && tooltipRef.handleShowPopper()
}, 50)

/**获取tooltip */
export function getTooltip() {
    if (!tooltip) {
        // console.log('生成tooltip')
        const Profile = Vue.extend(Tooltip)
        tooltip = new Profile().$mount()
    }
    return tooltip
}
/**显示tooltip */
export function showTooltip(referenceElm: HTMLElement, props: TooltipProps = {}) {
    const tooltip = getTooltip()
    tooltip.placement = props?.placement
    tooltip.enterable = props?.enterable
    tooltip.content = props?.content
    tooltip.referenceElm = referenceElm
    tooltip.$refs.popper && (tooltip.$refs.popper.style.display = 'none')
    tooltip.doDestroy()
    tooltip.setExpectedState(true)
    activateTooltip(tooltip)
}
/**隐藏tooltip */
export function hiddenTooltip() {
    const tooltip = getTooltip()
    tooltip.setExpectedState(false)
    tooltip.handleClosePopper()
}
