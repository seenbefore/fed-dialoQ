import { AddModelCommand } from '@/entry/devops/views/utils/generate-code/core/command/commands/AddModelCommand'
import { UpdateActiveModelCommand } from '@/entry/devops/views/utils/generate-code/core/command/commands/UpdateActiveModelCommand'
import { createCommand } from '@/entry/devops/views/utils/generate-code/core/command/createCommand'
import { AbstractBaseDataStore, IComponentList, IModelAttr } from '@/entry/devops/views/utils/generate-code/core/dataStore/AbstractBaseDataStore'
import { AbstractBaseModel } from '@/entry/devops/views/utils/generate-code/core/dataStore/AbstractBaseModel'
import { AppExampleModel, IAppExampleProperties } from '@/entry/devops/views/utils/generate-code/core/dataStore/appExampleDatastore/AppExampleModel'
import { getAppExampleModel } from '@/entry/devops/views/utils/generate-code/core/dataStore/appExampleDatastore/AppExampleModelFactory'
import { appExampleComponentList } from '@/entry/devops/views/utils/generate-code/core/dataStore/appExampleDatastore/sources/componentList'
import { getAttrsByAppExampleModelType } from '@/entry/devops/views/utils/generate-code/core/dataStore/appExampleDatastore/sources/modelProperties'
import { AppExampleTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/FormDetailsTypeEnum'
import { GenerateTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/GenerateTypeEnum'
import { InjectableDataStore } from '@/entry/devops/views/utils/generate-code/core/sources/provider/DataStoreIoc'

export interface IAppExamplesDatastoreConfig {}

@InjectableDataStore(GenerateTypeEnum.APP_EXAMPLES)
export class AppExampleDatastore extends AbstractBaseDataStore<IAppExamplesDatastoreConfig, IAppExampleProperties, AppExampleModel> {
    public config: IAppExamplesDatastoreConfig = {}

    public get currentPageModel() {
        return this.data[0]
    }

    public copyModelIntoActiveModel(data: AbstractBaseModel<IAppExampleProperties>): void {}

    public createModel(type: AppExampleTypeEnum, properties?: Partial<IAppExampleProperties>, parent?: AppExampleModel, notUpdateActive?: boolean): AppExampleModel {
        const ModelInstance = getAppExampleModel(type)
        const newModel = createCommand(AddModelCommand, new ModelInstance(type, properties, parent))
        !notUpdateActive && createCommand(UpdateActiveModelCommand, newModel)
        return newModel
    }

    public generate(): void {
        this.currentPageModel.generateToTemplate()
    }

    public getAttr(type: AppExampleTypeEnum): Array<IModelAttr> {
        return getAttrsByAppExampleModelType(type)
    }

    public getComponentList(): Array<IComponentList> {
        return appExampleComponentList
    }

    public getValidateMessage(args: any): UndefinedAble<string> {
        if (this.currentPageModel) {
            return '案例页面只能有一个节点'
        }
    }
}
