import '@/components/directives/copy'
import '@/components/registerAdminComp'
import '@/components/registerGlobalComp'
import modalDialog from '@/scripts/ModalDialog'
import { desktopInit } from '@@core/common/configurations/initConfig/desktopInit'
import BaseSettingStore from '@@core/common/store/BaseSettingStore'
import BaseUserStore from '@@core/common/store/BaseUserStore'
import { getURLParameters } from 'icinfo-util'
import Vue, { Component } from 'vue'
import VueRouter from 'vue-router'
import { Store } from 'vuex'
import { getOS } from '../utils/os'
import { IDefinedThemeValue } from 'icinfo-ui/packages/helper/theme/definedTheme'

export const desktopMainInit = async <T = any, U extends BaseUserStore = BaseUserStore, S extends BaseSettingStore = BaseSettingStore>(
    App: Component,
    store: Store<T>,
    router: VueRouter,
    useStore: { userStore: U; settingsStore: S },
    defaultSettings: Obj,
) => {
    const { bootstrap } = desktopInit(Vue)

    Vue.use(modalDialog, { store, router })

    const { userStore, settingsStore } = useStore

    return bootstrap(() => {
        const { settings, user } = defaultSettings ?? {}
        userStore.set(user)
        const { isThirdParty } = getURLParameters(location.href)
        console.log('settingsStore', settingsStore)
        // 此处添加获取全局配置等异步操作
        settings.isThirdParty = isThirdParty ? true : settings.isThirdParty
        settingsStore.changeSetting(settings as any)
        // 设置自定义主题名称和色系
        settingsStore.updateThemeName('blue')
        let themeVariables: IDefinedThemeValue = {
            '--color-primary': '#06f',
            '--color-success': '#6DD400',
            '--color-warning': '#FF7D00',
            '--color-danger': '#F4333C',
            '--color-info': '#666666',
        }
        settingsStore.updateThemeVariables(themeVariables)
        // 判断电脑系统
        document.documentElement.setAttribute('class', getOS())
    }).then(mount => mount({ router, store, themeStore: settingsStore, App }))
}
