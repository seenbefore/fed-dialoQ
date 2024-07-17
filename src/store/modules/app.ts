import BaseAppStore, { IBaseAppStore } from '@@core/data/store/BaseAppStore'
import { Module } from 'vuex-module-decorators'

export interface AppStateType extends IBaseAppStore {}

@Module({
    name: 'app',
    namespaced: true,
})
export default class AppModule extends BaseAppStore {}
