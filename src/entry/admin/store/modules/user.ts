import { PermissionMenu, UserInfo, UserMenu } from '@/@types'
import { generatePermissionMenu, getDefaultPathUtil, getIndexUri } from '@/scripts/utils/store/user'
import BaseUserStore, { IBaseUserStore } from '@@core/data/store/BaseUserStore'
import { Module, Mutation } from 'vuex-module-decorators'

export interface UserStateType extends IBaseUserStore<PermissionMenu | UserMenu, UserInfo> {}

@Module({
    name: 'user',
    namespaced: true,
    stateFactory: true,
})
export default class MyModule extends BaseUserStore<PermissionMenu | UserMenu, UserInfo> {
    @Mutation
    public getDefaultPath(uri: string): string {
        return getDefaultPathUtil(uri, this.topMenus)
    }

    @Mutation
    public setPermissionMenus(data: Array<PermissionMenu | UserMenu>): void {
        const mode = this.mode
        if (mode === 1) {
            const menus = generatePermissionMenu(data as any)
            this.defaultPath = getIndexUri(data)
            this.menus = menus
        } else {
            const firstMenu = data[0]
            const firstMenuChildren = firstMenu.children ?? []
            const menus = generatePermissionMenu(firstMenuChildren as any)
            this.defaultPath = getIndexUri(firstMenuChildren)
            this.menus = menus
            this.topMenus = [...generatePermissionMenu(data as any)]
        }
    }
}
