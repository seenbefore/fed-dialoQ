/**发布订阅模式 */
export default class EventEmitter {
    private static _instance: EventEmitter
    public static get instance() {
        if (!this._instance) {
            this._instance = new EventEmitter()
        }
        return this._instance
    }
    public events = new Map()
    on(eventName, callback) {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, [])
        }
        if (this.events.get(eventName).indexOf(callback) === -1) {
            this.events.get(eventName).push(callback)
        }
    }

    off(event, listener) {
        if (!this.events.has(event)) return
        const listeners = this.events.get(event)
        this.events.set(
            event,
            listeners.filter(l => l !== listener),
        )
    }

    emit(event, ...args) {
        if (!this.events.has(event)) return
        this.events.get(event).forEach(listener => listener(...args))
    }

    once(event, listener) {
        const fn = (...args) => {
            listener(...args)
            this.off(event, fn)
        }
        this.on(event, fn)
    }

    removeAllListeners(event) {
        this.events.delete(event)
    }

    listeners(event) {
        return this.events.get(event) || []
    }

    hasListener(event) {
        return this.events.has(event)
    }

    hasListeners() {
        return this.events.size > 0
    }
}
