import { createUUID } from './index'

interface IEventType {
    id: number
    eventName: string
    eventFnc: IEventFnc
    once: boolean
}

interface IEventFnc {
    (...args: any): void
}

export interface IEventBusOption {
    // 是否立即执行
    immediate?: boolean
    // 是否执行一次
    once?: boolean
}

export interface EventBusProps {
    $on(eventName: string, callback: IEventFnc, option?: IEventBusOption): number

    $emit(eventName: string, ...args: any): void

    $off(eventName?: string | Array<string>): void

    $once(eventName: string, callback: IEventFnc): void
}

/**
 * 用于事件的分发和执行
 */
export class EventBus implements EventBusProps {
    private _eventList: Array<IEventType> = []

    /**
     * 监听
     * @param {string} eventName 需要监听的名字
     * @param {Function} callback 监听触发的回调
     * @param option
     * @returns {number} resultId 返回当前事件的id
     * */
    public $on(eventName: string, callback: IEventFnc, option?: IEventBusOption): number {
        const events: Array<IEventType> = this._findEvent(eventName)
        // 对比callback引用是否存在
        const event: UndefinedAble<IEventType> = events?.find((event: IEventType) => {
            return event.eventFnc === callback && event.eventName === eventName
        })
        let resultId
        if (!event) {
            // 如果没有事件，需要往list中加一个
            resultId = this._addEvent(eventName, callback)
        } else {
            resultId = event.id
        }
        option?.immediate && callback('')
        return resultId
    }

    /**
     * 事件分发
     * @param {string} eventName 需要分发的监听的名字
     * @param { any } args 传递的参数
     * */
    public $emit(eventName: string, ...args: any): Promise<void | void[]> {
        const events: Array<IEventType> = this._findEvent(eventName)
        if (events.length) {
            return Promise.all(
                events.map((eventType: IEventType) => {
                    eventType.eventFnc(...args)
                    //once 执行一次就清除
                    eventType.once && this.$off(eventType.id)
                }),
            )
        }
        return Promise.resolve()
    }

    /**
     * 取消监听 可以通过事件名称或者事件id取消事件
     * @param {string | Array<string>} eventName 需要取消的监听名称
     * */
    public $off(eventName?: string | number | Array<string> | Array<number>): void {
        if (typeof eventName === 'string') {
            this._eventList = this._eventList.filter(event => event.eventName !== eventName)
        } else if (typeof eventName === 'number') {
            const index: number = this._eventList.findIndex((event: IEventType) => event.id === eventName)
            if (index > -1) this._eventList.splice(index, 1)
        } else if (Array.isArray(eventName)) {
            eventName.forEach((m: any) => this.$off(m))
        } else {
            this._eventList = []
        }
    }

    /**
     * 执行一次的监听之后立即销毁
     * @param {string} eventName 需要监听的名字
     * @param {Function} callback 监听触发的回调
     * */
    public $once(eventName: string, callback: IEventFnc): void {
        this.$on(eventName, callback, { once: true })
    }

    /**
     * 事件查找
     * @param eventName
     * @returns
     */
    private _findEvent(eventName: string): Array<IEventType> {
        return this._eventList.filter((event: IEventType) => event.eventName === eventName)
    }

    /**
     * 添加事件
     * @param eventName
     * @param callback
     * @param once
     * @returns
     */
    private _addEvent(eventName: string, callback: IEventFnc, once = false): number {
        const id = createUUID()
        this._eventList.push({
            id: id,
            eventName,
            eventFnc: callback,
            once,
        })
        return id
    }
}
