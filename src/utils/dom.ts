import ResizeObserver from 'resize-observer-polyfill'
import { Component, Ref, Vue } from 'vue-property-decorator'

type CallBack = (...args: any) => void

const isCallBack = <T extends Function>(type: unknown): type is T => typeof type === 'function'

const resizeObserver = (element: HTMLElement, callback: ResizeObserverCallback): CallBack => {
    const observer = new ResizeObserver(callback)
    observer.observe(element)
    return () => observer.unobserve(element)
}

const resizeEvent = (element: HTMLElement, callBack: CallBack): CallBack => {
    element.addEventListener('resize', callBack)
    return () => element.removeEventListener('resize', callBack)
}

/**
 * 监听dom大小变化
 * @param element 监听的dom
 * @param callback 大小变化之后的回调
 * @param immediate 是否首次先掉用回调
 * @return 返回一个取消监听的方法
 */
export const domObserver = (element: HTMLElement, callback: CallBack, immediate?: boolean): CallBack => {
    if (!isCallBack(callback)) {
        throw new Error('callback is illegal')
    }
    immediate && callback()
    if (Reflect.has(window, 'ResizeObserver') && typeof ResizeObserver === 'function') {
        return resizeObserver(element, callback)
    }
    return resizeEvent(element, callback)
}

export const isFullScreen = (elem: HTMLElement) => {
    return !!(document.fullscreenElement && true && document.fullscreenElement === elem)
}

const EMPTY_FNC = () => void 0

type EventType = keyof HTMLElementEventMap & string

@Component
export class DomEvent extends Vue {
    /*
     * 事件存储的列表，
     * TODO 增加 $ 用于定义非响应式变量 会导致无法获取变量值，暂时存储为响应式变量
     *  */
    public cancelList: Partial<Obj<EventType, Array<{ callback: CallBack; element: HTMLElement; cancel: CallBack }>>> = {}

    /* 开始执行事件 */
    private run(element: HTMLElement, eventName: EventType, callback: CallBack, immediate?: boolean): CallBack {
        switch (eventName) {
            case 'resize':
                return domObserver(element, callback, true)
            default:
                element.addEventListener(eventName, callback)
                return () => element.removeEventListener(eventName, callback)
        }
    }

    /**
     * 事件开始监听
     * @param element dom 元素
     * @param eventName 事件名称
     * @param callback 回调
     * @param immediate 是否一进入就执行回调
     * @param callback 返回取消方法
     */
    public on(element: HTMLElement, eventName: EventType, callback: CallBack, immediate?: boolean): CallBack {
        const cancel = this.run(element, eventName, callback, immediate)
        const item = { element, callback, cancel }
        if (Reflect.has(this.cancelList, eventName)) {
            Reflect.get(this.cancelList, eventName)?.push(item)
        } else {
            Reflect.set(this.cancelList, eventName, [item])
        }
        return cancel
    }

    /* 销毁之前会清空所有的事件 */
    public beforeDestroy() {
        const keys = Object.keys(this.cancelList),
            length = keys.length
        for (let i = 0; i < length; ++i) {
            const key = keys[i] as EventType
            const item = Reflect.get(this.cancelList, key)
            if (item && item.length) {
                const itemLength = item.length
                for (let j = 0; j < itemLength; ++j) {
                    const { cancel } = item[j]
                    if (cancel && typeof cancel === 'function' && cancel !== EMPTY_FNC) {
                        cancel?.()
                    }
                }
            }
        }
    }
}
