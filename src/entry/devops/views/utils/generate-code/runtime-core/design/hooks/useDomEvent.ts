interface IUseDomEvent {
    eventHandler: Array<(...args: any) => any>
    addEvent: <T extends HTMLElement, K extends keyof HTMLElementEventMap>(
        target: T,
        eventName: K,
        listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
        options?: boolean | AddEventListenerOptions,
    ) => () => void
    clear: () => void
}

export const useDomEvent = (): IUseDomEvent => {
    const eventHandler: Array<(...args: any) => any> = []

    const addEvent = <T extends HTMLElement, K extends keyof HTMLElementEventMap>(
        target: T,
        eventName: K,
        listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
        options?: boolean | AddEventListenerOptions,
    ) => {
        target.addEventListener(eventName, listener, options)

        const destroy = () => {
            target.removeEventListener(eventName, listener, options)
            const index = eventHandler.findIndex(it => it === destroy)
            if (index > -1) {
                eventHandler.splice(index, 1)
            }
        }

        eventHandler.push(destroy)

        return destroy
    }

    const clear = () => {
        if (!eventHandler.length) {
            return
        }
        let lastEvent
        while ((lastEvent = eventHandler.pop())) {
            lastEvent()
        }
    }

    return {
        eventHandler,
        addEvent,
        clear,
    }
}
