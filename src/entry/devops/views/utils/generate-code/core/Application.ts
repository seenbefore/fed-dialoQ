import { CommandManage } from '@/entry/devops/views/utils/generate-code/core/command/CommandManage'
import { ConfigurationManage } from '@/entry/devops/views/utils/generate-code/core/configuration'
import { AbstractBaseDataStore } from '@/entry/devops/views/utils/generate-code/core/dataStore/AbstractBaseDataStore'
import { AbstractBaseModel } from '@/entry/devops/views/utils/generate-code/core/dataStore/AbstractBaseModel'
import { GenerateTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/GenerateTypeEnum'
import { DataStoreIoc } from '@/entry/devops/views/utils/generate-code/core/sources/provider/DataStoreIoc'
import './utils/init'

export class Application {
    private static _instance: Application

    public static getInstance(): Application {
        if (!this._instance) {
            this._instance = new Application()
        }
        return this._instance
    }

    /* 配置管理 */
    public configurationManage: ConfigurationManage = new ConfigurationManage()

    /* 命令管理 */
    public commandManage: CommandManage = new CommandManage()

    /* 数据存储 */
    public dataStore!: AbstractBaseDataStore<Obj, Obj, AbstractBaseModel>

    constructor() {
        /* 根据类型获取不同的数据存储 */
        this.dataStore = DataStoreIoc.resolve(this.configurationManage.config.type)
    }

    private clear(): void {
        this.commandManage.clear()
        this.dataStore.clear()
    }

    /**
     * 获取数据存储并且强制类型
     */
    public getDataStore<T extends AbstractBaseDataStore<Obj, Obj, AbstractBaseModel>>() {
        return this.dataStore as T
    }

    public updateType(type: GenerateTypeEnum): void {
        this.clear()
        this.configurationManage.updateConfig('type', type)
        this.dataStore = DataStoreIoc.resolve(type)
    }
}
