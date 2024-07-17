import { createBaseDesktopHttp } from '@@core/common/http'
import exAuth from './exAuth'

console.log('[当前请求前缀]', process.env.VUE_APP_BASEURL_API)

const http = createBaseDesktopHttp({ exHooks: ['BaseDataHook', exAuth, 'BaseConsoleHook', 'BaseDesktopLoadingHook', 'BaseShowDesktopErrorMessageHook'] })

export { http }
export default http
