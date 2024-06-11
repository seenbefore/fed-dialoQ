import { CommandKeyEnum } from '@/entry/devops/views/utils/generate-code/core/sources/CommandKeyEnum'
import { InjectApp } from '@/entry/devops/views/utils/generate-code/core/utils/'

export interface ICommand<T = any> {
    id: number
    label: string
    // 命令调用并且记录历史
    execute: () => UndefinedAble<T>
    // 实际命令执行的逻辑
    doExecute: () => UndefinedAble<T>
    // 重做
    redo: () => void
    // 撤销
    undo: () => void
}

export abstract class AbstractCommand<T = any> extends InjectApp implements ICommand<T> {
    /**
     * 执行 execute 并且记录历史
     */
    public abstract doExecute(): T
    /**
     * 重做
     */
    public abstract redo(): T
    /**
     * 撤销
     */
    public abstract undo(): void

    protected constructor(public id: number, public label: string) {
        super()
    }

    /**
     * 记录一些位置面板信息，方便恢复状态
     */
    public record(): void {}

    /**
     * 命令调用并且记录历史
     */
    public execute(): T {
        this.record()
        // 记录当前命令
        this.app.commandManage.recordCommand(this)
        const doExecuteReturn = this.doExecute()
        this.app.commandManage.emit(CommandKeyEnum.ON_UPDATE_VIEW)
        return doExecuteReturn
    }
}
