import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'

const state = {
    sidebar: {
        opened: true,
        withoutAnimation: false,
    },
    device: 'desktop',
    size: 'medium',
    // 流水线查询
    devops: {
        name: '',
    },
    // 记录上次构建配置
    ci: {} as Record<string, CiType>,
}
type AppStateType = typeof state
type CiType = {
    target: string
    branch: string
    [prop: string]: any
}
export { AppStateType, state }

@Module({
    name: 'app',
    namespaced: true,
    stateFactory: true,
    //store,
    //dynamic: true
})
export default class AppModule extends VuexModule {
    sidebar = {
        opened: true,
        withoutAnimation: false,
    }
    device = 'desktop'
    size = 'medium'
    devops = state.devops
    ci = state.ci
    //获取当前的todoList
    @Action
    async toggleSideBar() {
        this.TOGGLE_SIDEBAR()
    }
    @Action
    async closeSideBar(withoutAnimation = false) {
        this.CLOSE_SIDEBAR(withoutAnimation)
    }

    @Mutation
    TOGGLE_SIDEBAR() {
        this.sidebar.opened = !this.sidebar.opened
        this.sidebar.withoutAnimation = false
    }
    @Mutation
    CLOSE_SIDEBAR(withoutAnimation = false) {
        this.sidebar.opened = !this.sidebar.opened
        this.sidebar.withoutAnimation = withoutAnimation
    }

    /**
     * 设置流水线查询条件
     * @param name
     */
    @Mutation
    setDevopsName(name: string) {
        this.devops.name = name
    }
    /**
     * 记录上次构建配置
     * @param name
     */
    @Mutation
    setCi(data: Record<string, CiType>) {
        Object.assign(this.ci, data)
    }
}
//export const appStore = getModule(AppModule, store)
