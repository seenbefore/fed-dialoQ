import { InternalDictListVO } from '@library/api/auto/sysDict/internal'
import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

const state = {
    community: {} as any,
}

type AppStateType = typeof state
export { AppStateType, state }
@Module({
    name: 'app',
    namespaced: true,
    stateFactory: true,
})
export default class AppModule extends VuexModule {
    dict = [] as InternalDictListVO[]
    @Mutation
    setDict(data: InternalDictListVO[]) {
        this.dict = data
    }
}
