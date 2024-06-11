import { AbstractBaseModel } from '@/entry/devops/views/utils/generate-code/core/dataStore/AbstractBaseModel'
import { assignPropertiesValuesByAppFromDetailsModelType } from '@/entry/devops/views/utils/generate-code/core/dataStore/appFormDetailsDataStore/sources/modelProperties'
import { AppFormDetailsModelTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/FormDetailsTypeEnum'
import { attrConvertToString, deleteEmptyValue } from '@/entry/devops/views/utils/generate-code/core/utils'
import { IFormDetailsColumns } from '@/sharegood-ui/packages/base-form-details/core/FormDetailsBuilder'
import { cloneDeep } from 'lodash'

export interface IAppFormDetailsDetailsModelGenerate {
    id: number
    type: AppFormDetailsModelTypeEnum
    properties: Obj & IFormDetailsColumns
    children: Array<IAppFormDetailsDetailsModelGenerate>
    attrs?: string
}

export type IAppFormDetailsProperties = IFormDetailsColumns & Obj

export class AppFormDetailsModel extends AbstractBaseModel<IAppFormDetailsProperties> {
    public children: Array<AppFormDetailsModel> = []

    public properties: IAppFormDetailsProperties

    public get label(): string {
        if (this.type === AppFormDetailsModelTypeEnum.OPERATIONS) {
            return '操作按钮'
        } else if (this.type === AppFormDetailsModelTypeEnum.DESCRIPTIONS) {
            return this.properties.title as string
        }
        return this.properties.label
    }

    public constructor(type: AppFormDetailsModelTypeEnum, properties?: Partial<IAppFormDetailsProperties>, parent?: AppFormDetailsModel) {
        super(type, parent)
        this.properties = assignPropertiesValuesByAppFromDetailsModelType(type, properties ?? {})
    }

    /* 因为model没有做区分所以直接通过type判断好了。 */
    private parseGenerateProperties(formConfig: Obj): Obj {
        const properties = deleteEmptyValue(cloneDeep(this.properties))
        if (this.type === AppFormDetailsModelTypeEnum.OPERATIONS) {
            properties.count = properties.count?.split(',') || []
        } else if (this.type === AppFormDetailsModelTypeEnum.STATUS_TAG) {
            const { generateClass, list } = properties
            if (generateClass) {
                const getHex = (color: string) => {
                    const [_, ...list] = color
                    return list.join('')
                }
                formConfig.statusTagInfo = formConfig.statusTagInfo || []
                properties.list = list.map((m: Obj) => {
                    const classInfo = {
                        className: `status-tag__${getHex(m.color)}_${getHex(m.bgColor)}`,
                        classContent: `background-color: ${m.bgColor};
                            color: ${m.color};`,
                    }
                    formConfig.statusTagInfo.push(classInfo)
                    return {
                        ...m,
                        classInfo,
                    }
                })
            }
        } else if (this.type === AppFormDetailsModelTypeEnum.IMAGE) {
            const { srcListStr } = properties
            properties.srcListStr = srcListStr ? srcListStr.split(',') : ['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg']
        }
        return properties
    }

    public generateForDataKey(data: Obj): Obj {
        if (this.properties.props) {
            Reflect.set(data, this.properties.props, '')
        }
        return data
    }

    public generate(data: Obj, formConfig: Obj): IAppFormDetailsDetailsModelGenerate {
        const properties = this.parseGenerateProperties(formConfig)
        const filterKeys = ['useSlot', 'subSpan']
        if (this.type === AppFormDetailsModelTypeEnum.DESCRIPTION_ITEM) {
            filterKeys.push(...['label', 'isText', 'wrapInline', 'text', 'props'])
        } else if (this.type === AppFormDetailsModelTypeEnum.DESCRIPTIONS) {
            filterKeys.push('extra')
        }
        this.generateForDataKey(data)
        return {
            id: this.id,
            type: this.type as AppFormDetailsModelTypeEnum,
            properties,
            children: this.children.map(m => m.generate(data, formConfig)),
            attrs: attrConvertToString(properties, filterKeys) ?? '',
        }
    }
}
