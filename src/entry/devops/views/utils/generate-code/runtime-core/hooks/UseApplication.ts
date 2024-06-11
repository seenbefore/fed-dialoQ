import { Application } from '@/entry/devops/views/utils/generate-code/core/Application'
import { CLASS_NAME_CONST_DATA } from '@/entry/devops/views/utils/generate-code/runtime-core/utils'
import { Component, InjectReactive, Vue } from 'vue-property-decorator'

@Component
export class UseApplication extends Vue {
    @InjectReactive('app')
    public app!: Application

    /* 当前激活的模块 */
    public get activeModel() {
        return this.app.dataStore.activeModel
    }

    public readonly CLASS_NAME_CONST_DATA = CLASS_NAME_CONST_DATA
}
