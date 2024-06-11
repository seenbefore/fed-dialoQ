import { AppStateType } from '@/store/modules/app'
import { UserStateType } from '@/store/modules/user'
import { SettingsStateType } from '@/store/modules/settings'
import { TagsStateType } from '@/store/modules/tagsView'

// vuex state 的模块的类型
type ModuleType = {
    app: AppStateType
    user: UserStateType
    settings: SettingsStateType
    tagsView: TagsStateType
}

// 所有的StateType
export type StateType = ModuleType
