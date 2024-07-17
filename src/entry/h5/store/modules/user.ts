import { PermissionMenu, UserInfo, UserMenu } from '@/@types'
import BaseUserStore, { IBaseUserStore } from '@@core/common/store/BaseUserStore'
import { Module } from 'vuex-module-decorators'

export interface UserStateType extends IBaseUserStore<PermissionMenu | UserMenu, UserInfo> {}

@Module({
    name: 'user',
    namespaced: true,
    stateFactory: true,
})
export default class UserModule extends BaseUserStore<PermissionMenu | UserMenu, UserInfo> {}
