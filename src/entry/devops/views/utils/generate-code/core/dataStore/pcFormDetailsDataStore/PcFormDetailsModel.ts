import { AbstractBaseModel } from '@/entry/devops/views/utils/generate-code/core/dataStore/AbstractBaseModel'
import { IAppFormDetailsProperties } from '@/entry/devops/views/utils/generate-code/core/dataStore/appFormDetailsDataStore/AppFormDetailsModel'
import { assignPropertiesValuesByPcFromDetailsModelType } from '@/entry/devops/views/utils/generate-code/core/dataStore/pcFormDetailsDataStore/sources/modelProperties'
import { PcFormDetailsModelTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/FormDetailsTypeEnum'
import { IFormDetailsColumns } from '@/sharegood-ui/packages/base-form-details/core/FormDetailsBuilder'
import { cloneDeep } from 'lodash'

export type IPcFormDetailsProperties = IFormDetailsColumns

export class PcFormDetailsModel extends AbstractBaseModel<IPcFormDetailsProperties> {
    public properties: IPcFormDetailsProperties

    public children: Array<AbstractBaseModel<IPcFormDetailsProperties>> = []

    public constructor(type: PcFormDetailsModelTypeEnum, properties?: Partial<IAppFormDetailsProperties>, parent?: PcFormDetailsModel) {
        super(type, parent)
        this.properties = assignPropertiesValuesByPcFromDetailsModelType(type, properties ?? {})
    }

    public get label(): string {
        if (this.type === PcFormDetailsModelTypeEnum.TITLE) {
            return this.properties.title as string
        }
        return this.properties.label
    }

    public generateForDataKey(data: Obj): Obj {
        return data
    }

    public parseProperties(properties: IPcFormDetailsProperties): IFormDetailsColumns {
        const cloneProperties = cloneDeep(this.properties)

        const deleteProperties = (key: string, target = cloneProperties) => Reflect.deleteProperty(target, key)

        const keys: Array<keyof IPcFormDetailsProperties> = ['title', 'label']
        keys.forEach(key => {
            const value = Reflect.get(cloneProperties, key)
            !value && deleteProperties(key)
        })
        /* xxx */
        return cloneProperties
    }

    public generate(data: Obj): IFormDetailsColumns {
        this.generateForDataKey(data)

        return {
            ...this.parseProperties(this.properties),
        }
    }
}
