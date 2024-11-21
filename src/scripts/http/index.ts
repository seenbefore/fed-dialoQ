import { createBaseDesktopHttp } from '@@core/common/http'
import exAuth from './exAuth'

export const http = createBaseDesktopHttp({
    //baseURL: 'http://192.168.1.155:8885/api/v2',
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
