import { AbstractCommand } from '@/entry/devops/views/utils/generate-code/core/command'
import { AbstractBaseModel } from '@/entry/devops/views/utils/generate-code/core/dataStore/AbstractBaseModel'

export class DeleteModelCommand<T extends AbstractBaseModel = AbstractBaseModel> extends AbstractCommand<T> {
    public index = -1

    constructor(private model: T) {
        super(model.id, `删除${model.properties.label}`)
    }

    public doExecute(): T {
        const id = this.model.id
        this.index = this.model.parent ? this.model.parent.getChildrenIndex(id) : this.app.dataStore.getDataIndex(id)
        this.app.dataStore.delete(this.model.id)
        return this.model
    }

    public redo(): T {
        return this.doExecute()
    }

    public undo(): void {
        if (this.model.parent) {
            this.model.parent.children.splice(this.index, 0, this.model)
        } else {
            this.app.dataStore.data.splice(this.index, 0, this.model)
        }
    }
}
