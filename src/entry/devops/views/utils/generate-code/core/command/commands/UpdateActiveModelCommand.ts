import { AbstractCommand } from '@/entry/devops/views/utils/generate-code/core/command'
import { AbstractBaseModel } from '@/entry/devops/views/utils/generate-code/core/dataStore/AbstractBaseModel'
import { CommandKeyEnum } from '@/entry/devops/views/utils/generate-code/core/sources/CommandKeyEnum'
import { createUUID } from '@/entry/devops/views/utils/generate-code/core/utils'

export class UpdateActiveModelCommand<T extends AbstractBaseModel = AbstractBaseModel> extends AbstractCommand<T> {
    /* 上一次激活的模块，用于回退 */
    public preActiveModel: UndefinedAble<T> = void 0

    private readonly model: UndefinedAble<T>

    constructor(_model?: T) {
        super(createUUID(), `点击${_model?.label ?? '空白区域'}`)
        this.model = _model?.id ? this.app.dataStore.findById(_model.id) : void 0
    }

    private emit(activeModel?: T) {
        this.app.commandManage.emit(CommandKeyEnum.ON_CURRENT_CHANGE, { activeModel })
    }

    public doExecute(): T {
        this.preActiveModel = this.app.dataStore.activeModel as UndefinedAble<T>
        this.app.dataStore.updateActiveModel(this.model)
        this.emit()
        return this.model as T
    }

    public redo(): T {
        return this.doExecute()
    }

    public undo(): void {
        this.app.dataStore.updateActiveModel(this.preActiveModel)
        this.emit()
    }
}
