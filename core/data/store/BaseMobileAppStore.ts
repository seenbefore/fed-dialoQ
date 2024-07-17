import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

@Module({
    stateFactory: true,
    namespaced: true,
})
export default class BaseMobileAppStore extends VuexModule {
    /**
     * 用户登录的token
     */
    public token = ''
    /**
     * 不缓存的组件name
     */
    public exclude: Array<string> = []
    /**
     * 缓存的组件name
     */
    public include: Array<string> = []

    @Mutation
    public SET_VIEW_ALIVE(name: string): void {
        if (Array.isArray(name)) {
            this.include = JSON.parse(JSON.stringify(name))
        } else {
            const index = this.include.indexOf(name)
            if (index > -1) {
                return
            }
            this.include.push(name)
        }
    }

    @Mutation
    public SET_VIEW_DIE(name: string): void {
        if (this.exclude.includes(name)) return
        this.exclude.push(name)
    }

    @Mutation
    public REMOVE_VIEW_DIE(name: string): void {
        const index = this.exclude.indexOf(name)
        if (index > -1) {
            this.exclude.splice(index, 1)
        }
    }

    @Mutation
    public setToken(token: string): void {
        this.token = token
    }
}
