import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

@Module({
    stateFactory: true,
    namespaced: true,
})
export default class BaseLogStore extends VuexModule {
    public startTime = 0
    /** 用户从进入到离开当前页面的时长 */
    public standingTime = 0
    /** 页面启动到加载完成的时间 (上一个页面)（t2） */
    public oldLoadingTime = 0
    /** 页面启动到加载完成的时间 （t2） */
    public loadingTime = 0
    /** 页面启动到页面响应完成的时间  (上一个页面)  （t0） */
    public oldResponseTime = 0
    /** 页面启动到页面响应完成的时间  （t0） */
    public responseTime = 0
    /** 上一个页面路由 */
    public pageRoute: any = {}

    //获取当前的todoList
    @Action
    public setClearAll(): void {
        this.context.commit('setInfo', {})
        this.context.commit('setStandingTime', 0)
        this.context.commit('setLoadingTime', 0)
        this.context.commit('setResponseTime', 0)
        this.context.commit('setPageRoute', {})
    }

    @Mutation
    public setStartTime(data: number): void {
        this.startTime = data
    }

    @Mutation
    /** 用户从进入到离开当前页面的时长 */
    public setStandingTime(data: number): void {
        this.standingTime = data
    }

    @Mutation
    /** 页面启动到加载完成的时间 */
    public setLoadingTime(data: number): void {
        /** 每次更新存放上一个页面时间 */
        this.oldLoadingTime = this.loadingTime
        // console.log('oldLoadingTime-----',state.oldLoadingTime);
        this.loadingTime = data
        // console.log('loadingTime-----',state.loadingTime);
    }

    @Mutation
    /** 页面启动到页面响应完成的时间 */
    public setResponseTime(data: number): void {
        /** 每次更新存放上一个页面时间 */
        this.oldResponseTime = this.responseTime
        this.responseTime = data
    }

    @Mutation
    /** 当前路由 */
    public setPageRoute(data: any): void {
        this.pageRoute = data
    }
}
