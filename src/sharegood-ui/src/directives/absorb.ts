import { throttle } from 'lodash'
import ResizeObserver from 'resize-observer-polyfill'
import Vue from 'vue'

/**
 * 判断是否是滚动容器
 * @param el
 * @returns
 */
function isScroller(el: HTMLElement) {
    const style = window.getComputedStyle(el, null)
    const scrollValues = ['auto', 'scroll']
    return scrollValues.includes(style.overflow) || scrollValues.includes(style.overflowY)
}
/**
 * 获取父层滚动容器
 * @param el
 * @returns
 */
function getParentScroller(el: HTMLElement) {
    let parent: HTMLElement | null = el
    while (parent) {
        if ([window, document, document.documentElement].includes(parent)) {
            // return document.querySelector('html')!
            return window
        }
        if (isScroller(parent)) {
            return parent
        }
        parent = parent.parentNode as HTMLElement
    }
    return parent || window //document.querySelector('html')!
}

function isWindow(el: HTMLElement | Window): el is Window {
    return el === window
}

interface BoundingClientRect {
    top: number
    x: number
    left: number
    right: number
    bottom: number
    y: number
    width: number
    height: number
}
/**
 * 获取相对视窗尺寸信息
 * @param el
 * @returns
 */
function getBoundingClientRect(el: HTMLElement | Window): BoundingClientRect {
    if (isWindow(el)) {
        const { width, height } = getClientSize()
        return {
            top: 0,
            x: 0,
            left: 0,
            y: 0,
            right: width,
            bottom: height,
            width,
            height,
        }
    }
    const { top, left, right, bottom, x, y, width, height } = el.getBoundingClientRect()
    return { top: top, x: x, left, right, bottom, y, width, height }
}
export function getClientSize() {
    const width = document.querySelector('html')?.clientWidth ?? window.innerWidth
    const height = document.querySelector('html')?.clientHeight ?? window.innerHeight
    return { width, height }
}

/**吸附位置 */
enum STICKY_POS {
    TOP = 'top',
    BOTTOM = 'bottom',
}
interface AbsorbConfig {
    /**指定吸附元素的选择器 */
    absorbDomSelector?: string
    disabled?: boolean
    top?: number
    bottom?: number
    zIndex?: number
    align?: 'left' | 'right'
    scrollDom?: () => HTMLElement
    /**设置吸附后 */
    setAbsorbAfter?: (scrollerRect: BoundingClientRect, absorberRect: BoundingClientRect, scroller: HTMLElement | Window) => void
    /**取消吸附后 */
    cancelAbsorbAfter?: (scrollerRect: BoundingClientRect, absorberRect: BoundingClientRect, scroller: HTMLElement | Window) => void
}

class ScrollerObserver {
    private weakMap = new WeakMap<HTMLElement | Window, Map<HTMLElement, Absorb>>()

    set(absorber: Absorb) {
        if (!this.weakMap.has(absorber.scroller)) {
            this.weakMap.set(absorber.scroller, new Map())
            this.initMutationObserver(absorber)
            this.initResize(absorber)
        }
        const absorberCache = this.weakMap.get(absorber.scroller)!
        absorberCache.set(absorber.absorber, absorber)
    }
    getAbsorbersIn(scroller: HTMLElement | Window) {
        return this.weakMap.get(scroller)
    }

    private initMutationObserver(absorber: Absorb) {
        let observerTimer: any = 0
        const observerHandler = throttle(
            ((mutationsList, observer) => {
                if (absorber.scrolling) return
                const absorbers = this.weakMap.get(absorber.scroller)
                const changed = mutationsList.some(mutation => {
                    return (mutation.type === 'childList' || mutation.type === 'attributes') && !absorbers?.has(mutation.target as HTMLElement)
                })
                if (!changed) return
                // console.log('滚动容器内节点变化')
                observerTimer && clearTimeout(observerTimer)
                observerTimer = setTimeout(() => {
                    absorbers?.forEach(_absorber => {
                        _absorber.updateAbsorb()
                    })
                }, 100)
            }) as MutationCallback,
            16,
        ).bind(this)

        // 创建一个观察者对象
        const observer = new MutationObserver(observerHandler)

        // 观察者的配置（观察目标节点的子节点变化和属性变化）
        // 传入目标节点和观察选项并开始观察
        observer.observe(isWindow(absorber.scroller) ? window.document : absorber.scroller, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style'] })
    }
    private initResize(absorber: Absorb) {
        const targets = this.weakMap.get(absorber.scroller)
        if (isWindow(absorber.scroller)) {
            window.addEventListener('resize', () => {
                targets?.forEach(absorber => {
                    absorber.updateAbsorb()
                })
            })
            return
        }
        // 监听元素尺寸变化
        const ro = new ResizeObserver(
            throttle(() => {
                // console.log('滚动容器尺寸变化')
                targets?.forEach(absorber => {
                    absorber.updateAbsorb()
                })
            }, 100),
        )
        // 开始观察
        ro.observe(absorber.scroller)
    }
}
class Absorb {
    scrollerObserver!: ScrollerObserver
    /**吸附配置 */
    absorbConfig: AbsorbConfig = {}
    /**需要吸附的dom */
    absorber!: HTMLElement
    /**需要吸附的dom的占位 */
    absorberCopy: HTMLElement | null = null
    /**吸附的dom原始样式 */
    originStyle = ''
    /**吸附位置 */
    absorbPos = STICKY_POS.TOP
    /**吸附距离顶部距离 */
    absorbDistance = 0
    /**滚动容器 */
    scroller!: HTMLElement | Window
    absorberRect!: BoundingClientRect
    constructor(el: HTMLElement, config: AbsorbConfig, scrollerObserver: ScrollerObserver) {
        this.absorbConfig = Object.assign({ ...this.absorbConfig }, config)
        // console.log('init absorb', this.absorbConfig)
        this.absorber = el
        if (this.absorbConfig.absorbDomSelector) {
            this.absorber = el.querySelector(this.absorbConfig.absorbDomSelector) as HTMLElement
        } else {
            this.absorber = el
        }
        if (this.absorbConfig.top !== undefined) {
            this.absorbPos = STICKY_POS.TOP
            this.absorbDistance = this.absorbConfig.top ?? 0
        } else if (this.absorbConfig.bottom !== undefined) {
            this.absorbPos = STICKY_POS.BOTTOM
            this.absorbDistance = this.absorbConfig.bottom ?? 0
        }
        this.scroller = config.scrollDom?.() ?? getParentScroller(this.absorber)
        // console.log('this.scroller', this.scroller)
        // console.log('this.absorber', this.absorber)

        scrollerObserver.set(this)
        this.scrollerObserver = scrollerObserver

        const onScroll = throttle(this.updateAbsorb, 100).bind(this)
        this.scroller.addEventListener('scroll', onScroll)
        setTimeout(() => {
            onScroll()
        }, 100)
    }

    /**
     * 设置粘性
     */
    setAbsorbHandler(options: {
        allowAbsorb: (scrollerRect: BoundingClientRect, absorberRect: BoundingClientRect) => boolean
        setAbsorbAfter?: (scrollerRect: BoundingClientRect, absorberRect: BoundingClientRect) => void
    }) {
        const scrollerRect = getBoundingClientRect(this.scroller)
        const absorberRect = getBoundingClientRect(this.absorberCopy || this.absorber)
        this.absorberRect = absorberRect

        if (!options.allowAbsorb(scrollerRect, absorberRect)) {
            // 还原原始样式
            this.absorberCopy?.remove()
            this.absorberCopy = null
            this.absorber.setAttribute('style', this.originStyle)
            this.absorber.removeAttribute('absorb')
            this.absorbConfig.cancelAbsorbAfter?.(scrollerRect, absorberRect, this.scroller)
            return
        }
        // 存在复制了一份粘性占位节点。则表示在粘黏中
        if (!this.absorberCopy) {
            // 创建粘黏占位节点
            this.absorberCopy = this.absorber.cloneNode(true) as HTMLElement
            this.absorberCopy.setAttribute('absorb-copy', '')
            this.absorberCopy.style.opacity = '0'
            this.absorberCopy.style.height = `${absorberRect.height}px`
            this.absorber.parentElement?.insertBefore(this.absorberCopy, this.absorber)
            // 记录原始样式
            this.originStyle = this.absorber.getAttribute('style') || ''
            this.absorber.setAttribute('absorb', '')
        }

        // console.log('zIndex', absorbConfig.zIndex || 1, absorberCopy.style.zIndex || '0')
        // 设置黏贴元素的样式
        const align = this.absorbConfig.align || 'left'
        const clientWidth = getClientSize().width
        Object.assign(this.absorber.style, {
            position: 'fixed',
            overflow: 'hidden',
            zIndex: `${(this.absorbConfig.zIndex || 1) + (this.absorberCopy.style.zIndex || '0')}`,
            width: `${absorberRect.width}px`,
            [align]: align === 'right' ? `${clientWidth - absorberRect.right}px` : `${absorberRect.left}px`,
        })
        options.setAbsorbAfter?.(scrollerRect, absorberRect)
        this.absorbConfig.setAbsorbAfter?.(scrollerRect, absorberRect, this.scroller)
    }

    scrolling = false
    scrollingTimer: any = 0
    /**
     * 更新吸附
     */
    updateAbsorb() {
        this.scrolling = true
        this.scrollingTimer && clearTimeout(this.scrollingTimer)
        this.scrollingTimer = setTimeout(() => {
            this.scrolling = false
        }, 100)
        const absorbPosHandleMap = {
            [STICKY_POS.TOP]: () => {
                this.setAbsorbHandler({
                    allowAbsorb: (scrollerRect, absorberRect) => {
                        // console.log('allowAbsorb', absorberRect.top - scrollerRect.top - this.absorbDistance)
                        return absorberRect.top - scrollerRect.top - this.absorbDistance < 0
                    },
                    setAbsorbAfter: (scrollerRect, absorberRect) => {
                        this.absorber.style.top = `${scrollerRect.top + this.absorbDistance}px`
                    },
                })
            },
            [STICKY_POS.BOTTOM]: () => {
                this.setAbsorbHandler({
                    allowAbsorb: (scrollerRect, absorberRect) => absorberRect.bottom - (scrollerRect.bottom - this.absorbDistance) > 0,
                    setAbsorbAfter: (scrollerRect, absorberRect) => {
                        this.absorber.style.bottom = `${window.innerHeight - scrollerRect.bottom + this.absorbDistance}px`
                        /**在同一滚动容器下的吸附节点 */
                        const sameScrollerAbsorbers = this.scrollerObserver.getAbsorbersIn(this.scroller)
                        if (!sameScrollerAbsorbers) return
                        /**吸底的吸附节点 */
                        const bottomAbsorber: Absorb[] = []
                        sameScrollerAbsorbers.forEach(_absorber => {
                            if (_absorber.absorbPos !== STICKY_POS.BOTTOM) return
                            bottomAbsorber.push(_absorber)
                        })
                        bottomAbsorber.sort((a, b) => {
                            const aTop = a.absorberRect.top
                            const bTop = b.absorberRect.top
                            if (aTop === bTop) return 0
                            return aTop > bTop ? -1 : 1
                        })
                        let index = -1
                        bottomAbsorber.some((_absorber, i) => {
                            if (_absorber.absorber === this.absorber) {
                                index = i
                                return true
                            }
                            return false
                        })
                        if (index === -1) return
                        this.absorber.style.zIndex = `${+this.absorber.style.zIndex + index}`
                    },
                })
            },
        }
        absorbPosHandleMap[this.absorbPos]?.()
    }
}

const scrollerObserver = new ScrollerObserver()
export const useAbsorb = () => {
    return {
        init(el: HTMLElement, config?: AbsorbConfig) {
            if (config?.disabled) return
            return new Absorb(el, { ...(config ?? {}) }, scrollerObserver)
        },
    }
}

Vue.directive('absorb', {
    inserted: (el, binding, vnode) => {
        const { absorbDomSelector, ...restConfig } = binding.value ?? {}
        useAbsorb().init(el, restConfig)
    },
})
