import { createBaseMobileHttp } from '@@core/common/http'

const http = createBaseMobileHttp({ exHooks: ['BaseConsoleHook', 'BaseMobileLoadingHook', 'BaseShowMobileErrorMessageHook'] })

export default http
