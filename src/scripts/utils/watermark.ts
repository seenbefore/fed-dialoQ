import { isDef } from './is'

export function useWatermark(appendEl: HTMLElement = document.body) {
    let watermarkEl: any = {
        value: null,
    }
    const id = 'useWatermark' + new Date().valueOf()
    function createBase64(str: string) {
        const can = document.createElement('canvas')
        const width = 300
        const height = 240
        Object.assign(can, { width, height })

        const cans = can.getContext('2d')
        if (cans) {
            cans.rotate((-20 * Math.PI) / 120)
            cans.font = '15px Vedana'
            cans.fillStyle = 'rgba(0, 0, 0, 0.15)'
            cans.textAlign = 'left'
            cans.textBaseline = 'middle'
            cans.fillText(str, width / 20, height)
        }
        return can.toDataURL('image/png')
    }

    function updateWatermark(
        options: {
            width?: number
            height?: number
            str?: string
        } = {},
    ) {
        const el = watermarkEl.value
        if (!el) return
        if (isDef(options.width)) {
            el.style.width = `${options.width}px`
        }
        if (isDef(options.height)) {
            el.style.height = `${options.height}px`
        }
        if (isDef(options.str)) {
            el.style.background = `url(${createBase64(options.str)}) left top repeat`
        }
    }
    const createWatermark = (str: string, options: any = {}) => {
        if (watermarkEl.value) {
            updateWatermark({ str, ...options })
            return id
        }

        const div = document.createElement('div')
        watermarkEl.value = div
        div.id = id
        div.style.pointerEvents = 'none'
        div.style.top = '0px'
        div.style.left = '0px'
        if (options.fixed) {
            div.style.position = 'fixed'
        } else {
            div.style.position = 'absolute'
        }

        div.style.zIndex = '100000'
        const el = appendEl
        if (!el) return id
        const { clientHeight: height, clientWidth: width } = el
        updateWatermark({ str, width, height, ...options })
        el.appendChild(div)

        return id
    }
    function setWatermark(str: string, options: any = {}) {
        createWatermark(str, options)
        //addResizeListener(document.documentElement, func);
    }
    function clear() {
        const domId = watermarkEl.value
        const el = appendEl
        domId && el.removeChild(domId)
        watermarkEl.value = null
    }

    return { setWatermark, clear }
}
