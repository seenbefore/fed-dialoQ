export function getOS() {
    const agent = navigator.userAgent.toLowerCase()
    const isMac = /macintosh|mac os x/i.test(agent)
    if (isMac) {
        return 'mac'
    }
    return 'windows'
}
