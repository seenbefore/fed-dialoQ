import { Application } from '@/entry/devops/views/utils/generate-code/core/Application'
import { UpdateAttrCommand } from '@/entry/devops/views/utils/generate-code/core/command/commands/UpdateAttrCommand'
import { createCommand } from '@/entry/devops/views/utils/generate-code/core/command/createCommand'
import { IModelAttr } from '@/entry/devops/views/utils/generate-code/core/dataStore/AbstractBaseDataStore'
import { CommandKeyEnum } from '@/entry/devops/views/utils/generate-code/core/sources/CommandKeyEnum'
import { get } from 'lodash'
import { Component, InjectReactive, Prop, Vue } from 'vue-property-decorator'

@Component
export class UseAttrModel extends Vue {
    @InjectReactive('app')
    public app!: Application

    /* 当前激活的模块 */
    public get activeModel() {
        return this.app.dataStore.activeModel
    }

    @Prop({ type: Object })
    public attr!: IModelAttr

    @Prop({ type: Function })
    public customUpdate?: (value: string, originValue: string) => any

    protected transitionValue = ''

    protected isInitialized = false

    public get path() {
        return this.attr.path
    }

    public get value() {
        if (!this.isInitialized) {
            this.transitionValue = get(this.activeModel?.properties, this.path) ?? ''
            this.isInitialized = true
        }
        return this.transitionValue
    }

    public set value(value: string) {
        this.transitionValue = value
    }

    public updateValue() {
        if (this.customUpdate) {
            this.customUpdate(this.value, get(this.activeModel?.properties, this.path) ?? '')
        } else {
            this.activeModel && createCommand(UpdateAttrCommand, this.activeModel, this.path, this.transitionValue)
        }
        this.isInitialized = false
        this.$emit('updateValue', this.value)
    }

    public mounted() {
        this.app.commandManage.on(CommandKeyEnum.ON_UPDATE_VIEW, () => {
            this.isInitialized = false
        })
    }
}
