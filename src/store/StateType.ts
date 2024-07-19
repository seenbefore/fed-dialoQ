import { AppStateType } from './modules/app'
import { UserStateType } from './modules/user'
import { SettingsStateType } from './modules/settings'
import { TagsStateType } from './modules/tagsView'

// vuex state 的模块的类型
type ModuleType = {
    app: AppStateType
    user: UserStateType
    settings: SettingsStateType
    tagsView: TagsStateType
}

// 所有的StateType
export type StateType = ModuleType
