import { Loading } from 'element-ui'
import { ElLoadingComponent, LoadingServiceOptions } from 'element-ui/types/loading'

interface IPageLoading {
    show(options?: LoadingServiceOptions): void
    hide(): void
}

const defaultOptions = { body: true, customClass: 'cus-body-loading' }
let loadingInstance: Nullable<ElLoadingComponent>
const pageLoading: IPageLoading = {
    show: (options: LoadingServiceOptions = {}) => {
        loadingInstance = Loading.service({ ...defaultOptions, ...options })
    },
    hide: () => {
        loadingInstance?.close?.()
        loadingInstance = null
    },
}

export default pageLoading
