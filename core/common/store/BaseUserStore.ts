import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

export interface IBaseUserStore<T, U> {
    defaultPath: string // 后台默认地址
    token: string // 用户token
    menus: Array<T> // 左侧菜单
    info: U // 用户信息
    redirect: string
    loginGuide: boolean
    alwaysRemember: RememberType
}

/* 菜单模式： 1 常规左侧菜单 2 左侧+顶部菜单 */
export enum AppMode {
    DEFAULT = 1,
    TOP = 2,
}

/* 是否记住账号 1 是 0 否 */
export enum RememberType {
    YES = 1,
    NO = 0,
}

/**
 * { T } 菜单类型
 * { U } 用户信息
 */
export default abstract class BaseUserStore<T = any, U = any> extends VuexModule implements IBaseUserStore<T, U> {
    /**
     * 顶部菜单
     */
    public topMenus = [] as Array<T>

    /**
     * 菜单模式： 1 常规左侧菜单 2 左侧+顶部菜单
     */
    public mode: AppMode = AppMode.DEFAULT

    /* 默认菜单path */
    public defaultPath = ''

    /* menus */
    public menus: Array<T> = []

    /* token */
    public token = ''

    /* 用户信息 */
    public info: U = {} as U

    /* 用户名 */
    public username = ''

    /* 密码 */
    public password = ''

    // 是否记住账号 1 是 0 否
    public alwaysRemember: RememberType = RememberType.NO

    public redirect = ''

    public loginGuide = false

    /**
     * 设置菜单模式 1 默认只有左侧菜单  2 顶部菜单+左侧菜单
     * @param mode
     */
    @Mutation
    public setMode(mode = AppMode.DEFAULT): void {
        this.mode = mode
    }

    /**
     * 修改配置
     * @param data
     */
    @Mutation
    public set<R extends BaseUserStore<T, U>>(data: Partial<Record<keyof R, R[keyof R]>>): void {
        Object.assign(this, data)
    }

    /**
     * 设置左侧菜单
     * @param menus 原始菜单数据
     */
    @Mutation
    public resetMenus(menus: Array<T>): void {
        this.menus = [...menus]
    }

    /**
     * 是否记住账号
     */
    @Mutation
    public toggleRemember(val: RememberType): void {
        this.alwaysRemember = val
    }

    /**
     * 保存用户名和密码
     */
    @Mutation
    public rememberAccount(account: { username: string; password: string }): void {
        this.username = account.username
        this.password = account.password
    }

    /**
     * 清空用户信息
     */
    @Mutation
    public clear(): void {
        this.defaultPath = ''
        this.token = ''
        this.info = {} as U
        this.menus = []
        this.topMenus = []
        this.redirect = ''
    }

    @Mutation
    public setRedirect(val: string): void {
        this.redirect = val
    }

    @Mutation
    public setLoginGuide(): void {
        this.loginGuide = true
    }

    /**
     * 设置登录token
     * @param token 登录凭证
     */
    @Mutation
    public login(token: string): void {
        this.token = token
    }

    /**
     * 设置左侧菜单栏菜单
     * @param data PermissionMenu[]
     */
    @Mutation
    public setMenus(data: Array<T>): void {
        this.menus = data
    }

    /**
     * 设置用户信息
     * @param data 用户信息对象
     * @param data.name 姓名
     * @param data.sex 性别  0 无 1 男 2 女
     */
    @Mutation
    public setUserInfo(data: U): void {
        Object.assign(this.info, data)
    }

    /* 退出登录 */
    @Action
    public async fedLogOut(): Promise<void> {
        return new Promise(resolve => {
            const state = this.context.state as IBaseUserStore<T, U>
            if (!state.alwaysRemember) {
                this.context.commit('rememberAccount', {
                    username: '',
                    password: '',
                })
            }
            this.context.commit('clear')
            resolve('')
        }).then(() => {
            location.href = process.env.BASE_URL
        })
    }
}
