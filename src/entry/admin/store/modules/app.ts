import BaseAppStore, { IBaseAppStore } from '@@core/common/store/BaseAppStore'
import { Module } from 'vuex-module-decorators'

export interface AppStateType extends IBaseAppStore {}

@Module({
    name: 'app',
    namespaced: true,
    stateFactory: true,
})
export default class AppModule extends BaseAppStore {}
