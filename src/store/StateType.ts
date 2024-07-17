import { AppStateType } from '@/store/modules/app'
import { SettingsStateType } from '@/store/modules/settings'
import { TagsStateType } from '@/store/modules/tagsView'
import { UserStateType } from '@/store/modules/user'

// vuex state 的模块的类型
type ModuleType = {
    app: AppStateType
    user: UserStateType
    settings: SettingsStateType
    tagsView: TagsStateType
}

// 所有的StateType
export type StateType = ModuleType
