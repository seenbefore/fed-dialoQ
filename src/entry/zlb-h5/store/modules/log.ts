import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'

@Module({ name: 'log', namespaced: true })
export default class logStore extends VuexModule {
    startTime = 0
    /** 用户从进入到离开当前页面的时长 */
    standingTime = 0
    /** 页面启动到加载完成的时间 (上一个页面)（t2） */
    oldLoadingTime = 0
    /** 页面启动到加载完成的时间 （t2） */
    loadingTime = 0
    /** 页面启动到页面响应完成的时间  (上一个页面)  （t0） */
    oldResponseTime = 0
    /** 页面启动到页面响应完成的时间  （t0） */
    responseTime = 0
    /** 上一个页面路由 */
    pageRoute: any = {}

    //获取当前的todoList
    @Action
    setClearAll() {
        this.context.commit('setInfo', {})
        this.context.commit('setStandingTime', 0)
        this.context.commit('setLoadingTime', 0)
        this.context.commit('setResponseTime', 0)
        this.context.commit('setPageRoute', {})
    }
    @Mutation
    setStartTime(data: number) {
        this.startTime = data
    }
    @Mutation
    /** 用户从进入到离开当前页面的时长 */
    setStandingTime(data: number) {
        this.standingTime = data
    }

    @Mutation
    /** 页面启动到加载完成的时间 */
    setLoadingTime(data: number) {
        /** 每次更新存放上一个页面时间 */
        this.oldLoadingTime = this.loadingTime
        // console.log('oldLoadingTime-----',state.oldLoadingTime);
        this.loadingTime = data
        // console.log('loadingTime-----',state.loadingTime);
    }

    @Mutation
    /** 页面启动到页面响应完成的时间 */
    setResponseTime(data: number) {
        /** 每次更新存放上一个页面时间 */
        this.oldResponseTime = this.responseTime
        // console.log('oldResponseTime-----',state.oldResponseTime);
        this.responseTime = data
        // console.log('responseTime-----',state.responseTime);
    }

    @Mutation
    /** 当前路由 */
    setPageRoute(data: any) {
        this.pageRoute = data
    }
}
