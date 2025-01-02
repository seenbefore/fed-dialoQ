import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

export interface IBaseSettingStore {
    title: string
    breadcrumb: boolean
    layout: string
    tagsView: boolean
    theme: {
        name: string
        variable: Record<string, any>
    }
    isThirdParty: boolean
}

/* 基础的 SettingStore */
export default class BaseSettingStore<T extends IBaseSettingStore = IBaseSettingStore> extends VuexModule implements IBaseSettingStore {
    /* 是否需要水印 */
    public watermark = false
    /* 标题 */
    public title = ''

    /* 是否需要面包屑 */
    public breadcrumb = false

    /* 布局 */
    public layout = ''

    /* 主题 */
    public theme = {
        name: '',
        variable: {},
    }

    /* Whether need tagsView */
    public tagsView = false

    /* Whether fix the header */
    public fixedHeader = false

    /* Whether show the logo in sidebar */
    public sidebarLogo = false

    /**
     * @description Need show err logs component.
     * The default is only used in the production env
     * If you want to also use it in dev, you can pass ['production', 'development']
     */
    public errorLog = 'production'

    public isThirdParty = false

    @Mutation
    public updateThemeVariables(variables: Record<string, any>): void {
        this.theme.variable = variables
    }

    @Mutation
    public updateThemeName(themeName: string): void {
        this.theme.name = themeName
    }

    @Mutation
    public CHANGE_SETTING(data: Partial<IBaseSettingStore>): void {
        Object.assign(this, data)
    }

    @Mutation
    public changeSetting(data: Partial<IBaseSettingStore>): void {
        Object.assign(this, data)
    }
}
