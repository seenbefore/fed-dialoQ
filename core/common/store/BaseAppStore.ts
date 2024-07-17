import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

export enum AppDeviceType {
    MOBILE = 'mobile',
    DESKTOP = 'desktop',
}

export enum AppSizeType {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
}

export interface IBaseAppStore {
    sidebar: {
        opened: boolean
        withoutAnimation: boolean
    }
    device: AppDeviceType
    size: AppSizeType
}

@Module({
    stateFactory: true,
    namespaced: true,
})
export default class BaseAppStore extends VuexModule implements IBaseAppStore {
    public sidebar = {
        opened: true,
        withoutAnimation: false,
    }

    public device = AppDeviceType.DESKTOP

    public size = AppSizeType.SMALL

    @Mutation
    private TOGGLE_SIDEBAR(): void {
        this.sidebar.opened = !this.sidebar.opened
        this.sidebar.withoutAnimation = false
    }
    @Mutation
    private CLOSE_SIDEBAR(withoutAnimation = false): void {
        this.sidebar.opened = !this.sidebar.opened
        this.sidebar.withoutAnimation = withoutAnimation
    }

    @Action
    public async toggleSideBar(): Promise<void> {
        this.context.commit('TOGGLE_SIDEBAR')
    }
    @Action
    public async closeSideBar(withoutAnimation = false): Promise<void> {
        this.context.commit('CLOSE_SIDEBAR', withoutAnimation)
    }
}
