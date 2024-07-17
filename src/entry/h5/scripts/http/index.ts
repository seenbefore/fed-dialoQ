import { createBaseMobileHttp } from '@@core/data/http'

const http = createBaseMobileHttp({ exHooks: ['BaseConsoleHook', 'BaseMobileLoadingHook', 'BaseShowMobileErrorMessageHook'] })

export default http
