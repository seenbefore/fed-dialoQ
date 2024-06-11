import { AbstractBaseModel } from '@/entry/devops/views/utils/generate-code/core/dataStore/AbstractBaseModel'
import { CommandKeyEnum } from '@/entry/devops/views/utils/generate-code/core/sources/CommandKeyEnum'
import { createUUID } from '@/entry/devops/views/utils/generate-code/core/utils'
import { AbstractCommand } from '..'

export class AddModelCommand<T extends AbstractBaseModel = AbstractBaseModel> extends AbstractCommand<T> {
    constructor(private model: T, public index?: number) {
        super(createUUID(), `添加${model.label}`)
    }

    public doExecute(): T {
        // 加进去即可
        if (typeof this.index === 'number') {
            this.app.dataStore.insert(this.model, this.index)
        } else {
            this.app.dataStore.push(this.model)
        }
        this.app.commandManage.emit(CommandKeyEnum.ON_ADD_MODEL)
        this.app.commandManage.emit(CommandKeyEnum.ON_MODEL_NUM_UPDATE)
        return this.model
    }

    public redo(): T {
        return this.doExecute()
    }

    public undo(): void {
        this.app.dataStore.delete(this.model.id)
        this.app.commandManage.emit(CommandKeyEnum.ON_MODEL_NUM_UPDATE)
    }
}
