interface IElementEnhance extends Element {
    attachEvent: Document['addEventListener']
    detachEvent: Document['addEventListener']
}

/**
 * 节流
 * @param fn
 */
export function rafThrottle<T extends (...args: any[]) => void>(fn: T): (...args: Parameters<T>) => void {
    let locked = false
    return function(...args: Parameters<T>): void {
        if (locked) return
        locked = true
        window.requestAnimationFrame(() => {
            fn.apply(this, args)
            locked = false
        })
    }
}

/* 用于监听一个事件 */
export const on = (function() {
    if (Reflect.has(document, 'addEventListener')) {
        return function(element: Element | Document, event: string, handler: (...args: any) => any) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false)
            }
        }
    } else {
        return function(element: Element | Document, event: string, handler: (...args: any) => any) {
            if (element && event && handler) {
                ;(element as IElementEnhance).attachEvent('on' + event, handler)
            }
        }
    }
})()

/* 销毁某个事件 */
export const off = (function() {
    if (Reflect.has(document, 'removeEventListener')) {
        return function(element: Element | Document, event: string, handler: (...args: any) => any) {
            if (element && event) {
                element.removeEventListener(event, handler, false)
            }
        }
    } else {
        return function(element: Element | Document, event: string, handler: (...args: any) => any) {
            if (element && event) {
                ;(element as IElementEnhance).detachEvent('on' + event, handler)
            }
        }
    }
})()

/* 是否为火狐浏览器，火狐浏览器的鼠标滚动事件不一样。 */
export const isFirefox = (): boolean => !!window.navigator.userAgent.match(/firefox/i)
