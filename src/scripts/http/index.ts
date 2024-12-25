import { createBaseDesktopHttp } from '@@core/common/http'
import exAuth from './exAuth'
export const http = createBaseDesktopHttp({
    baseURL: process.env.VUE_APP_BASEURL_API,
    exHooks: ['BaseDataHook', exAuth, 'BaseApiHook', 'BaseConsoleHook', 'BaseDesktopLoadingHook', 'BaseShowDesktopErrorMessageHook'],
})
export const httpPDFURL = createBaseDesktopHttp({
    baseURL: process.env.VUE_APP_PDF_API,
    exHooks: ['BaseDataHook', exAuth, 'BaseApiHook', 'BaseConsoleHook', 'BaseDesktopLoadingHook', 'BaseShowDesktopErrorMessageHook'],
})

export const httpDoc = createBaseDesktopHttp({
    baseURL: process.env.VUE_APP_BASEURL_API_DOC,
    exHooks: ['BaseDataHook', exAuth, 'BaseApiHook', 'BaseConsoleHook', 'BaseDesktopLoadingHook', 'BaseShowDesktopErrorMessageHook'],
})

export default http
