import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
@Module({
    name: 'app',
    namespaced: true,
})
export default class AppModule extends VuexModule {
    clientName = ''
    clientId = ''
    clientSecret = ''
    apps = [] as any[]
    @Mutation
    setApps(data: any[]) {
        this.apps = data || []
    }
    @Mutation
    setAuthInfo(data: any) {
        this.clientId = data?.clientId || ''
        this.clientSecret = data?.clientSecret || ''
        this.clientName = data?.clientName || ''
    }
}
