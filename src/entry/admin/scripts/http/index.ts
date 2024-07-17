import { createBaseDesktopHttp } from '@@core/data/http'
import exAuth from './exAuth'

const http = createBaseDesktopHttp({ exHooks: ['BaseDataHook', exAuth, 'BaseApiHook', 'BaseConsoleHook', 'BaseDesktopLoadingHook', 'BaseShowDesktopErrorMessageHook'] })
const fileHttp = createBaseDesktopHttp({ exHooks: [exAuth] })
export { http, fileHttp }
export default http
