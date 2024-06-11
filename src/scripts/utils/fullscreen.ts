export function enter(id?: any) {
    const el = id ? document.getElementById(id) : null
    const docElm = (el || document.documentElement) as any
    if (docElm.requestFullscreen) {
        docElm.requestFullscreen()
    } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen()
    } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen()
    } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen()
    }
}
export function exit() {
    const doc = document as any
    if (doc.exitFullscreen) {
        doc.exitFullscreen()
    } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen()
    } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen()
    } else if (doc.webkitCancelFullScreen) {
        doc.webkitCancelFullScreen()
    }
}
