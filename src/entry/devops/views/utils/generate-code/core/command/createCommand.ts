import { AbstractCommand } from '@/entry/devops/views/utils/generate-code/core/command/index'
import { AbstractBaseModel } from '@/entry/devops/views/utils/generate-code/core/dataStore/AbstractBaseModel'

/**
 * 创建命令
 * @param CommandConstructor
 * @param model
 * @param args
 */
export const createCommand = <U extends new (...args: any) => AbstractCommand, T extends AbstractBaseModel = AbstractBaseModel>(CommandConstructor: U, model: T, ...args: any): T => {
    return new CommandConstructor(model, ...args).execute()
}
