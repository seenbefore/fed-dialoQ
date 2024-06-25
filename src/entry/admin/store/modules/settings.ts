import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'

const state = {
    title: '',
    breadcrumb: false,
    layout: '',
    /**
     * @type {boolean} true | false
     * @description Whether need tagsView
     */
    tagsView: false,
    // settings.isThirdParty || location.href.indexOf('isThirdParty') > -1
    isThirdParty: false,
}
type SettingsStateType = typeof state
export { SettingsStateType, state }
@Module({
    name: 'settings',
    namespaced: true,
    //store,
    //dynamic: true
})
export default class MyModule extends VuexModule {
    title = state.title
    breadcrumb = state.breadcrumb
    layout = state.layout

    /**
     * @type {boolean} true | false
     * @description Whether show the settings right-panel
     */
    showSettings = true

    /**
     * @type {boolean} true | false
     * @description Whether need tagsView
     */
    tagsView = state.tagsView

    /**
     * @type {boolean} true | false
     * @description Whether fix the header
     */
    fixedHeader = false

    /**
     * @type {boolean} true | false
     * @description Whether show the logo in sidebar
     */
    sidebarLogo = false

    /**
     * @type {string | array} 'production' | ['production', 'development']
     * @description Need show err logs component.
     * The default is only used in the production env
     * If you want to also use it in dev, you can pass ['production', 'development']
     */
    errorLog = 'production'
    isThirdParty = state.isThirdParty
    @Mutation
    CHANGE_SETTING(data: SettingsStateType) {
        Object.assign(this, data)
    }
    @Action
    changeSetting(data: SettingsStateType) {
        this.CHANGE_SETTING(data)
    }
}
//export const settingsStore = getModule(MyModule, store)
