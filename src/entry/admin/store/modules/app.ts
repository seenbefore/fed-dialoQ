import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

const state = {
    sidebar: {
        opened: true,
        withoutAnimation: false,
    },
    device: 'desktop',
    size: 'medium',
}
type AppStateType = typeof state
export { AppStateType, state }

@Module({
    name: 'app',
    namespaced: true,
    stateFactory: true,
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
    TOGGLE_SIDEBAR() {
        this.sidebar.opened = !this.sidebar.opened
        this.sidebar.withoutAnimation = false
    }
    @Mutation
    CLOSE_SIDEBAR(withoutAnimation = false) {
        this.sidebar.opened = !this.sidebar.opened
        this.sidebar.withoutAnimation = withoutAnimation
    }
}
