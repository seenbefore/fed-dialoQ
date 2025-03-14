import { PermissionMenu, UserInfo, UserMenu } from '@/@types'
import { generatePermissionMenu, getDefaultPathUtil, getIndexUri } from '@/scripts/utils/store/user'
import BaseUserStore, { IBaseUserStore } from '@@core/common/store/BaseUserStore'
import { Module, Mutation, Action } from 'vuex-module-decorators'
import { http } from '@/scripts/http'
import { KEYUTIL, KJUR, hextob64 } from 'jsrsasign'

export interface UserStateType extends IBaseUserStore<PermissionMenu | UserMenu, UserInfo> {}

/**
 * 加密数据
 */
export const encrypt = async (message: string) => {
    // 获取公钥
    const { data } = await http.get('/usercenter/user/readRsa')
    const publicKey = KEYUTIL.getKey(data)
    const enc = KJUR.crypto.Cipher.encrypt('0000' + message, publicKey)
    const encrypted = hextob64(enc)
    // console.log('encrypted :>> ', encrypted)
    return encrypted
}

@Module({
    name: 'user',
    namespaced: true,
    stateFactory: true,
})
export default class MyModule extends BaseUserStore<PermissionMenu | UserMenu, UserInfo> {
    @Action
    public getDefaultPath(uri: string): string {
        return getDefaultPathUtil(uri, this.topMenus)
    }

    @Mutation
    public setPermissionMenus(data: Array<PermissionMenu | UserMenu>): void {
        const mode = this.mode
        if (mode === 1) {
            const menus = generatePermissionMenu(data as any)
            this.defaultPath = getIndexUri(menus)
            this.menus = menus
            console.log('setPermissionMenus', this.defaultPath)
        } else {
            const firstMenu = data[0]
            const firstMenuChildren = firstMenu.children ?? []
            const menus = generatePermissionMenu(firstMenuChildren as any)
            this.defaultPath = getIndexUri(firstMenuChildren)
            this.menus = menus
            this.topMenus = [...generatePermissionMenu(data as any)]
        }
    }
    /**
     * 登录
     * @param parmas
     * @param parmas.username 用户名
     * @param parmas.password 密码
     */
    @Action
    public async syncLogin(parmas: { username: string; password: string }) {
        const { password, username } = parmas
        const encryptPasswor = await encrypt(password)

        const { data } = await http.request({
            url: '/usercenter/user/login',
            method: 'post',
            data: {
                username,
                password: encryptPasswor,
            },
        })
        const { user, token, applicationMenuList } = data

        this.setPermissionMenus(applicationMenuList)
        this.login(token)
        this.setUserInfo({
            name: user.realName,
            username: data.loginName,
            sex: user.sex,
        })
    }
    /**
     * 通过token登录
     * @param token
     */
    @Action
    public async syncLoginWithToken(token: any) {
        this.login(token)
        const { data } = await http.get('/usercenter/user/login-with-token')
        const { user, applicationMenuList } = data
        this.setPermissionMenus(applicationMenuList)
        this.setUserInfo({
            name: user.realName,
            username: data.loginName,
            sex: user.sex,
        })
    }
}
