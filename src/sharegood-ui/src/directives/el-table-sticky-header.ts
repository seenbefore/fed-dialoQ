import { throttle } from 'lodash'
import { generateGUID } from 'icinfo-util'
import ResizeObserver from 'resize-observer-polyfill'
import Vue from 'vue'
/**获取距离最近的可滚动的节点 */
const getScrollDom = (el: HTMLElement, scrollDom: () => HTMLElement) => {
    if (scrollDom?.()) return scrollDom()
    // 查找最近可滚动的节点
    function eleCanScroll(ele: HTMLElement) {
        if (!(ele instanceof HTMLElement)) {
            console.log('fuck off')
            return
        }
        if (ele.scrollTop > 0) {
            return true
        } else {
            ele.scrollTop += 2
            // 元素不能滚动的话，scrollTop 设置不会生效，还会置为 0
            const top = ele.scrollTop
            // 重置滚动位置
            top && (ele.scrollTop = 0)
            return top > 1
        }
    }
    let scrollWrap = el?.parentElement
    if (!scrollWrap) return el
    do {
        if (eleCanScroll(scrollWrap)) break
        const parentElement = scrollWrap.parentElement as HTMLElement
        if (!parentElement) break
        scrollWrap = parentElement
    } while (scrollWrap)
    return scrollWrap
}
/**获取表格的相关信息 */
const getTableInfo = (el: HTMLElement) => {
    const tableRect = el.getBoundingClientRect()
    /**普通表头结点 */
    const tableHeaderDom = el.querySelector('.el-table__header-wrapper') as HTMLElement
    /**左表头尺寸 */
    const tableHeaderRect = tableHeaderDom?.getBoundingClientRect?.() ?? {}
    /**左表格结点 */
    const leftTableDom = el.querySelector('.el-table__fixed') as HTMLElement
    /**左表头结点 */
    const leftTableHeaderDom = leftTableDom?.querySelector?.('.el-table__fixed-header-wrapper') as HTMLElement
    /**右表格结点 */
    const rightTableDom = el.querySelector('.el-table__fixed-right') as HTMLElement
    /**右表头结点 */
    const rightTableHeaderDom = rightTableDom?.querySelector?.('.el-table__fixed-header-wrapper') as HTMLElement
    /**表格内容区节点 */
    const tableBodyDom = el.querySelector('.el-table__body-wrapper') as HTMLElement
    return {
        tableDom: el,
        tableRect,
        tableBodyDom,
        tableHeaderDom,
        tableHeaderRect,
        leftTableHeaderDom,
        rightTableHeaderDom,
    }
}
/**事件监听 */
const eventObserver = (el: HTMLElement | Window, event: string, fn: any) => {
    el.addEventListener(event, fn)
    return {
        disconnect: () => {
            el?.removeEventListener?.(event, fn)
        },
    }
}
/**节流 */
const rafThrottle = (fn: any) => {
    let locked = false
    return function(...args: any[]) {
        if (locked) return
        locked = true
        window.requestAnimationFrame(_ => {
            fn.apply(this, args)
            locked = false
        })
    }
}
/**获取实际要绑定事件的dom */
const getRealBindDom = (dom: any) => {
    return dom?.nodeName === 'HTML' ? document : dom
}
/**创建滚动条 */
const initScroller = (tableDom: HTMLElement) => {
    const tableHeaderDom = tableDom.querySelector('.el-table__header-wrapper .el-table__header') as HTMLElement
    const tableBodyWrapper = tableDom.querySelector('.el-table__body-wrapper') as HTMLElement
    const tableWidth = tableHeaderDom.offsetWidth

    // 创建滚动条
    const scroller = document.createElement('div')
    scroller.classList.add('float-scrollbar')
    scroller.style.zIndex = '5'
    scroller.style.width = '100%'
    scroller.style.height = '20px'
    scroller.style.overflow = 'auto'
    scroller.style.position = 'absolute'
    scroller.style.top = '0px'
    const scrollerContent = document.createElement('div')
    scrollerContent.style.width = `${tableWidth}px`
    scrollerContent.classList.add('float-scrollbar-content')
    scroller.appendChild(scrollerContent)
    tableDom.appendChild(scroller)

    /**将滚动条容器的滚动距离同步给table */
    const scrollerEo = eventObserver(
        scroller,
        'scroll',
        rafThrottle((e: Event) => {
            const target = e.target as HTMLElement
            if (!target) return
            tableBodyWrapper.scrollLeft = target.scrollLeft
        }),
    )
    /**将table的滚动距离同步给滚动条容器 */
    const tableBodyEo = eventObserver(
        tableBodyWrapper,
        'scroll',
        rafThrottle((e: Event) => {
            const target = e.target as HTMLElement
            if (!target) return
            scroller.scrollLeft = target.scrollLeft
        }),
    )

    const updateScrollStyle = ({ transform }: any) => {
        scroller.style.transform = transform
    }

    return {
        scroller,
        updateScrollStyle,
    }
}
/**设置标记位置 */
const setMarker = (el: HTMLElement) => {
    const firstElementChild = el?.firstElementChild
    if (firstElementChild?.classList.contains('elTableStickyHeader-marker')) {
        return
    }
    const marker = document.createElement('div')
    marker.classList.add('elTableStickyHeader-marker')
    marker.style.width = '100%'
    marker.style.height = '0'
    el?.insertBefore(marker, firstElementChild)
}
Vue.directive('elTableStickyHeader', {
    inserted: (el, binding, vnode) => {
        const uuid = generateGUID()
        el.setAttribute('data-uuid', uuid)
        setTimeout(() => {
            const {
                disabled = false,
                /**显示滚动条 */
                visibleScroller = false,
                /**表格区域样式类 */
                tableAreaClass = 'el-table',
                /**其他浮动元素 */
                getOtherFloatElement = () => null,
                // getOtherFloatElement = () =>
                //     (vnode.context?.$refs?.page as any)?.$el,
                /**底部偏移 */
                bottomOffset = 0,
                /**滚动容器dom获取函数 */
                scrollDom = () => {
                    console.warn('推荐设置[scrollDom]滚动容器dom，自动寻找，可能会出现匹配不准确')
                    return
                },
            } = binding.value ?? {}
            if (disabled) return

            let tableInfo = getTableInfo(el)
            if (!tableInfo.tableHeaderDom) return
            /**其他浮动元素 */
            const otherFloatElement = getOtherFloatElement()
            const otherFloatElementHeight = otherFloatElement?.offsetHeight ?? 0
            const otherFloatElementMarinTop = otherFloatElement ? parseFloat(getComputedStyle(otherFloatElement).getPropertyValue('margin-top')) : 0
            /**滚动条 */
            const scrollerInstance = initScroller(tableInfo.tableDom)
            const defaultScrollBarHeight = scrollerInstance?.scroller?.offsetHeight ?? 0
            if (!visibleScroller) {
                scrollerInstance.scroller.style.display = 'none'
            }
            const mouseupEvent = eventObserver(
                window,
                'mouseup',
                rafThrottle((e: Event) => {
                    const path = (e.composedPath?.() ?? []) as HTMLElement[]
                    const tableClick = path.some(dom => {
                        return dom.classList?.contains(tableAreaClass)
                    })
                    // console.log('path', path)
                    if (!tableClick) {
                        setTimeout(() => {
                            // console.log('点击了表格外部区域', path)
                            update()
                        })
                    }
                }),
            )

            /**表头出现在可视区域 */
            let tableHeaderVisible = false
            /**滚动容器dom */
            let scrollContainer = getScrollDom(el, scrollDom)
            setMarker(scrollContainer)
            /**滚动容器的尺寸 */
            // let scrollContainerRect = scrollContainer.getBoundingClientRect()
            let scrollContainerPaddingTop = scrollContainer ? parseFloat(getComputedStyle(scrollContainer).getPropertyValue('padding-top')) : 0
            let scrollContainerFirstRect = scrollContainer?.firstElementChild?.getBoundingClientRect?.() ?? {
                top: 0,
            }
            // 监听表格是否在可视区域
            const io = new IntersectionObserver(
                throttle((entries: any) => {
                    entries.forEach((entrie: any) => {
                        const { target, intersectionRatio } = entrie
                        if (target.classList.contains('el-table')) {
                            // console.log('表格进入可视区域')
                            tableHeaderVisible = intersectionRatio > 0
                            update()
                        }
                    })
                }, 1000 / 60),
                {},
            )
            // 开始观察
            io.observe(tableInfo.tableDom)

            if (!tableInfo.tableBodyDom) return
            // 监听元素尺寸变化
            const ro = new ResizeObserver(
                rafThrottle((entries: any) => {
                    // console.log('ResizeObserver', entries)
                    entries.forEach((entrie: any) => {
                        update()
                    })
                }),
            )
            // 开始观察
            ro.observe(tableInfo.tableBodyDom)
            const resizeEvent = eventObserver(
                window,
                'resize',
                rafThrottle(() => {
                    // console.log('resize')
                    update()
                }),
            )

            function update() {
                tableInfo = getTableInfo(el)
                /**滚动容器dom */
                scrollContainer = getScrollDom(el, scrollDom)
                setMarker(scrollContainer)
                /**滚动容器的尺寸 */
                // scrollContainerRect = scrollContainer.getBoundingClientRect()
                scrollContainerPaddingTop = scrollContainer ? parseFloat(getComputedStyle(scrollContainer).getPropertyValue('padding-top')) : 0
                /**滚动容器下第一个子节点的尺寸 */
                scrollContainerFirstRect = scrollContainer?.firstElementChild?.getBoundingClientRect?.() ?? {
                    top: 0,
                }
                initStickyTableHeader()
            }
            let eo = {} as any
            /**初始化粘贴表头 */
            function initStickyTableHeader() {
                // console.log('销毁滚动事件', scrollContainer)
                eo?.disconnect?.()
                if (!tableHeaderVisible) return
                const scrollTop = scrollContainer?.scrollTop
                updateScroll(scrollTop)
                updateTableHeader(scrollTop)
                updateOtherElement(scrollTop)

                // console.log('监听滚动事件', scrollContainer)
                eo = eventObserver(
                    getRealBindDom(scrollContainer),
                    'scroll',
                    rafThrottle((e?: Event) => {
                        // console.log('滚动事件触发')
                        const target = e?.target as HTMLElement
                        const scrollTop = target?.scrollTop
                        updateTableHeader(scrollTop)
                        updateScroll(scrollTop)
                        updateOtherElement(scrollTop)
                    }),
                )
            }
            function updateTableHeader(_scrollTop = 0) {
                const scrollTop = _scrollTop ?? document.documentElement.scrollTop ?? document.body.scrollTop ?? 0
                const { tableHeaderDom, tableRect, leftTableHeaderDom, rightTableHeaderDom } = tableInfo
                /**表头到滚动容器顶部的偏移量 */
                const offset = Math.abs(tableRect.top - scrollContainerFirstRect.top) + scrollContainerPaddingTop
                // console.log(`Math.abs(${tableRect.top} - ${scrollContainerFirstRect.top}) + ${scrollContainerPaddingTop} = ${offset}`)
                let translateY = scrollTop - offset
                // console.log(`${scrollTop} - ${offset} = ${translateY}`)
                if (translateY < 0) {
                    translateY = 0
                }
                const transform = `translateY(${translateY}px)`
                // 一般表头
                if (tableHeaderDom) {
                    tableHeaderDom.style.transform = transform
                    tableHeaderDom.style.position = 'relative'
                    tableHeaderDom.style.zIndex = '1'
                }
                // 左固定表头
                if (leftTableHeaderDom) {
                    leftTableHeaderDom.style.transform = transform
                    leftTableHeaderDom.style.zIndex = '5'
                }
                // 右固定表头
                if (rightTableHeaderDom) {
                    rightTableHeaderDom.style.transform = transform
                    rightTableHeaderDom.style.zIndex = '5'
                }
            }
            function updateScroll(_scrollTop = 0) {
                if (!visibleScroller) return
                const { tableRect } = tableInfo
                /**表头到滚动容器顶部的偏移量 */
                const offset = scrollContainer.offsetHeight - (Math.abs(tableRect.top - scrollContainerFirstRect.top) + scrollContainerPaddingTop) - defaultScrollBarHeight - otherFloatElementHeight
                const scrollTop = _scrollTop ?? document.documentElement.scrollTop ?? document.body.scrollTop ?? 0
                let translateY = Math.min(scrollContainer.scrollHeight - defaultScrollBarHeight, scrollTop + offset - bottomOffset)
                const maxHeight = tableRect.height - defaultScrollBarHeight
                translateY = translateY > maxHeight ? maxHeight : translateY
                const transform = `translateY(${translateY}px)`
                scrollerInstance?.updateScrollStyle({
                    transform,
                })
            }
            function updateOtherElement(_scrollTop = 0) {
                if (!otherFloatElement) return
                const { tableRect } = tableInfo
                const offset =
                    tableRect.height -
                    (scrollContainer.offsetHeight - Math.abs(tableRect.top - scrollContainerFirstRect.top) + scrollContainerPaddingTop) +
                    otherFloatElementHeight +
                    otherFloatElementMarinTop
                const scrollTop = _scrollTop ?? document.documentElement.scrollTop ?? document.body.scrollTop ?? 0
                let translateY = Math.max(0, offset - scrollTop + bottomOffset)
                const maxHeight = tableRect.height
                translateY = translateY > maxHeight ? maxHeight : translateY
                const transform = `translateY(-${translateY}px)`
                otherFloatElement.style.transform = transform
                otherFloatElement.style.position = 'relative'
                otherFloatElement.style.zIndex = '5'
                otherFloatElement.style.background = '#fff'
            }

            const { context: ctx } = vnode
            ctx?.$once('beforeDestroy', () => {
                // 关闭监听表头是否在可视区域
                io?.disconnect?.()
                // 关闭滚动容器scroll事件
                eo?.disconnect?.()
                resizeEvent?.disconnect?.()
                mouseupEvent?.disconnect?.()
            })
        }, 1000 / 60)
    },
})
