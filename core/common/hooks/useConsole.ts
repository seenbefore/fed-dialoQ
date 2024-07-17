import { getURLParameters } from 'icinfo-util'

export const useConsole = () => {
    let timer: any = null,
        count = 0,
        isCreated = false

    const init = () => {
        const { showConsole } = getURLParameters(location.href)
        if (showConsole === '1') {
            window.eruda?.init()
            return
        }
        if (isCreated) return
        isCreated = true
        const button = document.createElement('div')
        Object.assign(button.style, {
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '40px',
            height: '40px',
            zIndex: 9999,
            background: 'transparent',
        })
        document.body.appendChild(button)

        const clickHandler = () => {
            timer && clearInterval(timer)
            if (++count > 10) {
                window.eruda?.init()
                count = 0
                /* 打开了就不用监听了 */
                button.removeEventListener('click', clickHandler)
                timer = null
                button.parentElement?.removeChild(button)
            } else {
                timer = setInterval(() => {
                    count = 0
                }, 500)
            }
        }

        button.addEventListener('click', clickHandler)
    }

    return {
        init,
    }
}
