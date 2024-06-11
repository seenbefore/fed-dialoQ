import { CommandKeyEnum } from '@/entry/devops/views/utils/generate-code/core/sources/CommandKeyEnum'
import { EventBus } from '@/entry/devops/views/utils/generate-code/core/utils'
import { ICommand } from './index'

export type ICommandEventCallBack = (...args: any) => any | Promise<any>

export class CommandManage {
    /**
     * 命令行栈
     */
    private _commandStacks: ICommand[] = []
    public get commandStacks() {
        return this._commandStacks
    }

    public get commandStacksLength() {
        return this._commandStacks.length - 1
    }

    /**
     * 最大记录数
     */
    private _maxStack = 30

    /**
     * 当前命令
     */
    private _currentCommand?: ICommand

    public get currentCommand() {
        return this._currentCommand
    }

    /**
     * 当前执行栈的索引
     */
    private _currentCommandIndex = -1
    public get currentCommandIndex() {
        return this._currentCommandIndex
    }

    /**
     * 事件总线
     */
    private _eventBus: EventBus = new EventBus()

    public get isLastCommand(): boolean {
        return this._currentCommand === this._commandStacks[this.commandStacksLength]
    }

    public get hasNextCommand(): boolean {
        return this._currentCommandIndex <= this.commandStacksLength
    }

    public get hasPreCommand(): boolean {
        return this._currentCommandIndex > 0
    }

    /**
     * 事件分发
     * @param eventKey 事件key
     * @param otherParams
     */
    public emit<T extends Obj = Obj>(eventKey: CommandKeyEnum, otherParams?: T): void {
        this._eventBus.$emit(eventKey, {
            currentCommand: this._currentCommand,
            commandStack: this._commandStacks,
            ...(otherParams ?? {}),
        })
    }

    /**
     * 事件监听
     * @param eventKey 事件名称
     * @param callBack 事件回调
     * @returns
     */
    public on(eventKey: CommandKeyEnum, callBack: ICommandEventCallBack): number {
        return this._eventBus.$on(eventKey, callBack)
    }

    /**
     * 消除事件
     * @param eventKey
     */
    public off(eventKey: CommandKeyEnum | Array<CommandKeyEnum>): void {
        this._eventBus.$off(eventKey)
    }

    /**
     * 当前激活的命令变化
     * @param callBack 回调
     * @returns
     */
    public onCurrentChange(callBack: ICommandEventCallBack): number {
        return this.on(CommandKeyEnum.ON_CURRENT_CHANGE, callBack)
    }

    /**
     * 修改最大记录数
     * @param maxStack 最大记录数
     */
    public updateMaxStack(maxStack: number): void {
        this._maxStack = maxStack
    }

    /**
     * 执行下一步操作
     */
    private next(): void {
        // 说明并没有执行任何操作
        if (!this._currentCommand || this._currentCommandIndex === -1 || this._currentCommandIndex > this.commandStacksLength) {
            return
        }
        // 如果是最后一步不处理
        this._currentCommandIndex = this._currentCommandIndex + 1
        this._currentCommand = this._commandStacks[this._currentCommandIndex]
    }

    /**
     * 执行上一步操作
     */
    private pre(): void {
        const nextIndex = this._currentCommandIndex - 1
        // 如果是最后一步不处理
        this._currentCommandIndex = nextIndex < 0 ? 0 : nextIndex
        this._currentCommand = this._commandStacks[this._currentCommandIndex]
    }

    public operateIndexList: Array<number> = []

    /**
     * 撤销
     */
    public undo(): void {
        // 执行命令行堆栈
        this._currentCommand?.undo()
        // 指针下移下一步
        this.next()
        this.emit(CommandKeyEnum.ON_STACK_CHANGE)
        this.emit(CommandKeyEnum.ON_UPDATE_VIEW)
    }

    /**
     * 恢复
     */
    public redo(): void {
        // 先指针上移
        this.pre()
        // 然后执行下一个命令的恢复
        this._currentCommand?.redo()
        this.emit(CommandKeyEnum.ON_STACK_CHANGE)
        this.emit(CommandKeyEnum.ON_UPDATE_VIEW)
    }

    /**
     * 记录命令
     * @param command 命令实例
     */
    public recordCommand(command: ICommand): void {
        if (this._commandStacks.length > this._maxStack) {
            this._commandStacks.shift()
        }
        if (this.operateIndexList.length) {
            const length = this.operateIndexList.length
            for (let i = 0; i < length; i++) {
                this.operateIndexList[i] = this.operateIndexList[i] + 1
            }
        }
        this.operateIndexList.unshift(0)
        this._commandStacks.unshift(command)
        this._currentCommandIndex = 0
        this._currentCommand = command
    }

    public clear(): void {
        this._commandStacks = []
        this._currentCommandIndex = -1
        this._currentCommand = void 0
        this._eventBus.$off()
        this._eventBus = new EventBus()
    }
}
