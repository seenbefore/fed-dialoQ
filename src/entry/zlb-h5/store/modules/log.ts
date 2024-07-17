import BaseLogStore from '@@core/data/store/BaseLogStore'
import { Module } from 'vuex-module-decorators'

@Module({ name: 'log', namespaced: true })
export default class logStore extends BaseLogStore {}
