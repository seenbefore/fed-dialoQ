import { AddModelCommand } from '@/entry/devops/views/utils/generate-code/core/command/commands/AddModelCommand'
import { UpdateActiveModelCommand } from '@/entry/devops/views/utils/generate-code/core/command/commands/UpdateActiveModelCommand'
import { createCommand } from '@/entry/devops/views/utils/generate-code/core/command/createCommand'
import { AbstractBaseDataStore, IComponentList, IModelAttr } from '@/entry/devops/views/utils/generate-code/core/dataStore/AbstractBaseDataStore'
import { IAppFormDetailsProperties } from '@/entry/devops/views/utils/generate-code/core/dataStore/appFormDetailsDataStore/AppFormDetailsModel'
import { IPcFormDetailsProperties, PcFormDetailsModel } from '@/entry/devops/views/utils/generate-code/core/dataStore/pcFormDetailsDataStore/PcFormDetailsModel'
import { pcFormDetailsComponentList } from '@/entry/devops/views/utils/generate-code/core/dataStore/pcFormDetailsDataStore/sources/componentList'
import { getAttrsByPcFromDetailsModelType } from '@/entry/devops/views/utils/generate-code/core/dataStore/pcFormDetailsDataStore/sources/modelProperties'
import { PcFormDetailsModelTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/FormDetailsTypeEnum'
import { GenerateTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/GenerateTypeEnum'
import { InjectableDataStore } from '@/entry/devops/views/utils/generate-code/core/sources/provider/DataStoreIoc'
import { IFormDetailsBuilderConfig, IFormDetailsColumns } from '@/sharegood-ui/packages/base-form-details/core/FormDetailsBuilder'

export type IPcFormDetailsDataStoreConfig = IFormDetailsBuilderConfig

@InjectableDataStore(GenerateTypeEnum.PC_FORM_DETAILS)
export class PcFormDetailsDataStore extends AbstractBaseDataStore<IPcFormDetailsDataStoreConfig, IPcFormDetailsProperties, PcFormDetailsModel> {
    public config: IPcFormDetailsDataStoreConfig = {
        /* 默认占6格 */
        gutterSpan: 12,
        elRowProps: {
            /* 默认向右 */
            justify: 'start',
        },
        labelSuffix: '：',
        emptyValue: '-',
    }

    public copyModelIntoActiveModel(data: PcFormDetailsModel): void {}

    public createModel(type: PcFormDetailsModelTypeEnum, properties?: Partial<IAppFormDetailsProperties>, parent?: PcFormDetailsModel, notUpdateActive?: boolean, index?: number): PcFormDetailsModel {
        const newModel = createCommand(AddModelCommand, new PcFormDetailsModel(type, properties, parent), index)
        !notUpdateActive && createCommand(UpdateActiveModelCommand, newModel)
        return newModel
    }

    public generate(): void {}

    public getDetailsColumns(): Array<IFormDetailsColumns> {
        return this.data.map(m => {
            return {
                ...m.generate({}),
                dataId: m.domId,
                id: m.id,
            }
        })
    }

    public getAttr(type: PcFormDetailsModelTypeEnum): Array<IModelAttr> {
        return getAttrsByPcFromDetailsModelType(type)
    }

    public getComponentList(): Array<IComponentList> {
        return pcFormDetailsComponentList
    }

    public getValidateMessage(args: any): UndefinedAble<string> {
        return ''
    }
}
