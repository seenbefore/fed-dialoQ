import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'

const state = {
    sidebar: {
        opened: true,
        withoutAnimation: false,
    },
    device: 'desktop',
    size: 'medium',
    user: null,
}
type AppStateType = typeof state
export { AppStateType, state }

@Module({
    name: 'app',
    namespaced: true,
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
    private TOGGLE_SIDEBAR() {
        this.sidebar.opened = !this.sidebar.opened
        this.sidebar.withoutAnimation = false
    }
    @Mutation
    private CLOSE_SIDEBAR(withoutAnimation = false) {
        this.sidebar.opened = !this.sidebar.opened
        this.sidebar.withoutAnimation = withoutAnimation
    }
}
//export const appStore = getModule(AppModule, store)
