import http from '@zlb-h5/scripts/http'
import { EXECUTE_ENV_JUDGE } from '@zlb-h5/scripts/utils'
import { ZLBConfig } from '@zlb-h5/share/ZLBConfig'
import { appStore } from '@zlb-h5/store/useStore'
import CryptoJS from 'crypto-js'
import { Toast } from 'vant'

const ZWJSBridge = window.ZWJSBridge

/**
 * 浙里办单点登录的实现
 * TODO 目前浙里办登录前端统一通过 ticketId 走后端接口获取用户信息！
 */
export class ZLBLogin {
    private static _instance: ZLBLogin
    public static getInstance(): ZLBLogin {
        if (!ZLBLogin._instance) {
            ZLBLogin._instance = new ZLBLogin()
        }
        return ZLBLogin._instance
    }
    /* 构建单例Login对象 */
    private constructor() {}
    /* 解密 */
    private setDecrypt(word: any): string {
        let decrypt = CryptoJS.DES.decrypt(word, CryptoJS.enc.Utf8.parse('FF8080815D551320015D58A47FEB001F'), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
        })
        return CryptoJS.enc.Utf8.stringify(decrypt).toString()
    }

    /* 获取登录信息 */
    private getLoginInfo(): { isLogin: boolean } & Obj {
        const reg = new RegExp('(^|&)data=([^&]*)(&|$)')
        const r = window.location.search.substr(1).match(reg)
        if (r == null) {
            return { isLogin: false }
        }
        const queryData = unescape(r[2])
        if (!queryData) return { isLogin: false }
        return { isLogin: true, ...JSON.parse(this.setDecrypt(queryData)) }
    }

    /* 通过ticketId走后端接口登录，获取用户信息 */
    private async ticketIdLogin(ticketId: string): Promise<any> {
        const data = { ticketId }
        console.log('获取了ticketId：', ticketId)
        let res: any
        try {
            console.log('开始走login接口')
            res = await http.request({
                url: ZLBConfig.loginUrl,
                type: 'POST',
                data,
                exShowLoading: true,
            })
            const { token, userDto } = res.data
            appStore.setToken(token)
            /* 存储用户信息 */
            appStore.setAppUserInfo({
                appUserName: userDto.realName || '',
                appUserId: userDto.userId || '',
            })
            console.log('login接口走完了')
        } catch (error) {
            Toast('登录失败')
            Toast.clear()
            console.error('login接口执行失败', error)
            return Promise.reject(error)
        }
        return Promise.resolve(res)
    }

    /* 登录统一方法 */
    private publicLoginZLB() {
        return new Promise(async (resolve, reject) => {
            const _error = (message: string) => {
                Toast(message)
                setTimeout(() => {
                    ZWJSBridge.close().then(reject)
                }, 1000)
            }

            if (!ZWJSBridge.ssoTicket) {
                return _error('异常： ZWJSBridge 加载异常')
            }
            const ssoFlag = await ZWJSBridge.ssoTicket()
            if (ssoFlag?.result !== true && !ssoFlag.ticketId) {
                return _error('异常： 当前环境不支持 浙里办 统一单点登录')
            }
            if (ssoFlag.ticketId) {
                // 单点登录接口
                const data = await this.ticketIdLogin(ssoFlag.ticketId)
                resolve(data)
                return
            }
            reject('出现未知异常')
        })
    }

    public login(): Promise<any> {
        if (process.env.VUE_APP_IS_ZLB_DEV_ENV) {
            console.log('测试环境，使用固定ticketId：debug_tk_e4a0dc3fcc8d464ba336b9bcb1ba2072 登录')
            /* 如果是测试环境，则使用固定的ticketId登录 */
            return this.ticketIdLogin('debug_tk_e4a0dc3fcc8d464ba336b9bcb1ba2072')
        }
        console.log('开始单点登录')
        const data = this.getLoginInfo()
        if (data.isLogin) return Promise.resolve(data)
        // 没有登录 去登录的处理逻辑
        const { isZFB, isWX, isZLB } = EXECUTE_ENV_JUDGE
        if (isZLB()) {
            // 浙里办 登录
            return this.publicLoginZLB()
        } else if (isZFB()) {
            // 支付宝 登录
            return this.publicLoginZLB()
        } else if (isWX()) {
            // 微信 登录
            return this.publicLoginZLB()
        } else {
            Toast('请检查扫码软件')
            return ZWJSBridge.close()
        }
    }
}
