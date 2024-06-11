import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'

const state = {
    visitedViews: [] as any[],
    cachedViews: [] as any[],
}
type TagsStateType = typeof state
export { TagsStateType, state }

@Module({
    name: 'tagsView',
    namespaced: true,
    //store,
    //dynamic: true
})
export default class MyModule extends VuexModule {
    visitedViews = state.visitedViews
    cachedViews = state.cachedViews

    @Mutation
    ADD_VISITED_VIEW(view: any) {
        const meta = view.meta || {}
        //if (this.visitedViews.some((v: any) => v.path === view.path)) return
        if (this.visitedViews.some(v => v.fullPath === view.fullPath)) return
        const title = meta.title || '未知'
        this.visitedViews.push({
            title,
            _: view.query._ || '',
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

            meta: {
                ...view.meta,
                title,
            },
        })
        // state.visitedViews.push(
        //     Object.assign({}, view, {
        //         title: view.meta.title || 'no-name',
        //     }),
        // )
    }
    @Mutation
    ADD_CACHED_VIEW(view: any) {
        if (this.cachedViews.includes(view.name)) return
        if (!view.meta.noCache && view.meta.keepAlive === true) {
            this.cachedViews.push(view.name)
        }
    }
    @Mutation
    DEL_VISITED_VIEW(view: any) {
        for (const [i, v] of this.visitedViews.entries()) {
            if (v.fullPath === view.fullPath) {
                this.visitedViews.splice(i, 1)
                break
            }
        }
    }
    @Mutation
    DEL_CACHED_VIEW(view: any) {
        // const visitedViews = this.visitedViews
        // const name = view.name
        // if (visitedViews.some(v => v.name === name)) return
        const index = this.cachedViews.indexOf(view.name)
        index > -1 && this.cachedViews.splice(index, 1)
    }
    @Mutation
    DEL_OTHERS_VISITED_VIEWS(view: any) {
        this.visitedViews = this.visitedViews.filter((v: any) => {
            return v.meta.affix || v.fullPath === view.fullPath
        })
    }
    @Mutation
    DEL_OTHERS_CACHED_VIEWS(view: any) {
        const index = this.cachedViews.indexOf(view.name)
        if (index > -1) {
            this.cachedViews = this.cachedViews.slice(index, index + 1)
        } else {
            // if index = -1, there is no cached tags
            this.cachedViews = []
        }
    }
    @Mutation
    DEL_ALL_VISITED_VIEWS() {
        // keep affix tags
        const affixTags = this.visitedViews.filter((tag: any) => tag.meta.affix)
        this.visitedViews = affixTags
    }
    @Mutation
    DEL_ALL_CACHED_VIEWS() {
        this.cachedViews = []
    }
    @Mutation
    UPDATE_VISITED_VIEW(view: any) {
        for (let v of this.visitedViews) {
            if (v.fullPath === view.fullPath) {
                //v = Object.assign(v, view)
                v = view
                break
            }
        }
    }

    @Action
    addView(view: any) {
        console.log('addView', view.name)

        this.addVisitedView(view)
        this.addCachedView(view)
    }
    @Action
    addVisitedView(view: any) {
        this.ADD_VISITED_VIEW(view)
    }
    @Action
    addCachedView(view: any) {
        this.ADD_CACHED_VIEW(view)
    }
    @Action
    delView(view: any) {
        return new Promise(resolve => {
            this.delVisitedView(view)
            this.delCachedView(view)

            resolve({
                visitedViews: [...this.visitedViews],
                cachedViews: [...this.cachedViews],
            })
        })
    }
    @Action
    delVisitedView(view: any) {
        return new Promise(resolve => {
            this.DEL_VISITED_VIEW(view)
            resolve([...this.visitedViews])
        })
    }
    @Action
    delCachedView(view: any) {
        return new Promise(resolve => {
            this.DEL_CACHED_VIEW(view)
            resolve([...this.cachedViews])
        })
    }
    @Action
    delOthersViews(view: any) {
        return new Promise(resolve => {
            this.delOthersVisitedViews(view)
            this.delOthersCachedViews(view)

            resolve({
                visitedViews: [...this.visitedViews],
                cachedViews: [...this.cachedViews],
            })
        })
    }
    @Action
    delOthersVisitedViews(view: any) {
        return new Promise(resolve => {
            this.DEL_OTHERS_VISITED_VIEWS(view)
            resolve([...this.visitedViews])
        })
    }
    @Action
    delOthersCachedViews(view: any) {
        return new Promise(resolve => {
            this.DEL_OTHERS_CACHED_VIEWS(view)
            resolve([...this.cachedViews])
        })
    }
    @Action
    delAllViews(view: any) {
        return new Promise(resolve => {
            this.delAllVisitedViews(view)
            this.delAllCachedViews(view)

            resolve({
                visitedViews: [...this.visitedViews],
                cachedViews: [...this.cachedViews],
            })
        })
    }
    @Action
    delAllVisitedViews(view: any) {
        return new Promise(resolve => {
            this.DEL_ALL_VISITED_VIEWS()
            resolve([...this.visitedViews])
        })
    }
    @Action
    delAllCachedViews(view: any) {
        return new Promise(resolve => {
            this.DEL_ALL_CACHED_VIEWS()
            resolve([...this.cachedViews])
        })
    }
    @Action
    updateVisitedView(view: any) {
        this.UPDATE_VISITED_VIEW(view)
    }
}
//export const tagsViewStore = getModule(MyModule, store)
