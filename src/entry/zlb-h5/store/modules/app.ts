import { updatePartialKey } from '@zlb-h5/scripts/utils/object'
import { ZLBConfig } from '@zlb-h5/share/ZLBConfig'
import { cloneDeep } from 'lodash'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

/* 用户信息默认值 */
const getUserInfoDefaultValue = (): IAppUserInfo => ({
    appUserId: '',
    appUserName: '',
    phone: '',
})

/* 系统信息 */
export interface IAppSysInfo {
    /* 是否为老年版本 */
    uiStyle: 'elder' | 'normal'
    /*
     * 用户类型
     * @see 'src/typing/zlb.d.ts'
     * */
    userType: '0' | '1' | '2'
}

export interface IAppUserInfo {
    /* 手机号码 */
    phone: string
    /* 用户名 */
    appUserName: string
    /* 用户id */
    appUserId: string
}

export const getSysInfoDefaultValue = (): IAppSysInfo => ({
    uiStyle: 'normal',
    userType: '1',
})

@Module({ name: 'app', namespaced: true })
export default class App extends VuexModule {
    public token = ''

    /* 过滤页面的name，可用于去除keepAlive？ */
    public exclude: Array<string> = []
    public include: Array<string> = []

    /* 浙里办系统信息 */
    public appSysInfo: IAppSysInfo = getSysInfoDefaultValue()

    /* 浙里办登录用户信息 */
    public appUserInfo: IAppUserInfo = getUserInfoDefaultValue()

    /* 退出登录 */
    @Action
    public fedLogOut(): Promise<void> {
        this.token = ''
        /* 兼容下以前的app.js */
        return Promise.resolve()
    }

    /* 更新系统信息 */
    @Mutation
    public updateAppSysInfo(data: Partial<IAppSysInfo>): void {
        updatePartialKey(this.appSysInfo, data)
    }

    /* 更新用户信息 */
    @Mutation
    public setAppUserInfo(data: Partial<IAppUserInfo> & Obj): void {
        updatePartialKey(this.appUserInfo, data)
    }

    /* 清空信息 */
    @Mutation
    public clear() {
        localStorage.removeItem(ZLBConfig.vuexKey)
        this.token = ''
        this.appUserInfo = getUserInfoDefaultValue()
        this.appSysInfo = getSysInfoDefaultValue()
    }

    /* 更新token */
    @Mutation
    public setToken(data: string): void {
        this.token = data
    }

    @Mutation
    public SET_VIEW_ALIVE(name: string | Array<string>): void {
        if (Array.isArray(name)) {
            this.include = cloneDeep(name)
        } else {
            const index = this.include.indexOf(name)
            if (index <= -1) {
                this.include.push(name)
            }
        }
    }

    @Mutation
    public SET_VIEW_DIE(name: string): void {
        if (!this.exclude.includes(name)) {
            this.exclude.push(name)
        }
    }

    @Mutation
    public REMOVE_VIEW_DIE(name: string): void {
        const index = this.exclude.indexOf(name)
        if (index > -1) {
            this.exclude.splice(index, 1)
        }
    }
}
