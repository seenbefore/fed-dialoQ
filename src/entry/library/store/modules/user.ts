import { UserInfo } from '@/@types'
import BaseUserStore, { IBaseUserStore } from '@@core/common/store/BaseUserStore'
import { Action, Module, Mutation } from 'vuex-module-decorators'

export interface UserStateType extends IBaseUserStore<any, UserInfo> {}

@Module({
    name: 'user',
    namespaced: true,
    stateFactory: true,
})
export default class MyModule extends BaseUserStore<any, UserInfo> {
    /**
     * 清空用户信息
     */
    @Mutation
    public clear(): void {
        this.token = ''
        this.info = {}
    }

    /**
     * 清空登录信息
     */
    @Mutation
    public logout(): void {
        this.token = ''
        this.info = {}
    }

    @Action
    /**
     * 退出登录
     */
    public fedLogOut(): Promise<void> {
        return new Promise(resolve => {
            this.logout()
            resolve(void 0)
        })
    }

    @Action
    /**
     * 跳转第三方登录
     */
    public ThirdLogin(): Promise<void> {
        return new Promise(resolve => {
            const redirect = process.env.NODE_ENV === 'development' ? `${location.origin}/login-free` : ''
            // 蜻蜓云效
            //location.href = `http://192.168.1.147:3001/login?redirect=${redirect}`
            // 仓颉扫码
            location.href = `https://cangjie.icinfo.cn/login-library?redirect=${redirect}`
            resolve(void 0)
        })
    }
}
