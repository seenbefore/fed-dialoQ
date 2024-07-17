import { createBaseDesktopHttp } from '@@core/common/http'
import exAuth from './exAuth'

const http = createBaseDesktopHttp({ exHooks: ['BaseDataHook', exAuth, 'BaseApiHook', 'BaseConsoleHook', 'BaseDesktopLoadingHook', 'BaseShowDesktopErrorMessageHook'] })
export { http }
export default http
