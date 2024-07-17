import BaseTagsViewStore, { IBaseTagsViewStore } from '@@core/common/store/BaseTagsViewStore'
import { Module } from 'vuex-module-decorators'
import { Module as Mod } from 'vuex'

export interface TagsStateType extends IBaseTagsViewStore {}

@Module({
    name: 'tagsView',
    namespaced: true,
})
export default class MyModule extends BaseTagsViewStore {}
