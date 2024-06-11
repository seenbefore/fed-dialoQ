import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { InternalDictListVO } from '@/entry/library/api/auto/sysDict/internal'

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
