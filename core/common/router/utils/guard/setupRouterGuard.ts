import VueRouter from 'vue-router'

export function setupRouterGuard(router: VueRouter, title?: string): void {
    router.afterEach((to: any) => {
        let { title } = to.meta
        const { bodyClass } = to.meta
        title = typeof title === 'function' ? title(to) : title
        if (title) {
            setDocumentTitle(title)
        } else {
            setDocumentTitle(title)
        }
        if (bodyClass) {
            document.body.className = bodyClass
        } else {
            document.body.className = ''
        }
    })
}
// 解决iphone下单页面设置title不生效
function setDocumentTitle(title: string): void {
    document.title = title
    const ua = navigator.userAgent
    if (/ip(hone|od|ad)/i.test(ua)) {
        let i = document.createElement('iframe')
        i.src = 'javascript:void(0)'
        i.style.display = 'none'
        i.onload = function() {
            setTimeout(function() {
                i.remove()
            }, 9)
        }
        document.body.appendChild(i)
    }
}
