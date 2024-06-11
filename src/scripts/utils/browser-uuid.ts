/**
 * 利用canvas特性生成『相对唯一指纹』
 * https://browserleaks.com/canvas
 */
export function createUuidByCanvas() {
    const finger = localStorage.getItem('__yc_uuid__')
    if (finger) return finger
    const crc = createBrowserUuid()
    localStorage.setItem('__yc_uuid__', crc)
    return crc
}

/**
 * 生成浏览器唯一指纹
 * @returns {string}
 */
export function createBrowserUuid() {
    const canvas = document.createElement('canvas')
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!
    const txt = 'raycloud,com <try> 1.0'
    ctx.textBaseline = 'top'
    ctx.font = "14px 'Arial'"
    ctx.textBaseline = 'alphabetic'
    ctx.fillStyle = '#f60'
    ctx.fillRect(125, 1, 62, 20)
    ctx.fillStyle = '#069'
    ctx.fillText(txt, 2, 15)
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)'
    ctx.fillText(txt, 4, 17)
    const base64 = canvas.toDataURL().replace('data:image/png;base64,', '')
    const bin = atob(base64)
    const crc = bin2hex(bin.slice(-16, -12))
    return crc
}
function bin2hex(s: string) {
    let i
    let l
    let o = ''
    let n
    s += ''
    for (i = 0, l = s.length; i < l; i++) {
        n = s.charCodeAt(i).toString(16)
        o += n.length < 2 ? '0' + n : n
    }
    return o
}
