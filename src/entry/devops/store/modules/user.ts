import { generatePermissionMenu, getIndexUri } from '../utils/user'
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { UserMenu, PermissionMenu, UserInfo } from '@/@types'
import { LocalMenu } from '../../menus'

const state = {
    defaultPath: '', // 后台默认地址
    token: '', // 用户token
    menus: [] as PermissionMenu[], // 左侧菜单
    info: {} as UserInfo, // 用户信息
    redirect: '',
    loginGuide: false,
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
    /**
     * 顶部菜单
     */
    topMenus = [] as PermissionMenu[]
    /**
     * 菜单模式： 1 常规左侧菜单 2 左侧+顶部菜单
     */
    mode = 1
    /**
     * 设置菜单模式 1 默认只有左侧菜单  2 顶部菜单+左侧菜单
     * @param mode
     */
    @Mutation
    setMode(mode = 1) {
        this.mode = mode
    }
    /**
     * 根据顶部菜单获取叶子菜单地址
     * @param uri 当亲路由path
     */
    @Action
    async GetDefaultPath(uri: string) {
        const topMenus = this.topMenus
        const topMenu = topMenus.find(item => item.path === uri)
        if (topMenus) {
            const children = topMenu?.children ?? []
            const defaultPath = getIndexUri(children)
            return defaultPath
        }

        return ''
    }
    /**
     * 修改配置
     * @param data
     */
    @Mutation
    set(data: any = {}) {
        Object.assign(this, data)
    }
    /**
     * 设置左侧菜单
     * @param menus 原始菜单数据
     */
    @Mutation
    resetMenus(menus: any[]) {
        this.menus = [...menus]
    }
    defaultPath = state.defaultPath
    menus = state.menus
    token = state.token
    info = state.info
    username = ''
    password = ''
    redirect = ''
    loginGuide = false
    // 是否记住账号 1 是 0 否
    alwaysRemember = 0
    /**
     * 是否记住账号
     */
    @Mutation
    toggleRemember(val: any) {
        this.alwaysRemember = val
    }
    /**
     * 保存用户名和密码
     */
    @Mutation
    rememberAccount(account: { username: string; password: string }) {
        this.username = account.username
        this.password = account.password
    }
    /**
     * 清空用户信息
     */
    @Mutation
    clear() {
        this.defaultPath = ''
        this.token = ''
        this.info = {}
        this.menus = []
        this.topMenus = []
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
     * 设置左侧菜单栏菜单
     * @param data PermissionMenu[]
     */
    @Mutation
    setPermissionMenus(data: UserMenu[]) {
        const mode = this.mode
        if (mode === 1) {
            const menus = generatePermissionMenu(data)
            const defaultPath = getIndexUri(data)
            this.defaultPath = defaultPath
            this.menus = menus
        } else {
            const firstMenu = data[0]
            const firstMenuChildren = firstMenu.children ?? []
            const menus = generatePermissionMenu(firstMenuChildren)
            const defaultPath = getIndexUri(firstMenuChildren)
            this.defaultPath = defaultPath
            this.menus = menus
            this.topMenus = [...generatePermissionMenu(data)]
        }
    }
    /**
     * 设置左侧菜单栏菜单
     * @param data PermissionMenu[]
     */
    @Mutation
    setMenus(data: PermissionMenu[]) {
        this.menus = data
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
        this.redirect = ''
    }
    @Mutation
    setRedirect(val: string) {
        this.redirect = val
    }
    @Mutation
    setLoginGuide() {
        this.loginGuide = true
    }
    /**
     * 更新用户信息和用户菜单 TODO 临时占位 请根据业务重新处理
     */
    @Action
    async GetCurrentUser() {
        this.setPermissionMenus(LocalMenu)
        // TODO 获取用户信息
        // this.setUserInfo({
        //     name: 'icinfo',
        // })
        // TODO 获取菜单
    }

    @Action
    /**
     * 退出登录
     */
    FedLogOut(data?: any) {
        return new Promise(resolve => {
            if (!this.alwaysRemember) {
                this.rememberAccount({
                    username: '',
                    password: '',
                })
            }
            this.logout()
            resolve('')
        }).then(() => {
            location.href = process.env.BASE_URL
        })
    }
}
