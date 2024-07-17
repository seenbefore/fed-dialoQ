import BaseSettingStore, { IBaseSettingStore } from '@@core/common/store/BaseSettingStore'
import { Module } from 'vuex-module-decorators'

export interface SettingsStateType extends IBaseSettingStore {}

@Module({
    name: 'settings',
    namespaced: true,
})
export default class MyModule extends BaseSettingStore {}
