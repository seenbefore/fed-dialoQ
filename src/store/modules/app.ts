import BaseAppStore, { IBaseAppStore } from '@@core/common/store/BaseAppStore'
import { Module, Mutation, Action } from 'vuex-module-decorators'

export interface AppStateType extends IBaseAppStore {}

@Module({
    name: 'app',
    namespaced: true,
    stateFactory: true,
})
export default class AppModule extends BaseAppStore {
    /**
     *  是否不显示移动出卷宗目录的确认框
     * */
    public $dontShowDeleteConfirm = false
    /**
     *  设置是否不显示移动出卷宗目录的确认框
     * */
    @Mutation
    public setDontShowDeleteConfirm(value: boolean) {
        this.$dontShowDeleteConfirm = value
    }
    /**
     *  是否不显示移动到副卷的确认框
     * */

    public $dontShowMoveConfirm = false
    /**
     *  设置是否不显示移动到副卷的确认框
     * */
    @Mutation
    public setDontShowMoveConfirm(value: boolean) {
        this.$dontShowMoveConfirm = value
    }
    @Action
    public asyncSomething() {
        // 异步处理某些内容
        return new Promise(resolve => {
            this.setDontShowDeleteConfirm(false)
            resolve('')
        })
    }
}
