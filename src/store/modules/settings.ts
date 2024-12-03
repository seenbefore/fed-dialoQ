import BaseSettingStore, { IBaseSettingStore } from '@@core/common/store/BaseSettingStore'
import { Module } from 'vuex-module-decorators'

export interface SettingsStateType extends IBaseSettingStore {}

@Module({
    name: 'settings',
    namespaced: true,
})
export default class SettingsModule extends BaseSettingStore {
    public theme = {
        name: 'gci',
        variable: {
            // '--color-primary': '#005ff5',
            // '--color-success': '#6DD400',
            // '--color-warning': '#FF7D00',
            // '--color-danger': '#F4333C',
            // '--color-info': '#666666',
        },
    }

    public noMargin = false
}
