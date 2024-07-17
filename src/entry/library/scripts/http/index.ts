import { createBaseHttp } from '@@core/common/http/baseHttp'
import exAuth from './exAuth'

console.log('[当前请求前缀]', process.env.VUE_APP_BASEURL_API)

const http = createBaseHttp({ exHooks: [exAuth, 'BaseApiHook', 'BaseConsoleHook', 'BaseShowDesktopErrorMessageHook', 'BaseShowDesktopErrorMessageHook'] })

export { http }
export default http
