import BaseMobileAppStore from '@@core/common/store/BaseMobileAppStore'
import { Module, VuexModule } from 'vuex-module-decorators'

@Module({
    name: 'app',
    namespaced: true,
    stateFactory: true,
})
export default class AppModule extends VuexModule {}
