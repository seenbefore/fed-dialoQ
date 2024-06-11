import { AbstractBaseModel } from '@/entry/devops/views/utils/generate-code/core/dataStore/AbstractBaseModel'
import { appBaseFormModelProperties, assignPropertiesValuesByAppBaseFormModelType } from '@/entry/devops/views/utils/generate-code/core/dataStore/appBaseFormDatastore/sources/modelProperties'
import { AppBaseFormModelTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/FormDetailsTypeEnum'
import { createUUID, deleteEmptyValueByDefaultValue } from '@/entry/devops/views/utils/generate-code/core/utils'
import { getDefaultPropertiesValue } from '@/entry/devops/views/utils/generate-code/core/utils/parseProperties'
import { CLASS_NAME_CONST_DATA } from '@/entry/devops/views/utils/generate-code/runtime-core/utils'
import { Field, GroupField } from '@/entry/h5/components/global/app-form/index.vue'
import { cloneDeep } from 'lodash'

export type IAppBaseFormModelProperties = Field | GroupField | Obj

export class AppBaseFormModel extends AbstractBaseModel<IAppBaseFormModelProperties> {
    public children: Array<AppBaseFormModel> = []

    public properties: IAppBaseFormModelProperties

    public get label(): string {
        if (this.type === AppBaseFormModelTypeEnum.GROUP) {
            return this.properties.groupName
        } else {
            return Reflect.get(this.properties, 'label')
        }
    }

    public constructor(type: AppBaseFormModelTypeEnum, properties?: Partial<IAppBaseFormModelProperties>, parent?: AppBaseFormModel) {
        super(type, parent)
        if (properties) {
            properties = this.parseCopyProperties(properties)
        }
        this.properties = assignPropertiesValuesByAppBaseFormModelType(type, properties ?? {})
    }

    /* XXX: 因为一些原因导致 app-form 的内容无法做到及时更新，所以增加 随机key 用于重新渲染。 */
    public updateView() {
        if (this.properties.randomKey) {
            this.properties.randomKey = createUUID()
        }
    }

    public groupGenerate(data: Obj, hasOptimize = false): IAppBaseFormModelProperties {
        const { groupName, groupId } = this.properties
        return {
            groupName,
            groupId,
            children: this.children.map(m => m.generate(data, hasOptimize)),
            dataId: this.domId,
            groupClass: CLASS_NAME_CONST_DATA.DROPZONE_SELECTOR,
        }
    }

    public optimizeProperties(originProperties: IAppBaseFormModelProperties, hasOptimize: boolean): IAppBaseFormModelProperties {
        if (!hasOptimize) {
            return originProperties
        }
        /* placeholder 如果没有传递会默认为空。。。所以处理下 */
        const defaultValue = getDefaultPropertiesValue(appBaseFormModelProperties[this.type as AppBaseFormModelTypeEnum]!, key => {
            const filterKeys = ['props.placeholder', 'props.isGroup']
            if (this.type === AppBaseFormModelTypeEnum.TEXT) {
                filterKeys.push('props.text')
            }
            return !filterKeys.includes(key)
        })
        return deleteEmptyValueByDefaultValue(cloneDeep(originProperties), defaultValue, (value, key, obj) => ['dataId', 'randomKey', 'groupClass'].includes(key))
    }

    public parseProperties(properties: IAppBaseFormModelProperties): IAppBaseFormModelProperties {
        const cloneProperties = cloneDeep(properties) as Obj
        const parseOptionsTypes: Array<AppBaseFormModelTypeEnum> = [AppBaseFormModelTypeEnum.RADIO, AppBaseFormModelTypeEnum.CHECKBOX, AppBaseFormModelTypeEnum.SELECT_PICKER]
        try {
            if (parseOptionsTypes.includes(this.type as AppBaseFormModelTypeEnum)) {
                const options = Reflect.get(cloneProperties.props, 'options') as string
                const optionsFnc = new Function(`return ${options}`).call(void 0)
                Reflect.set(cloneProperties.props, 'options', optionsFnc)
            }
        } catch (e) {
            console.error(`parse ${this.type} options error: `, e)
        }
        return cloneProperties
    }

    public generateForDataKey(data: Obj): Obj {
        const props = Reflect.get(this.properties, 'name')
        if (props) {
            Reflect.set(data, props, '')
        }
        return data
    }

    public generate(data: Obj, hasOptimize = false): IAppBaseFormModelProperties {
        if (this.type === AppBaseFormModelTypeEnum.GROUP) {
            return this.optimizeProperties(this.groupGenerate(data, hasOptimize), hasOptimize)
        }

        this.generateForDataKey(data)

        const generateData: Obj = this.optimizeProperties(
            {
                ...this.parseProperties(this.properties),
                children: this.children.map(m => m.generate(data, hasOptimize)),
                dataId: this.domId,
            },
            hasOptimize,
        )
        /* 不需要空children，会影响非分组控件的渲染 */
        if (!generateData.children.length) {
            Reflect.deleteProperty(generateData, 'children')
        }

        return generateData
    }

    public parseCopyProperties(properties: IAppBaseFormModelProperties): IAppBaseFormModelProperties {
        if (this.type === AppBaseFormModelTypeEnum.GROUP) {
            properties.groupId = createUUID()
            properties.randomKey = createUUID()
        }
        return properties
    }
}
