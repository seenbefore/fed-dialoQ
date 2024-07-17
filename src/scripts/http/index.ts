import { createBaseDesktopHttp } from '@@core/data/http'
import exAuth from './exAuth'

const http = createBaseDesktopHttp({ exHooks: ['BaseDataHook', exAuth, 'BaseApiHook', 'BaseConsoleHook', 'BaseDesktopLoadingHook', 'BaseShowDesktopErrorMessageHook'] })
export { http }
export default http
