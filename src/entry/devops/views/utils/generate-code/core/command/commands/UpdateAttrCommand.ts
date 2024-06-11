import { AbstractCommand } from '@/entry/devops/views/utils/generate-code/core/command'
import { AbstractBaseModel } from '@/entry/devops/views/utils/generate-code/core/dataStore/AbstractBaseModel'
import { CommandKeyEnum } from '@/entry/devops/views/utils/generate-code/core/sources/CommandKeyEnum'
import { createUUID } from '@/entry/devops/views/utils/generate-code/core/utils'
import { cloneDeep } from 'lodash'

export class UpdateAttrCommand<T extends AbstractBaseModel = AbstractBaseModel> extends AbstractCommand<T> {
    /* 存储上一次修改的名称 */
    private preValue: any = void 0

    constructor(private model: T, private propertiesKey: string, private newValue: string) {
        super(createUUID(), `修改了属性：${propertiesKey}`)
    }

    public doExecute(): T {
        this.preValue = cloneDeep(this.app.dataStore.get(this.model.properties, this.propertiesKey))
        this.app.dataStore.set(this.model.properties, this.propertiesKey, this.newValue)
        this.app.commandManage.emit(CommandKeyEnum.ON_UPDATE_ATTR)
        return this.model
    }

    public redo(): T {
        return this.doExecute()
    }

    public undo(): void {
        this.app.dataStore.set(this.model.properties, this.propertiesKey, this.preValue)
        this.app.commandManage.emit(CommandKeyEnum.ON_UPDATE_ATTR)
    }
}
