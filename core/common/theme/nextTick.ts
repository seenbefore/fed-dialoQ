export const nextTick = (callback: () => any): void => {
    if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function')
    }

    if (typeof Promise !== 'undefined') {
        Promise.resolve().then(callback)
        return
    }

    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(() => {
            callback()
            observer.disconnect()
        })
        const textNode = document.createTextNode('1')
        observer.observe(textNode, { characterData: true })
        textNode.data = '2'
        return
    }

    setTimeout(callback, 0)
}
