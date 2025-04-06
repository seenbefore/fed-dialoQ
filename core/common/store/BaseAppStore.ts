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

export default class BaseAppStore extends VuexModule implements IBaseAppStore {
    public sidebar = {
        opened: false,
        withoutAnimation: true,
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
    /**
     * 重置以$开头的业务属性
     */
    @Mutation
    public reset(): void {
        console.log('reset==>', this)
        Object.keys(this).forEach(key => {
            const value = this[key]
            console.log('key==>', key, value)
            if (key.startsWith('$')) {
                this[key] = null
            }
        })
    }
}
