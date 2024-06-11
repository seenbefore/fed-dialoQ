import { useImagePreview } from '../hooks/useImagePreview'
import { off, on } from '../utils'
import Vue from 'vue'
import { DirectiveBinding } from 'vue/types/options'

const isImgElement = (el: HTMLElement) => el instanceof HTMLImageElement || el.tagName === 'IMG'

const getMap = () => {
    if (Reflect.has(window, 'WeakMap')) {
        return new WeakMap()
    }
    return new Map()
}

const observerMap = getMap()

const imgHandlerMap = getMap()

const listenerKey = 'click'

/* img绑定的处理事件 */
const bindImgHandler = (el: HTMLElement): void => {
    if (imgHandlerMap.has(el)) return
    const handler = (e: PointerEvent) => {
        const target = e.target as HTMLImageElement
        if (target && isImgElement(target)) {
            useImagePreview(target.src)
        }
    }
    imgHandlerMap.set(el, handler)
    on(el, listenerKey, handler)
}

/* 去除img的绑定事件 */
const unBindImgHandler = (el: HTMLElement): void => {
    const handler = imgHandlerMap.get(el)
    if (handler) {
        off(el, listenerKey, handler)
        imgHandlerMap.delete(el)
    }
}

const isEmptyValue = (value: string | Array<string>) => (Array.isArray(value) ? value.length === 0 : !value)

/* 图片预览指令 */
export const imagePreviewDirective = {
    install(app: typeof Vue): void {
        app.directive('image-preview', {
            bind(el: HTMLElement, binding: DirectiveBinding): void {
                const { value } = binding
                if (isEmptyValue(value)) {
                    if (isImgElement(el)) {
                        bindImgHandler(el)
                    } else {
                        if (observerMap.has(el)) return
                        if (Reflect.has(window, 'MutationObserver')) {
                            const init = () => el.querySelectorAll('img').forEach(bindImgHandler)
                            const observer = new MutationObserver(init)
                            observer.observe(el, { childList: true })
                            observerMap.set(el, observer)
                            init()
                        } else {
                            console.info('Your browser does not support MutationObserver')
                            el.querySelectorAll('img').forEach(bindImgHandler)
                        }
                    }
                }
                /* 如果给定了打开的值，则不需要一定是img标签才能打开预览 */
                const handler = () => useImagePreview(value)
                imgHandlerMap.set(el, handler)
                on(el, listenerKey, handler)
            },
            update(el: HTMLElement, binding: DirectiveBinding): void {
                /* 如果设置了指定的打开的url，则不监听事件 */
                if (!isEmptyValue(binding.value)) return
                isImgElement(el) ? bindImgHandler(el) : el.querySelectorAll('img').forEach(bindImgHandler)
            },
            unbind(el: HTMLElement, binding: DirectiveBinding): void {
                unBindImgHandler(el)
                if (!isEmptyValue(binding.value) && !isImgElement(el)) {
                    el.querySelectorAll('img').forEach(unBindImgHandler)
                }
                Object.values(observerMap).forEach(observer => observer?.())
            },
        })
    },
}
