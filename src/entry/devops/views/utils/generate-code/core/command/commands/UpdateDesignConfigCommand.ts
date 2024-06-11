import { AbstractCommand } from '@/entry/devops/views/utils/generate-code/core/command'
import { AbstractBaseModel } from '@/entry/devops/views/utils/generate-code/core/dataStore/AbstractBaseModel'
import { CommandKeyEnum } from '@/entry/devops/views/utils/generate-code/core/sources/CommandKeyEnum'
import { createUUID } from '@/entry/devops/views/utils/generate-code/core/utils'
import { cloneDeep } from 'lodash'

export class UpdateDesignConfigCommand<T extends AbstractBaseModel = AbstractBaseModel> extends AbstractCommand<T> {
    /* 存储上一次修改的名称 */
    private preValue: any = void 0

    constructor(private model: T, private newValue: any) {
        super(createUUID(), `修改app名称`)
    }

    public doExecute(): T {
        this.preValue = cloneDeep(this.app.dataStore.config)
        this.app.dataStore.updateConfig(this.newValue)
        this.app.commandManage.emit(CommandKeyEnum.ON_UPDATE_DESIGN_CONFIG)
        return (void 0 as unknown) as T
    }

    public redo(): T {
        return this.doExecute()
    }

    public undo(): void {
        this.app.dataStore.updateConfig(this.preValue)
        this.app.commandManage.emit(CommandKeyEnum.ON_UPDATE_DESIGN_CONFIG)
    }
}
