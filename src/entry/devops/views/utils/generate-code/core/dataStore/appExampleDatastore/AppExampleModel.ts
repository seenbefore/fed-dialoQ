import { AbstractBaseModel } from '@/entry/devops/views/utils/generate-code/core/dataStore/AbstractBaseModel'
import { IAppBaseFormModelProperties } from '@/entry/devops/views/utils/generate-code/core/dataStore/appBaseFormDatastore/AppBaseFormModel'
import { assignPropertiesValuesByAppExampleModelType } from '@/entry/devops/views/utils/generate-code/core/dataStore/appExampleDatastore/sources/modelProperties'
import { AppExampleTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/FormDetailsTypeEnum'

export interface IAppExampleProperties extends Obj {}

export interface IAppExampleGenerate {
    properties: Obj
}

export abstract class AppExampleModel extends AbstractBaseModel<IAppExampleProperties> {
    public constructor(type: AppExampleTypeEnum, properties?: Partial<IAppBaseFormModelProperties>, parent?: AppExampleModel) {
        super(type, parent)
        this.properties = assignPropertiesValuesByAppExampleModelType(type)
    }

    public children: Array<AbstractBaseModel<IAppExampleProperties>> = []

    public properties: IAppExampleProperties = {}

    public generate(): IAppExampleGenerate {
        return this.properties as IAppExampleGenerate
    }

    public generateForDataKey(data: Obj): Obj {
        throw new Error('methods')
    }

    public abstract generateToTemplate(): void
}
