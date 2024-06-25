import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { UserInfo } from '@/@types'

const state = {
    token: '', // 用户token
    info: {} as UserInfo, // 用户信息
}

type UserStateType = typeof state
export { UserStateType, state }

@Module({
    name: 'user',
    namespaced: true,
    // store,
    // dynamic: true,
    stateFactory: true,
})
export default class MyModule extends VuexModule {
    token = state.token
    info = state.info

    /**
     * 清空用户信息
     */
    @Mutation
    clear() {
        this.token = ''
        this.info = {}
    }
    /**
     * 设置登录token
     * @param token 登录凭证
     */
    @Mutation
    login(token: string) {
        this.token = token
    }

    /**
     * 设置用户信息
     * @param data 用户信息对象
     * @param data.name 姓名
     * @param data.sex 性别  0 无 1 男 2 女
     */
    @Mutation
    setUserInfo(data: UserInfo) {
        Object.assign(this.info, data)
    }
    /**
     * 清空登录信息
     */
    @Mutation
    logout() {
        this.token = ''
        this.info = {}
    }

    @Action
    /**
     * 退出登录
     */
    FedLogOut() {
        return new Promise(resolve => {
            this.logout()
            resolve('')
        })
    }
    @Action
    /**
     * 跳转第三方登录
     */
    ThirdLogin() {
        return new Promise(resolve => {
            const redirect = process.env.NODE_ENV === 'development' ? `${location.origin}/login-free` : ''
            // 蜻蜓云效
            //location.href = `http://192.168.1.147:3001/login?redirect=${redirect}`
            // 仓颉扫码
            location.href = `https://cangjie.icinfo.cn/login-library?redirect=${redirect}`
            resolve('')
        })
    }
}
