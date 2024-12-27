import { Route } from 'vue-router'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

export type IBaseVisitedView = {
    title: string
    _: string
    query: Record<string, any>
    params: Record<string, any>
    path: string
    fullPath: string
    hash: string
    name: string
    fromPath?: string
    meta: {
        title: string
        noCache?: boolean
    }
    noCache?: boolean
}

export type IBaseTagsViewStore<T = IBaseVisitedView> = { visitedViews: Array<T>; cachedViews: Array<string> }

export default class BaseTagsViewStore<T extends IBaseVisitedView = IBaseVisitedView> extends VuexModule {
    public cachedViews: Array<string> = []

    public visitedViews: Array<T> = []

    @Mutation
    public ADD_VISITED_VIEW(view: Partial<T>): void {
        const meta = view.meta || { title: '未知' }
        if (this.visitedViews.some(v => v.fullPath === view.fullPath)) return
        const title = meta.title || '未知'
        this.visitedViews.push({
            title,
            _: view.query?._ || '',
            query: {
                ...view.query,
            },
            params: {
                ...view.params,
            },
            path: view.path,
            fullPath: view.fullPath,
            hash: view.hash,
            name: view.name,
            // 来源fullPath地址
            fromPath: view.fromPath || '',
            meta: {
                ...view.meta,
                title,
            },
        } as T)
    }

    @Mutation
    public ADD_CACHED_VIEW(view: Partial<T>): void {
        if (!view.name) return
        if (this.cachedViews.includes(view.name)) return
        if (!view.meta?.noCache) {
            this.cachedViews.push(view.name)
        }
    }

    @Mutation
    public DEL_VISITED_VIEW(view: Partial<T> | Route): void {
        for (const [i, v] of this.visitedViews.entries()) {
            if (v.fullPath === view.fullPath) {
                this.visitedViews.splice(i, 1)
                break
            }
        }
    }

    @Mutation
    public DEL_CACHED_VIEW(view: Partial<T> | Route): void {
        const index = this.cachedViews.indexOf(view?.name ?? '')
        index > -1 && this.cachedViews.splice(index, 1)
    }

    @Mutation
    public DEL_OTHERS_VISITED_VIEWS(view: Partial<T>): void {
        this.visitedViews = this.visitedViews.filter((v: any) => {
            return v.meta.affix || v.fullPath === view.fullPath
        })
    }

    @Mutation
    public DEL_OTHERS_CACHED_VIEWS(view: Partial<T>): void {
        const index = this.cachedViews.indexOf(view?.name ?? '')
        if (index > -1) {
            this.cachedViews = this.cachedViews.slice(index, index + 1)
        } else {
            // if index = -1, there is no cached tags
            this.cachedViews = []
        }
    }

    @Mutation
    public DEL_ALL_VISITED_VIEWS(): void {
        // keep affix tags
        this.visitedViews = this.visitedViews.filter((tag: any) => tag.meta.affix)
    }

    @Mutation
    public DEL_ALL_CACHED_VIEWS(): void {
        this.cachedViews = []
    }

    @Mutation
    public UPDATE_VISITED_VIEW(view: Partial<T>): void {
        for (let v of this.visitedViews) {
            if (v.fullPath === view.fullPath) {
                //v = Object.assign(v, view)
                // @ts-ignore
                v = view
                break
            }
        }
    }

    @Action
    public addView(view: Partial<T>): void {
        this.context.dispatch('addVisitedView', view)
        this.context.dispatch('addCachedView', view)
    }

    @Action
    public addVisitedView(view: Partial<T>): void {
        this.context.commit('ADD_VISITED_VIEW', view)
    }

    @Action
    public addCachedView(view: Partial<T>): void {
        this.context.commit('ADD_CACHED_VIEW', view)
    }

    @Action
    public delView(view: Partial<T> | Route): Promise<IBaseTagsViewStore> {
        return new Promise(resolve => {
            this.context.dispatch('delVisitedView', view)
            this.context.dispatch('delCachedView', view)

            resolve({
                visitedViews: [...this.visitedViews],
                cachedViews: [...this.cachedViews],
            })
        })
    }

    @Action
    public delVisitedView(view: Partial<T> | Route): Promise<Array<T>> {
        return new Promise(resolve => {
            this.context.commit('DEL_VISITED_VIEW', view)
            resolve([...this.visitedViews])
        })
    }

    @Action
    public delCachedView(view: Partial<T> | Route): Promise<Array<string>> {
        return new Promise(resolve => {
            this.context.commit('DEL_CACHED_VIEW', view)
            resolve([...this.cachedViews])
        })
    }

    @Action
    public delOthersViews(view: Partial<T>): Promise<IBaseTagsViewStore> {
        return new Promise(resolve => {
            this.context.dispatch('delOthersVisitedViews', view)
            this.context.dispatch('delOthersCachedViews', view)

            resolve({
                visitedViews: [...this.visitedViews],
                cachedViews: [...this.cachedViews],
            })
        })
    }

    @Action
    public delOthersVisitedViews(view: Partial<T>): Promise<Array<T>> {
        return new Promise(resolve => {
            this.context.commit('DEL_OTHERS_VISITED_VIEWS', view)
            resolve([...this.visitedViews])
        })
    }

    @Action
    public delOthersCachedViews(view: Partial<T>): Promise<Array<string>> {
        return new Promise(resolve => {
            this.context.commit('DEL_OTHERS_CACHED_VIEWS', view)
            resolve([...this.cachedViews])
        })
    }

    @Action
    public delAllViews(view?: Partial<T>): Promise<IBaseTagsViewStore> {
        return new Promise(resolve => {
            this.context.dispatch('delAllVisitedViews', view)
            this.context.dispatch('delAllCachedViews', view)

            resolve({
                visitedViews: [...this.visitedViews],
                cachedViews: [...this.cachedViews],
            })
        })
    }

    @Action
    public delAllVisitedViews(view: Partial<T>): Promise<Array<T>> {
        return new Promise(resolve => {
            this.context.commit('DEL_ALL_VISITED_VIEWS')
            resolve([...this.visitedViews])
        })
    }

    @Action
    public delAllCachedViews(view: Partial<T>): Promise<Array<string>> {
        return new Promise(resolve => {
            this.context.commit('DEL_ALL_CACHED_VIEWS')
            resolve([...this.cachedViews])
        })
    }

    @Action
    public updateVisitedView(view: Partial<T>): void {
        this.context.commit('UPDATE_VISITED_VIEW', view)
    }
}
