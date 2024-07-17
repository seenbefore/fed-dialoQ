import BaseAppStore, { IBaseAppStore } from '@@core/data/store/BaseAppStore'
import { InternalDictListVO } from '@library/api/auto/sysDict/internal'
import { Module, Mutation } from 'vuex-module-decorators'

export interface AppStateType extends IBaseAppStore {
    dict: Array<InternalDictListVO>
}

@Module({
    name: 'app',
    namespaced: true,
    stateFactory: true,
})
export default class AppModule extends BaseAppStore {
    public dict: Array<InternalDictListVO> = []

    @Mutation
    public setDict(data: InternalDictListVO[]): void {
        this.dict = data
    }
}
