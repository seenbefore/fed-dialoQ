import BaseLogStore from '@@core/common/store/BaseLogStore'
import { Module } from 'vuex-module-decorators'

@Module({ name: 'log', namespaced: true })
export default class logStore extends BaseLogStore {}
