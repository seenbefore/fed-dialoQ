import { Loading } from 'element-ui'
interface TLoadingOptins {
    target?: HTMLElement | string
    body?: boolean
    fullscreen?: boolean
    lock?: boolean
    text?: string
    spinner?: string
    background?: string
    customClass?: string
}
interface IPageLoading {
    show(options?: TLoadingOptins): void
    hide(): void
}
let loadingInstance: any
const pageLoading: IPageLoading = {
    show: (options: TLoadingOptins = { body: true, customClass: 'cus-body-loading' }) => {
        loadingInstance = Loading.service(options)
    },
    hide: () => {
        loadingInstance?.close?.()
        loadingInstance = null
    },
}
export default pageLoading
