import Vue from 'vue'
import { getClientSize, useAbsorb } from './absorb'

Vue.directive('elTableStickyHeader', {
    inserted: (el, binding, vnode) => {
        const { ...restConfig } = binding.value ?? {}
        const STYLE_ID = 'el-table-sticky-header-style'
        /**普通表头选择器 */
        const NORMAL_TABLE_HEADER_SELECTOR = '.el-table__header-wrapper'
        /**左固定表头选择器 */
        const LEFT_FIXED_TABLE_HEADER_SELECTOR = '.el-table__fixed .el-table__fixed-header-wrapper'
        /**右固定表头选择器 */
        const RIGHT_FIXED_TABLE_HEADER_SELECTOR = '.el-table__fixed-right .el-table__fixed-header-wrapper'
        const absorbDomSelectors = [NORMAL_TABLE_HEADER_SELECTOR, LEFT_FIXED_TABLE_HEADER_SELECTOR, RIGHT_FIXED_TABLE_HEADER_SELECTOR]
        // const style = document.createElement('style')
        // if (!document.getElementById(STYLE_ID)) {
        //     style.id = STYLE_ID
        //     style.innerHTML = `
        //     .el-table__fixed-header-wrapper[absorb]::before {
        //         content: '';
        //         box-shadow: 0 0 10px rgba(0, 0, 0, .12);
        //         }
        //         `
        // }
        // document.head.appendChild(style)

        setTimeout(() => {
            absorbDomSelectors.forEach((absorbDomSelector, index) => {
                const absorber = el.querySelector(absorbDomSelector) as HTMLElement
                if (!absorber) return
                const handleMap: Record<string, any> = {
                    [NORMAL_TABLE_HEADER_SELECTOR]: () => {
                        useAbsorb().init(absorber, restConfig)
                    },
                    [LEFT_FIXED_TABLE_HEADER_SELECTOR]: () => {
                        // const boxShadowWrap = document.createElement('div')
                        // const boxShadow = document.createElement('div')
                        useAbsorb().init(absorber, {
                            ...restConfig,
                            setAbsorbAfter: (scrollerRect, absorberRect, scroller) => {
                                const parent = absorber.parentElement as HTMLElement
                                absorber.style.width = `${parent.offsetWidth}px`

                                // const rect = absorber.getBoundingClientRect()
                                // Object.assign(boxShadowWrap.style, {
                                //     position: 'fixed',
                                //     overflow: 'hidden',
                                //     zIndex: absorber.style.zIndex,
                                //     top: absorber.style.top,
                                //     right: `${window.innerWidth - absorberRect.right + rect.width - 10}px`,
                                //     paddingLeft: '10px',
                                // })
                                // Object.assign(boxShadow.style, {
                                //     width: '10px',
                                //     height: `${rect.height}px`,
                                //     boxShadow: '0 0 10px rgba(0, 0, 0, .12)',
                                // })
                                // boxShadowWrap.appendChild(boxShadow)
                                // absorber.parentElement?.insertBefore(boxShadowWrap, absorber)
                            },
                            // cancelAbsorbAfter: () => {
                            //     boxShadowWrap.remove()
                            // },
                        })
                    },
                    [RIGHT_FIXED_TABLE_HEADER_SELECTOR]: () => {
                        const boxShadowWrap = document.createElement('div')
                        const boxShadow = document.createElement('div')

                        useAbsorb().init(absorber, {
                            ...restConfig,
                            align: 'right',
                            setAbsorbAfter: (scrollerRect, absorberRect, scroller) => {
                                const parent = absorber.parentElement as HTMLElement
                                absorber.style.width = `${parent.offsetWidth}px`
                                absorber.style.display = 'flex'
                                absorber.style.justifyContent = 'flex-end'

                                const rect = absorber.getBoundingClientRect()
                                const clientWidth = getClientSize().width
                                Object.assign(boxShadowWrap.style, {
                                    position: 'fixed',
                                    overflow: 'hidden',
                                    zIndex: absorber.style.zIndex,
                                    top: absorber.style.top,
                                    right: `${clientWidth - absorberRect.right + rect.width - 10}px`,
                                    paddingLeft: '10px',
                                    'box-sizing': 'border-box',
                                })
                                Object.assign(boxShadow.style, {
                                    width: '10px',
                                    height: `${rect.height}px`,
                                    boxShadow: '0 0 10px rgba(0, 0, 0, .12)',
                                })
                                boxShadowWrap.appendChild(boxShadow)
                                absorber.parentElement?.insertBefore(boxShadowWrap, absorber)
                            },
                            cancelAbsorbAfter: () => {
                                boxShadowWrap.remove()
                            },
                        })
                    },
                }
                handleMap[absorbDomSelector]?.()
            })
        }, 16)
    },
})
