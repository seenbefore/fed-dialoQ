const isGroupOpened = false
export const exConsole = Object.freeze({
    onBefore(config: any) {},
    onComplete(config: any, isResolve: any, resOrErr: any) {
        const { url, description } = config
        if (!isResolve) {
            console.error(config.url, resOrErr.message)
        } else {
            const _k = isGroupOpened ? 'group' : 'groupCollapsed'
            console[_k](`log: ${description || url}`)
            console.log('payload  ', config.data || config.params)
            console.log('resOrErr.data  ', resOrErr.data)
            console.log('resOrErr  ', resOrErr)
            console.groupEnd()
        }
    },
})

export default exConsole
