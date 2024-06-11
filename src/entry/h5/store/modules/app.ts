import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'

@Module({
    name: 'app',
    namespaced: true,
})
export default class AppModule extends VuexModule {
    /**
     * 用户登录的token
     */
    token = ''
    /**
     * 不缓存的组件name
     */
    exclude: string[] = []
    /**
     * 缓存的组件name
     */
    include: string[] = []

    @Mutation
    SET_VIEW_ALIVE(name: string) {
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
    SET_VIEW_DIE(name: string) {
        if (this.exclude.includes(name)) return
        this.exclude.push(name)
    }
    @Mutation
    REMOVE_VIEW_DIE(name: string) {
        const index = this.exclude.indexOf(name)
        if (index > -1) {
            this.exclude.splice(index, 1)
        }
    }
    @Mutation
    setToken(token: any) {
        this.token = token
    }
}
