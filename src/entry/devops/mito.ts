import Vue from 'vue'
// 错误日志埋点
import * as MITO from 'icinfo-monitor-web'

import store from './store'
Vue.use(MITO.MitoVue)
MITO.init({
    // 应用名称 + 环境
    clientName: '蜻蜓云效@' + process.env.VUE_APP_ENV,
    // 上报地址
    dsn: process.env.VUE_APP_ENV !== 'prod' ? 'http://192.168.1.178:7070/api/v1/error/report' : '@/MITO/api/v1/error/report',
    // client_secret 应用秘钥
    apikey: process.env.VUE_APP_ENV !== 'prod' ? 'NIH5xdcOBUP5RORZnKcyhBLZ' : '',
    // clientId 应用标识
    clientId: process.env.VUE_APP_ENV !== 'prod' ? 'mOqTFNCurU' : '',
    // 只在本地打印日志
    debug: process.env.VUE_APP_ENV === 'dev',
    // 不上报console
    silentConsole: true,
    // 不上报promise异常
    silentUnhandledrejection: true,
    // 行为日志限制个数
    maxBreadcrumbs: 5,
    // 相同的错误最多上报次数
    maxDuplicateCount: 3,
    // 用户唯一标识 根据实际情况看是否需要，注意：每个应用的用户信息是不一样的
    backTrackerId() {
        let userInfo = store.state.user?.info || {}
        return userInfo.name || '匿名'
    },
    // 判断服务度请求异常 code不是200的则是异常情况。注意：根据应用根据实际情况判断
    isAjaxError(body: any) {
        const input = body?.response?.data || ''
        if (typeof input === 'string' && input.indexOf('code') > -1 && input.indexOf('{') === 0) {
            try {
                const res = JSON.parse(input)
                // 业务异常
                if (![200, 0].includes(res.code)) {
                    return true
                }
            } catch (error) {
                return false
            }
        }

        return false
    },
    // 如果错误事件发生在本地则不上报
    async beforeDataReport(event) {
        if (event.data?.type === 'RESOURCE_ERROR') {
            return false
        }
        if (location.host.startsWith('localhost')) {
            return false
        }
        return event
    },
})
// setTimeout(() => {

//     MITO.log({
//         message: '88888',
//         tag: '洒洒水',
//         ex: {
//             name: '11',
//             age: 2,
//         },
//     })
// }, 2000)
