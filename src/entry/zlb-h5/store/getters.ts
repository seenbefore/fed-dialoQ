import { IAppSysInfo, IAppUserInfo } from '@zlb-h5/store/modules/app'

const getters = {
    sidebar: (state: any) => state.app.sidebar,
    size: (state: any) => state.app.size,
    device: (state: any) => state.app.device,
    token: (state: any): string => state.app.token,
    settings: (state: any) => state.settings,
    title: (state: any): string => state.settings.title,
    tagsView: (state: any) => state.settings.tagsView,
    visitedViews: (state: any) => state.tagsView.visitedViews,
    cachedViews: (state: any) => state.tagsView.cachedViews,
    module: (state: any): IAppSysInfo['uiStyle'] => state.app.appSysInfo.uiStyle,
    appUserId: (state: any): string => state.app.appUserInfo.appUserId,
    appUserInfo: (state: any): IAppUserInfo => state.app.appUserInfo,
    appSysInfo: (state: any): IAppSysInfo => state.app.appSysInfo,
}
export default getters
